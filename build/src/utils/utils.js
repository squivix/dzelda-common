//from https://stackoverflow.com/a/9310752/14200676
export function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
export function numericEnumValues(inputEnum) {
    return Object.values(inputEnum).filter((v) => !isNaN(Number(v))).map(v => Number(v));
}
export function shallowObjectEquals(obj1, obj2) {
    return Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(key => obj1[key] === obj2[key]);
}
export function isEmptyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
export function excludeProperties(obj, keysToOmit) {
    const result = Object.assign({}, obj);
    for (const key of keysToOmit) {
        delete result[key];
    }
    return result;
}
export function cleanUndefined(obj) {
    if (typeof obj !== "object" || obj === null)
        return obj;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === undefined)
                delete obj[key];
            else
                obj[key] = cleanUndefined(obj[key]);
        }
    }
    return obj;
}
export function isObject(item) {
    return (item && typeof item === "object" && !Array.isArray(item));
}
export function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
export function toSentenceCase(s) {
    if (s.length > 0)
        return `${s[0].toUpperCase()}${s.slice(1)}`;
    return s;
}
export function kibiBytes(sizeInKib) {
    return sizeInKib * 1024;
}
export function mebiBytes(sizeInMib) {
    return sizeInMib * 1048576;
}
export function kiloBytes(sizeInKib) {
    return sizeInKib * 1000;
}
export function megaBytes(sizeInMib) {
    return sizeInMib * 1000000;
}
//# sourceMappingURL=utils.js.map