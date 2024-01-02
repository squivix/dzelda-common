import {TokenObject, TokenWithPhrases, TokeObjectPhrases, WordParser} from "@/src/parsers/WordParser.js";
import {escapeRegExp} from "@/src/utils/utils.js";


//TODO investigate why - is being added as a vocab with sample data
export class SpaceBasedWordParser extends WordParser {
    notWordCharsRegex: RegExp;
    notWordCharsKeepDelimiterRegex: RegExp;
    ignoreCase: boolean;

    constructor(wordChars: string = "", {ignoreCase = true}: { ignoreCase?: boolean } = {}) {
        super();
        this.notWordCharsRegex = new RegExp(`[^${escapeRegExp(wordChars)}]+`, "gmu");
        this.notWordCharsKeepDelimiterRegex = new RegExp(`(${this.notWordCharsRegex.source})`, this.notWordCharsRegex.flags);
        this.ignoreCase = ignoreCase;
    }

    parseText(text: string): string {
        let parsedText = text;

        //replace all non-word characters with a space
        parsedText = parsedText.replace(this.notWordCharsRegex, " ");
        parsedText = this.transformWord(parsedText);
        return parsedText;
    }

    transformWord(wordText: string) {
        wordText = wordText.trim();
        if (this.ignoreCase)
            wordText = wordText.toLowerCase();
        return wordText;
    }


    tokenizeText(text: string) {
        const tokens = text.split(this.notWordCharsKeepDelimiterRegex).filter(t => t !== "");
        if (tokens.length == 0)
            return [];
        const tokenObjects: TokenObject[] = [];

        let isWord = !tokens[0].match(this.notWordCharsKeepDelimiterRegex);
        for (let i = 0; i < tokens.length; i++) {
            if (isWord) {
                tokenObjects.push({
                    text: tokens[i],
                    parsedText: this.transformWord(tokens[i]),
                    isWord: isWord,
                });
            } else {
                tokenObjects.push(...tokens[i].split("").map(t => ({
                    text: t,
                    isWord: isWord,
                })));
            }
            isWord = !isWord;
        }
        return tokenObjects;
    }

    detectPhrases(text: string, phrases: string[]): TokenWithPhrases[] {
        const tokens = this.tokenizeText(text) as TokenWithPhrases[]; //well it's about to be anyway
        const phraseObjects: { [pt: string]: { occurrencesCount: number, words: string[] } } = {};
        for (const phrase of phrases)
            phraseObjects[phrase] = {words: phrase.split(" "), occurrencesCount: 0};
        const phraseWordQueues: Set<TokeObjectPhrases> = new Set();
        for (let i = 0; i < tokens.length; i++) {
            tokens[i].phrases = [];
            if (tokens[i].isWord) {
                for (const phraseText of phrases) {
                    let isTokenFirstInPhrase = true;
                    const phraseWords = phraseObjects[phraseText].words;
                    for (let j = 0; j < phraseWords.length; j++) {
                        const futureToken = tokens[i + (j * 2)];
                        if (!futureToken || phraseWords[j] !== futureToken.parsedText) {
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
                        tokens[i].phrases.push(queue.shift()!);
                    else
                        phraseWordQueues.delete(queue);
                });
            } else {
                phraseWordQueues.forEach((queue) => {
                    if (queue.length != 0)
                        tokens[i].phrases.push(queue[0]);
                    else
                        phraseWordQueues.delete(queue);
                });
            }
        }

        return tokens;
    }
}
