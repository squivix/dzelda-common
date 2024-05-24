export declare function escapeRegExp(text: string): string;
type Enum<E> = Record<keyof E, number | string> & {
    [k: number]: string;
};
export declare function numericEnumValues<E extends Enum<E>>(inputEnum: E): number[];
export declare function shallowObjectEquals(obj1: Record<string, any>, obj2: Record<string, any>): boolean;
export declare function isEmptyObject(obj: object): boolean;
export declare function excludeProperties<T, K extends keyof T>(obj: T, keysToOmit: K[]): Omit<T, K>;
export declare function cleanUndefined(obj: any): any;
export declare function isObject(item: any): item is {
    [p: string]: any;
};
export declare function mergeDeep(target: {
    [p: string]: any;
}, source: {
    [p: string]: any;
}): {
    [p: string]: any;
};
export declare function toSentenceCase(s: string): string;
export declare function kibiBytes(sizeInKib: number): number;
export declare function mebiBytes(sizeInMib: number): number;
export declare function kiloBytes(sizeInKb: number): number;
export declare function megaBytes(sizeInMb: number): number;
export {};
