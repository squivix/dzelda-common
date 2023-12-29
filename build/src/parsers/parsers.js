import { SpaceBasedWordParser } from "../../src/parsers/SpaceBasedWordParser.js";
export const parsers = {
    //temporary naive parsers
    "en": new SpaceBasedWordParser("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'-"),
    "es": new SpaceBasedWordParser("abcdefghijklmnopqrstuvwxyzáéíñóúüABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÑÓÚÜ-"),
    "it": new SpaceBasedWordParser("abcdefghilmnopqrstuvzABCDEFGHILMNOPQRSTUVZ'"),
    "de": new SpaceBasedWordParser("abcdefghijklmnopqrstuvwxyzäöüABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ"),
    "pt": new SpaceBasedWordParser("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáàâãéèêíìîóòôõúùûÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛ'"),
    "fr": new SpaceBasedWordParser("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZéèàâêîôûçëïüœ'"),
    "la": new SpaceBasedWordParser("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),
};
export function getParser(languageCode) {
    return parsers[languageCode];
}
//# sourceMappingURL=parsers.js.map