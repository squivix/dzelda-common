import { WordParser } from "../../src/parsers/WordParser.js";
import { escapeRegExp } from "../../src/utils/utils.js";
//TODO investigate why - is being added as a vocab with sample data
export class SpaceBasedWordParser extends WordParser {
    constructor(wordChars = "", { ignoreCase = true } = {}) {
        super();
        this.notWordCharsRegex = new RegExp(`[^${escapeRegExp(wordChars)}]+`, "gmu");
        this.notWordCharsKeepDelimiterRegex = new RegExp(`(${this.notWordCharsRegex.source})`, this.notWordCharsRegex.flags);
        this.ignoreCase = ignoreCase;
    }
    parseText(text) {
        let parsedText = text;
        //replace all non-word characters with a space
        parsedText = parsedText.replace(this.notWordCharsRegex, " ");
        parsedText = this.transformWord(parsedText);
        return parsedText;
    }
    transformWord(wordText) {
        wordText = wordText.trim();
        if (this.ignoreCase)
            wordText = wordText.toLowerCase();
        return wordText;
    }
    tokenizeText(text) {
        const tokens = text.split(this.notWordCharsKeepDelimiterRegex).filter(t => t !== "");
        if (tokens.length == 0)
            return [];
        const tokenObjects = [];
        let isWord = !tokens[0].match(this.notWordCharsKeepDelimiterRegex);
        for (let i = 0; i < tokens.length; i++) {
            if (isWord) {
                tokenObjects.push({
                    text: tokens[i],
                    parsedText: this.transformWord(tokens[i]),
                    isWord: isWord,
                });
            }
            else {
                tokenObjects.push(...tokens[i].split("").map(t => ({
                    text: t,
                    isWord: isWord,
                })));
            }
            isWord = !isWord;
        }
        return tokenObjects;
    }
    detectPhrases(text, phrases) {
        const tokens = this.tokenizeText(text); //well it's about to be anyway
        const phraseObjects = {};
        for (const phrase of phrases)
            phraseObjects[phrase] = { words: phrase.split(" "), occurrencesCount: 0 };
        const phraseWordQueues = new Set();
        for (let i = 0; i < tokens.length; i++) {
            tokens[i].phrases = [];
            if (tokens[i].isWord) {
                for (const phraseText of phrases) {
                    let isTokenFirstInPhrase = true;
                    const phraseWords = phraseObjects[phraseText].words;
                    let j = i, w = 0;
                    while (w < phraseWords.length && j < tokens.length) {
                        const futureToken = tokens[j];
                        if (futureToken.isWord) {
                            if (futureToken.parsedText !== phraseWords[w]) {
                                isTokenFirstInPhrase = false;
                                break;
                            }
                            w++;
                        }
                        j++;
                    }
                    isTokenFirstInPhrase = isTokenFirstInPhrase && w == phraseWords.length;
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
                        tokens[i].phrases.push(queue.shift());
                    else
                        phraseWordQueues.delete(queue);
                });
            }
            else {
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
//# sourceMappingURL=SpaceBasedWordParser.js.map