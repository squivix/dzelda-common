import {TokenObject, TokeObjectPhrases, WordParser} from "@/src/parsers/WordParser.js";
import {cleanObject, escapeRegExp} from "@/src/utils/utils.js";

type ReplaceCharsMap = { [character: string]: string }


export class SpaceBasedWordParser extends WordParser {
    notWordCharsRegex: RegExp;
    replaceCharsMap: ReplaceCharsMap;
    ignoreCase: boolean;

    constructor(wordChars: string = "", replaceCharsMap: ReplaceCharsMap = {}, ignoreCase: boolean = true) {
        super();
        this.notWordCharsRegex = new RegExp(`[^${escapeRegExp(wordChars)}]+`, "gmu");
        this.replaceCharsMap = replaceCharsMap;
        this.ignoreCase = ignoreCase;
    }

    parseText(text: string, keepDuplicates = false): [string, string[]] {
        //TODO investigate why - is being added as a vocab with sample data
        let parsedText = text;

        //replace special characters
        Object.keys(this.replaceCharsMap).forEach(c => parsedText = parsedText.replace(c, this.replaceCharsMap[c]));

        //replace all non-word characters with a space
        parsedText = parsedText.replace(this.notWordCharsRegex, " ");

        //trim
        parsedText = parsedText.trim();

        if (this.ignoreCase)
            //change all to lowercase
            parsedText = parsedText.toLowerCase();
        const wordArray = parsedText.split(" ").filter(w => w !== "");
        if (keepDuplicates)
            return [parsedText, wordArray];
        else
            return [parsedText, Array.from(new Set(wordArray))];
    }

    transformWords(wordsText: string) {
        if (this.ignoreCase)
            return wordsText.toLowerCase();
        else
            return wordsText;
    }

    tokenizeText(text: string, phrases: string[]) {
        const keepDelimiterRegex = new RegExp(`(${this.notWordCharsRegex.source})`, this.notWordCharsRegex.flags);
        const tokens = text.split(keepDelimiterRegex).filter(t => t !== "");
        if (tokens.length == 0)
            return [];

        const tokenObjects: TokenObject[] = [];
        let isWord = !tokens[0].match(keepDelimiterRegex);
        const phraseObjects: { [pt: string]: { occurrencesCount: number, words: string[] } } = {};
        for (const phrase of phrases)
            phraseObjects[phrase] = {words: phrase.split(" "), occurrencesCount: 0};
        const phraseWordQueues: Set<TokeObjectPhrases> = new Set();
        for (let i = 0; i < tokens.length; i++) {
            if (isWord) {
                const tokenObject: TokenObject = {
                    text: tokens[i],
                    parsedText: this.transformWords(tokens[i]),
                    isWord: isWord,
                    phrases: []
                };
                tokenObjects.push(tokenObject);

                for (const phraseText of phrases) {
                    let isTokenFirstInPhrase = true;
                    const phraseWords = phraseObjects[phraseText].words;
                    for (let j = 0; j < phraseWords.length; j++) {
                        const futureTokens = tokens[i + (j * 2)];
                        if (!futureTokens || phraseWords[j] !== this.transformWords(futureTokens)) {
                            isTokenFirstInPhrase = false;
                            break;
                        }
                    }
                    if (isTokenFirstInPhrase) {
                        phraseWordQueues.add([...Array(phraseWords.length).keys()].map(indexInPhrase => ({
                            text: phraseText,
                            // indexInPhrase: indexInPhrase,
                            phraseOccurrenceIndex: phraseObjects[phraseText].occurrencesCount
                        })));
                        phraseObjects[phraseText].occurrencesCount++;
                    }
                }
                phraseWordQueues.forEach((queue) => {
                    if (queue.length != 0)
                        tokenObject.phrases.push(queue.shift()!);
                    else
                        phraseWordQueues.delete(queue);
                });
            } else {
                const middlePhrases: TokeObjectPhrases = [];
                phraseWordQueues.forEach((queue) => {
                    if (queue.length != 0)
                        middlePhrases.push(queue[0]);
                    else
                        phraseWordQueues.delete(queue);
                });
                tokenObjects.push(...tokens[i].split("").map(t => {
                    return {
                        text: t,
                        isWord: isWord,
                        phrases: middlePhrases
                    };
                }));
            }
            isWord = !isWord;
        }

        return tokenObjects;
    }

    combineTokens(words: string[]): string {
        return words.join(" ");
    }
}
