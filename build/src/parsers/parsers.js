import { SpaceBasedWordParser } from "../../src/parsers/SpaceBasedWordParser.js";
//All letters from: Basic Latin+Latin-1 Supplement+Latin Extended-A, plus hyphen and apostrophe
const latinParser = new SpaceBasedWordParser(`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ'’-`);
export const parsers = {
    "en": latinParser,
    "es": latinParser,
    "fr": latinParser,
    "de": latinParser,
    "it": latinParser,
    "nl": latinParser,
    "sv": latinParser,
    "nb": latinParser,
    "da": latinParser,
    "pt": latinParser
};
export function getParser(languageCode) {
    return parsers[languageCode];
}
//# sourceMappingURL=parsers.js.map