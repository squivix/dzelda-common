import {describe, test, it, TestContext, expect} from "vitest";
import {TokenObject, WordParser} from "@/src/parsers/WordParser.js";
import {getParser} from "@/src/parsers/parsers.js";
import fs from "fs-extra";
import path from "path";

interface LocalTestContext extends TestContext {
    parser: WordParser;
}

/**{@link SpaceBasedWordParser}*/
describe("SpaceBasedWordParser", () => {
    describe.each([
        ["English", "en"],
    ])("%s parser", (languageName, languageCode) => {

        const parser = getParser(languageCode);

        /**{@link SpaceBasedWordParser#parseText}*/
        describe.todo("parseText", () => {
        });

        /**{@link SpaceBasedWordParser#tokenizeText}*/
        describe.todo("tokenizeText", () => {
        });

        /**{@link SpaceBasedWordParser#detectPhrases}*/
        describe("detectPhrases", async () => {
            const dataPath = `test/test-data/parsers/tokenizeText/${languageCode}.json`;
            const data = await fs.readJSON(path.join(process.cwd(), dataPath)) as {
                text: string,
                phrases: string[],
                tokens: TokenObject[]
            }[];

            describe<LocalTestContext>("It should tokenize text and correctly identify phrases", () => {
                test.each(data.map(d => [d.text, d.phrases, d.tokens]))
                ("test case %#", (text: string, phrases: string[], expectedTokens: TokenObject[]) => {
                    const tokens = parser.detectPhrases(text, phrases);
                    console.log(JSON.stringify(tokens));
                    expect(tokens).toEqual(expectedTokens);
                });
            });
        });
        /**{@link SpaceBasedWordParser#normalizeText}*/
        describe.todo("transformWord", () => {
        });
    });
});
