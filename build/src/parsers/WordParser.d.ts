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
export type ParseTextResult = {
    normalizedText: string;
    normalizedWords: string[];
    wordToVariantsMap: Record<string, string[]>;
};
export declare abstract class WordParser {
    static MAX_WORD_LENGTH: number;
    abstract parseText(text: string): ParseTextResult;
    abstract normalizeText(wordText: string): string;
    abstract tokenizeText(text: string): TokenObject[];
    splitWords(normalizedTextString: string, { keepDuplicates }?: {
        keepDuplicates?: boolean;
    }): string[];
    combineWords(words: string[]): string;
    detectPhrases(text: string, phrases: string[]): TokenWithPhrases[];
}
