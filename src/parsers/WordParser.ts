export type TokeObjectPhrases = { text: string, phraseOccurrenceIndex: number }[];
export type TokenObject = {
    text: string,
    parsedText?: string,
    isWord: boolean,
}
export type TokenWithPhrases = TokenObject & { phrases: TokeObjectPhrases }

export type ParseTextResult = {
    normalizedText: string,
    normalizedWords: string[],
    wordToVariantsMap: Record<string, string[]>
}

export abstract class WordParser {
    static MAX_WORD_LENGTH = 255;

    abstract parseText(text: string): ParseTextResult

    abstract transformWord(wordText: string): string;

    abstract tokenizeText(text: string): TokenObject[]

    splitWords(normalizedTextString: string, {keepDuplicates = true}: { keepDuplicates?: boolean } = {}) {
        if (normalizedTextString === "")
            return [];
        const normalizedWordsArray = normalizedTextString.split(" ");
        if (keepDuplicates)
            return normalizedWordsArray;
        else
            return Array.from(new Set(normalizedWordsArray));
    }

    combineWords(words: string[]) {
        return words.join(" ");
    }


    detectPhrases(text: string, phrases: string[]): TokenWithPhrases[] {
        const tokens = this.tokenizeText(text) as TokenWithPhrases[]; //well it's about to be anyway
        const phraseObjects: { [pt: string]: { occurrencesCount: number, words: string[] } } = {};
        for (const phrase of phrases)
            phraseObjects[phrase] = {words: phrase.split(" "), occurrencesCount: 0};
        const phraseWordQueues: Set<TokeObjectPhrases> = new Set();
        for (let i = 0; i < tokens.length; i++) {
            tokens[i].phrases = [];
            if (tokens[i].isWord) {
                for (const phraseText of phrases) {
                    let isTokenFirstInPhrase = true;
                    const phraseWords = phraseObjects[phraseText].words;
                    let j = i, w = 0;
                    while (w < phraseWords.length && j < tokens.length) {
                        const futureToken = tokens[j];
                        if (futureToken.isWord) {
                            if (futureToken.parsedText !== phraseWords[w]) {
                                isTokenFirstInPhrase = false;
                                break;
                            }
                            w++;
                        }
                        j++;
                    }
                    isTokenFirstInPhrase = isTokenFirstInPhrase && w == phraseWords.length;
                    if (isTokenFirstInPhrase) {
                        phraseWordQueues.add([...Array(phraseWords.length).keys()].map(indexInPhrase => ({
                            text: phraseText,
                            // indexInPhrase: indexInPhrase,
                            phraseOccurrenceIndex: phraseObjects[phraseText].occurrencesCount
                        })));
                        phraseObjects[phraseText].occurrencesCount++;
                    }
                }
                phraseWordQueues.forEach((queue) => {
                    if (queue.length != 0)
                        tokens[i].phrases.push(queue.shift()!);
                    else
                        phraseWordQueues.delete(queue);
                });
            } else {
                phraseWordQueues.forEach((queue) => {
                    if (queue.length != 0)
                        tokens[i].phrases.push(queue[0]);
                    else
                        phraseWordQueues.delete(queue);
                });
            }
        }

        return tokens;
    }
}
