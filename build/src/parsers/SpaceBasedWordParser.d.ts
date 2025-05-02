import { TokenObject, TokenWithPhrases, WordParser } from "../../src/parsers/WordParser.js";
export declare class SpaceBasedWordParser extends WordParser {
    notWordCharsRegex: RegExp;
    notWordCharsKeepDelimiterRegex: RegExp;
    ignoreCase: boolean;
    maxWordLength: number;
    constructor(wordChars?: string, { ignoreCase, maxWordLength }?: {
        ignoreCase?: boolean;
        maxWordLength?: number;
    });
    parseText(text: string): string;
    transformWord(wordText: string): string;
    tokenizeText(text: string): TokenObject[];
    detectPhrases(text: string, phrases: string[]): TokenWithPhrases[];
}
