import {ParseTextResult, TokenObject, WordParser} from "@/src/parsers/WordParser.js";
import {escapeRegExp} from "@/src/utils/utils.js";


//TODO investigate why - is being added as a vocab with sample data
export class SpaceBasedWordParser extends WordParser {
    splitCharsRegex: RegExp;
    splitKeepDelimCharsRegex: RegExp;
    ignoreCase: boolean;

    constructor(wordChars: string, {ignoreCase = true}: { ignoreCase?: boolean, } = {}) {
        super();
        this.splitCharsRegex = new RegExp(`[^${escapeRegExp(wordChars)}]+`, "gmu");
        this.splitKeepDelimCharsRegex = new RegExp(`(${this.splitCharsRegex.source})`, this.splitCharsRegex.flags);
        this.ignoreCase = ignoreCase;
    }

    parseText(text: string): ParseTextResult {
        let parsedText = text;

        //replace all non-word characters with a space
        parsedText = parsedText.replace(this.splitCharsRegex, " ");
        parsedText = this.normalizeText(parsedText);
        parsedText = parsedText.split(' ').filter(word => word.length <= WordParser.MAX_WORD_LENGTH).join(' ');
        return {
            normalizedText: parsedText,
            normalizedWords: this.splitWords(parsedText, {keepDuplicates: true}),
            wordToVariantsMap: {}
        };
    }

    normalizeText(wordText: string) {
        wordText = wordText.trim();
        if (this.ignoreCase)
            wordText = wordText.toLowerCase();
        return wordText;
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
                    parsedText: this.normalizeText(tokens[i]),
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
