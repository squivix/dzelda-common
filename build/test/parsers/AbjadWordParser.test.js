import { describe, expect, test } from "vitest";
import { getParser } from "../../src/parsers/parsers.js";
import fs from "fs-extra";
import path from "path";
/**{@link AbjadWordParser}*/
describe("AbjadWordParser", () => {
    describe.each([
        ["Arabic", "ar"],
    ])("%s parser", (languageName, languageCode) => {
        const parser = getParser(languageCode);
        /**{@link SpaceBasedWordParser#parseText}*/
        describe("parseText", async () => {
            const dataPath = `test/test-data/parsers/parseText/${languageCode}.json`;
            const data = await fs.readJSON(path.join(process.cwd(), dataPath));
            describe("It should parse text, correctly splitting it into words, and identify diacritics variants", () => {
                test.each(data.map(d => [d.text, d.parseResult]))("test case %#", (text, expectedResult) => {
                    const tokens = parser.parseText(text);
                    console.log(JSON.stringify(tokens));
                    expect(tokens).toEqual(expectedResult);
                });
            });
        });
        /**{@link SpaceBasedWordParser#tokenizeText}*/
        describe.todo("tokenizeText", () => {
        });
        /**{@link SpaceBasedWordParser#detectPhrases}*/
        describe.todo("detectPhrases", async () => {
            describe.todo("It should tokenize text and correctly identify phrases", () => {
            });
        });
        /**{@link SpaceBasedWordParser#transformWord}*/
        describe.todo("transformWord", () => {
        });
    });
});
//# sourceMappingURL=AbjadWordParser.test.js.map