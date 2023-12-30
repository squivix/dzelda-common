export type TokeObjectPhrases = {
    text: string;
    phraseOccurrenceIndex: number;
}[];
export type TokenObject = {
    text: string;
    parsedText?: string;
    isWord: boolean;
};
export type TokenWithPhrases = TokenObject & {
    phrases: TokeObjectPhrases;
};
export declare abstract class WordParser {
    abstract parseText(text: string): string;
    abstract transformWord(wordText: string): string;
    abstract tokenizeText(text: string): TokenObject[];
    abstract detectPhrases(text: string, phrases: string[]): TokenWithPhrases[];
    splitWords(words: string, { keepDuplicates }?: {
        keepDuplicates?: boolean;
    }): string[];
    combineWords(words: string[]): string;
}
