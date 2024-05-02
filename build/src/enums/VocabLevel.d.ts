export declare enum VocabLevel {
    IGNORED = -1,
    NEW = 0,
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4,
    LEARNED = 5,
    KNOWN = 6
}
export declare function defaultVocabsByLevel(): Record<VocabLevel, number>;
