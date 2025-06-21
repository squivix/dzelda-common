import { ParseTextResult, TokenObject, WordParser } from "../../src/parsers/WordParser.js";
export declare class AbjadWordParser extends WordParser {
    splitCharsRegex: RegExp;
    splitKeepDelimCharsRegex: RegExp;
    diacriticsChars: string;
    diacriticsCharSet: Set<string>;
    constructor(wordChars: string, diacriticsCharacters: string, options?: {});
    parseText(text: string): ParseTextResult;
    normalizeText(wordText: string): string;
    tokenizeText(text: string): TokenObject[];
}
