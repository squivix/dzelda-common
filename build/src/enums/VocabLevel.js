import { numericEnumValues } from "../../src/utils/utils.js";
export var VocabLevel;
(function (VocabLevel) {
    VocabLevel[VocabLevel["IGNORED"] = -1] = "IGNORED";
    VocabLevel[VocabLevel["NEW"] = 0] = "NEW";
    VocabLevel[VocabLevel["LEVEL_1"] = 1] = "LEVEL_1";
    VocabLevel[VocabLevel["LEVEL_2"] = 2] = "LEVEL_2";
    VocabLevel[VocabLevel["LEVEL_3"] = 3] = "LEVEL_3";
    VocabLevel[VocabLevel["LEVEL_4"] = 4] = "LEVEL_4";
    VocabLevel[VocabLevel["LEARNED"] = 5] = "LEARNED";
    VocabLevel[VocabLevel["KNOWN"] = 6] = "KNOWN";
})(VocabLevel || (VocabLevel = {}));
export function defaultVocabsByLevel() {
    return numericEnumValues(VocabLevel).reduce((a, v) => (Object.assign(Object.assign({}, a), { [v]: 0 })), {});
}
//# sourceMappingURL=VocabLevel.js.map