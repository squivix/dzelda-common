export class WordParser {
    splitWords(words, { keepDuplicates = true } = {}) {
        if (words === "")
            return [];
        const wordsArray = words.split(" ");
        if (keepDuplicates)
            return wordsArray;
        else
            return Array.from(new Set(wordsArray));
    }
    combineWords(words) {
        return words.join(" ");
    }
}
WordParser.MAX_WORD_LENGTH = 255;
//# sourceMappingURL=WordParser.js.map