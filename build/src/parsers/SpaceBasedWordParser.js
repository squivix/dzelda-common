import { WordParser } from "../../src/parsers/WordParser.js";
import { escapeRegExp } from "../../src/utils/utils.js";
export class SpaceBasedWordParser extends WordParser {
    constructor(wordChars = "", replaceCharsMap = {}, ignoreCase = true) {
        super();
        this.notWordCharsRegex = new RegExp(`[^${escapeRegExp(wordChars)}]+`, "gmu");
        this.replaceCharsMap = replaceCharsMap;
        this.ignoreCase = ignoreCase;
    }
    parseText(text, keepDuplicates = false) {
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
    transformWords(wordsText) {
        if (this.ignoreCase)
            return wordsText.toLowerCase();
        else
            return wordsText;
    }
    tokenizeText(text, phrases) {
        const keepDelimiterRegex = new RegExp(`(${this.notWordCharsRegex.source})`, this.notWordCharsRegex.flags);
        const tokens = text.split(keepDelimiterRegex);
        if (tokens.length == 0)
            return [];
        const tokenObjects = [];
        let isWord = !tokens[0].match(keepDelimiterRegex);
        const phraseObjects = [];
        for (const phrase of phrases)
            phraseObjects.push({ text: phrase, words: phrase.split(" ") });
        const phraseWordStacks = {};
        for (let i = 0; i < tokens.length; i++) {
            const tokenObject = {
                text: tokens[i],
                parsedToken: this.transformWords(tokens[i]),
                isWord: isWord,
                phrases: {}
            };
            tokenObjects.push(tokenObject);
            if (tokenObject.isWord) {
                for (const { text: phraseText, words: phraseWords } of phraseObjects) {
                    let isTokenFirstInPhrase = true;
                    for (let j = 0; j < phraseWords.length; j++) {
                        if (phraseWords[j] != tokens[i + (j * 2)]) {
                            isTokenFirstInPhrase = false;
                            break;
                        }
                    }
                    if (isTokenFirstInPhrase) {
                        tokenObject.phrases[phraseText] = { indexInPhrase: 0, phraseLength: phraseWords.length };
                        phraseWordStacks[phraseText] = [...Array(phraseWords.length).keys()].map(j => ({
                            indexInPhrase: phraseWords.length - j,
                            phraseLength: phraseWords.length
                        }));
                    }
                    else {
                        if (phraseWordStacks[phraseText] && phraseWordStacks[phraseText].length != 0)
                            tokenObject.phrases[phraseText] = phraseWordStacks[phraseText].pop();
                    }
                }
            }
            isWord = !isWord;
        }
        return tokenObjects;
    }
    combineTokens(words) {
        return words.join(" ");
    }
}
//# sourceMappingURL=SpaceBasedWordParser.js.map