export function toCapitalizedCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function cleanObject(obj) {
    Object.keys(obj).forEach(function (key) {
        if (obj[key] === undefined)
            delete obj[key];
    });
    return obj;
}
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
function rangeIntersectsNode(range, node) {
    if (range.intersectsNode)
        return range.intersectsNode(node);
    else {
        let nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        }
        catch (e) {
            nodeRange.selectNodeContents(node);
        }
        return range.compareBoundaryPoints(Range.END_TO_START, nodeRange) == -1 &&
            range.compareBoundaryPoints(Range.START_TO_END, nodeRange) == 1;
    }
}
export function chuckArray(array, chunkSize) {
    if (chunkSize <= 0)
        throw Error("Chuck size must be positive");
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize)
        chunks.push(array.slice(i, i + chunkSize));
    return chunks;
}
export function padSequence(numbers, leftPadding, rightPadding, minValue, maxValue) {
    const sortedNumbers = [...numbers].sort();
    const result = [];
    for (let i = 1; i <= leftPadding; i++) {
        const element = sortedNumbers[0] - i;
        if (element < minValue)
            break;
        result.push(element);
    }
    result.push(...sortedNumbers);
    for (let i = 1; i <= rightPadding; i++) {
        const element = sortedNumbers[sortedNumbers.length - 1] + i;
        if (element > maxValue)
            break;
        result.push(element);
    }
    return result;
}
//# sourceMappingURL=utils.js.map