export type TokeObjectPhrases = { text: string, phraseOccurrenceIndex: number }[];
export type TokenObject = {
    text: string,
    parsedText?: string,
    isWord: boolean,
}
export type TokenWithPhrases = TokenObject & { phrases: TokeObjectPhrases }


export abstract class WordParser {
    abstract parseText(text: string, options: { transform: boolean }): string

    abstract transformWord(wordText: string): string;

    abstract tokenizeText(text: string): TokenObject[]

    abstract detectPhrases(text: string, phrases: string[]): TokenWithPhrases[]

    combineWords(words: string[]) {
        return words.join(" ");
    }
}
