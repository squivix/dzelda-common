import {SpaceBasedWordParser} from "@/src/parsers/SpaceBasedWordParser.js";
import {WordParser} from "@/src/parsers/WordParser.js";
import {AbjadWordParser} from "@/src/parsers/AbjadWordParser.js";

//All letters from: Basic Latin+Latin-1 Supplement+Latin Extended-A, plus hyphen, apostrophes, and numbers
const latinParser = new SpaceBasedWordParser(`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ'’-`);

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
    "pt": latinParser,
    "ar": new AbjadWordParser(`ابتثجحخدذرزسشصضطظعغفقكلمنهوأآإؤئىءةي`, `ًٌٍَُِّْ`)
};

export function getParser(languageCode: string) {
    return parsers[languageCode];
}
