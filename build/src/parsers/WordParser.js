export class WordParser {
    splitWords(words, { keepDuplicates = true } = {}) {
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
//# sourceMappingURL=WordParser.js.map