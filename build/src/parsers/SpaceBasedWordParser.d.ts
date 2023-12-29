import { TokenObject, WordParser } from "../../src/parsers/WordParser.js";
type ReplaceCharsMap = {
    [character: string]: string;
};
export declare class SpaceBasedWordParser extends WordParser {
    notWordCharsRegex: RegExp;
    replaceCharsMap: ReplaceCharsMap;
    ignoreCase: boolean;
    constructor(wordChars?: string, replaceCharsMap?: ReplaceCharsMap, ignoreCase?: boolean);
    parseText(text: string, keepDuplicates?: boolean): [string, string[]];
    transformWords(wordsText: string): string;
    tokenizeText(text: string, phrases: string[]): TokenObject[];
    combineTokens(words: string[]): string;
}
export {};
