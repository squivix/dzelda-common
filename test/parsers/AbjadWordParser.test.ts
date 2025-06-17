import {describe, expect, test, TestContext} from "vitest";
import {ParseTextResult, TokenObject, WordParser} from "@/src/parsers/WordParser.js";
import {getParser} from "@/src/parsers/parsers.js";
import {AbjadWordParser} from "@/src/parsers/AbjadWordParser.js";
import fs from "fs-extra";
import path from "path";

interface LocalTestContext extends TestContext {
    parser: WordParser;
}

/**{@link AbjadWordParser}*/
describe("AbjadWordParser", () => {
    describe.each([
        ["Arabic", "ar"],
    ])("%s parser", (languageName, languageCode) => {

        const parser = getParser(languageCode);

        /**{@link SpaceBasedWordParser#parseText}*/
        describe("parseText", async () => {
            const dataPath = `test/test-data/parsers/parseText/${languageCode}.json`;
            const data = await fs.readJSON(path.join(process.cwd(), dataPath)) as {
                text: string,
                parseResult: ParseTextResult,
            }[];
            describe<LocalTestContext>("It should parse text, correctly splitting it into words, and identify diacritics variants", () => {
                test.each(data.map(d => [d.text, d.parseResult]))
                ("test case %#", (text: string, expectedResult: ParseTextResult) => {
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
            describe.todo<LocalTestContext>("It should tokenize text and correctly identify phrases", () => {
            });
        });
        /**{@link SpaceBasedWordParser#transformWord}*/
        describe.todo("transformWord", () => {
        });
    });
});
