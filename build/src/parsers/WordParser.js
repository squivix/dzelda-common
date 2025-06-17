export class WordParser {
    splitWords(normalizedTextString, { keepDuplicates = true } = {}) {
        if (normalizedTextString === "")
            return [];
        const normalizedWordsArray = normalizedTextString.split(" ");
        if (keepDuplicates)
            return normalizedWordsArray;
        else
            return Array.from(new Set(normalizedWordsArray));
    }
    combineWords(words) {
        return words.join(" ");
    }
    detectPhrases(text, phrases) {
        const tokens = this.tokenizeText(text); //well it's about to be anyway
        const phraseObjects = {};
        for (const phrase of phrases)
            phraseObjects[phrase] = { words: phrase.split(" "), occurrencesCount: 0 };
        const phraseWordQueues = new Set();
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
                        tokens[i].phrases.push(queue.shift());
                    else
                        phraseWordQueues.delete(queue);
                });
            }
            else {
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
WordParser.MAX_WORD_LENGTH = 255;
//# sourceMappingURL=WordParser.js.map