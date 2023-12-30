import { TokenObject, TokenWithPhrases, WordParser } from "../../src/parsers/WordParser.js";
export declare class SpaceBasedWordParser extends WordParser {
    notWordCharsRegex: RegExp;
    notWordCharsKeepDelimiterRegex: RegExp;
    ignoreCase: boolean;
    constructor(wordChars?: string, { ignoreCase }?: {
        ignoreCase?: boolean;
    });
    parseText(text: string, options: {
        transform: boolean;
    }): string;
    transformWord(wordText: string): string;
    tokenizeText(text: string): TokenObject[];
    detectPhrases(text: string, phrases: string[]): TokenWithPhrases[];
}
