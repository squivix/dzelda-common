import { ParseTextResult, TokenObject, WordParser } from "../../src/parsers/WordParser.js";
export declare class SpaceBasedWordParser extends WordParser {
    splitCharsRegex: RegExp;
    splitKeepDelimCharsRegex: RegExp;
    ignoreCase: boolean;
    constructor(wordChars: string, { ignoreCase }?: {
        ignoreCase?: boolean;
    });
    parseText(text: string): ParseTextResult;
    normalizeText(wordText: string): string;
    tokenizeText(text: string): TokenObject[];
}
