import { SpaceBasedWordParser } from "../../src/parsers/SpaceBasedWordParser.js";
//All letters from: Basic Latin+Latin-1 Supplement, plus hyphen and apostrophe
const latinParser = new SpaceBasedWordParser(`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'-`);
export const parsers = {
    "en": latinParser,
    "es": latinParser,
    "fr": latinParser,
    "de": latinParser,
    "it": latinParser,
    "nl": latinParser,
    "se": latinParser,
    "no": latinParser,
    "dk": latinParser,
    "pt": latinParser,
};
export function getParser(languageCode) {
    return parsers[languageCode];
}
//# sourceMappingURL=parsers.js.map