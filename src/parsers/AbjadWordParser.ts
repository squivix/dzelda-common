import {ParseTextResult, TokenObject, TokenWithPhrases, WordParser} from "@/src/parsers/WordParser.js";
import {escapeRegExp} from "@/src/utils/utils.js";

export class AbjadWordParser extends WordParser {
    splitCharsRegex: RegExp;
    splitKeepDelimCharsRegex: RegExp;
    diacriticsChars: string;
    diacriticsCharSet: Set<string>;

    constructor(wordChars: string, diacriticsCharacters: string, options: {} = {}) {
        super();
        this.diacriticsChars = diacriticsCharacters;
        this.diacriticsCharSet = new Set(this.diacriticsChars)
        this.splitCharsRegex = new RegExp(`[^${escapeRegExp(wordChars+diacriticsCharacters)}]+`, "gmu");
        this.splitKeepDelimCharsRegex = new RegExp(`(${this.splitCharsRegex.source})`, this.splitCharsRegex.flags);
    }

    parseText(text: string): ParseTextResult {
        let parsedText = text;
        //replace all non-word characters with a space
        parsedText = parsedText.replace(this.splitCharsRegex, " ").trim();
        const normalizedWords = [];
        const variantSets = {} as Record<string, Set<string>>;
        for (const originalWord of parsedText.split(" ")) {
            if (originalWord.length > WordParser.MAX_WORD_LENGTH)
                continue;
            const normalizedWord = this.transformWord(originalWord)
            normalizedWords.push(normalizedWord);
            if (normalizedWord != originalWord) {
                if (variantSets[normalizedWord] === undefined)
                    variantSets[normalizedWord] = new Set();
                variantSets[normalizedWord].add(originalWord);
            }
        }
        const variants: Record<string, string[]> = {};
        for (const [key, valueSet] of Object.entries(variantSets))
            variants[key] = [...valueSet];
        parsedText = normalizedWords.join(" ");
        return {
            normalizedText: parsedText,
            normalizedWords: normalizedWords,
            wordToVariantsMap: variants
        };
    }

    transformWord(wordText: string): string {
        return [...wordText].filter(char => !this.diacriticsCharSet.has(char)).join('');
    }

    tokenizeText(text: string) {
        const tokens = text.split(this.splitKeepDelimCharsRegex).filter(t => t !== "");
        if (tokens.length == 0)
            return [];
        const tokenObjects: TokenObject[] = [];

        let isWord = !tokens[0].match(this.splitKeepDelimCharsRegex);
        for (let i = 0; i < tokens.length; i++) {
            if (isWord) {
                tokenObjects.push({
                    text: tokens[i],
                    parsedText: this.transformWord(tokens[i]),
                    isWord: isWord && tokens[i].length < WordParser.MAX_WORD_LENGTH,
                });
            } else {
                tokenObjects.push(...tokens[i].split("").map(t => ({
                    text: t,
                    isWord: false,
                })));
            }
            isWord = !isWord;
        }
        return tokenObjects;
    }

}