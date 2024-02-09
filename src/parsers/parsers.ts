import {SpaceBasedWordParser} from "@/src/parsers/SpaceBasedWordParser.js";
import {WordParser} from "@/src/parsers/WordParser.js";

//All letters from: Basic Latin+Latin-1 Supplement+Latin Extended-A, plus hyphen and apostrophe
const latinParser = new SpaceBasedWordParser(`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ'-`);

export const parsers: { [languageCode: string]: WordParser } = {
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

export function getParser(languageCode: string) {
    return parsers[languageCode];
}
