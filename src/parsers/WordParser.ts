export type TokeObjectPhrases={ text: string, phraseOccurrenceIndex: number }[];
export type TokenObject = {
    text: string,
    parsedText?: string,
    isWord: boolean,
    phrases: TokeObjectPhrases
}

export abstract class WordParser {
    /**
     * Parses a text into a list of words.
     * @param text{string} The input text which will be parsed
     * @param keepDuplicates{boolean}
     * @return {string[]} A list of the words in `text`
     * */
    abstract parseText(text: string, keepDuplicates?: boolean): [string, string[]]

    abstract transformWords(wordText: string): string;

    abstract tokenizeText(text: string, phrases: string[]): TokenObject[]

    abstract combineTokens(words: string[]): string
}
