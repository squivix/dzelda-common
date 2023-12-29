import { WordParser } from "@/src/parsers/WordParser.js";
export declare const parsers: {
    [languageCode: string]: WordParser;
};
export declare function getParser(languageCode: string): WordParser;
