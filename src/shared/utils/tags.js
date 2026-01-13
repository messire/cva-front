/**
 * @typedef {Object} NormalizeTagsOptions
 * @property {boolean} [dedupe=true]
 * @property {boolean} [caseInsensitive=true]
 * @property {boolean} [trim=true]
 * @property {number}  [maxTagLength=64]
 * @property {number}  [maxTags=50]
 */

/**
 * @param {unknown} input
 * @param {NormalizeTagsOptions} [options]
 * @returns {string[]}
 */
export function normalizeTags(input, options = {}) {
    const {
        dedupe = true,
        caseInsensitive = true,
        trim = true,
        maxTagLength = 64,
        maxTags = 50,
    } = options;

    const arr = Array.isArray(input) ? input : [];

    /** @type {string[]} */
    const cleaned = [];

    /** @type {Set<string>} */
    const seen = new Set();

    for (const raw of arr) {
        if (raw == null) continue;

        let tag = String(raw);
        if (trim) {
            tag = tag.trim();
        }
        if (!tag) continue;

        if (maxTagLength > 0 && tag.length > maxTagLength) {
            tag = tag.slice(0, maxTagLength);
            if (trim){
                tag = tag.trim();
            }
            if (!tag) continue;
        }

        if (dedupe) {
            const key = caseInsensitive ? tag.toLowerCase() : tag;
            if (seen.has(key)) continue;
            seen.add(key);
        }

        cleaned.push(tag);

        if (maxTags > 0 && cleaned.length >= maxTags) break;
    }

    return cleaned;
}

/**
 * @param {string} text
 * @returns {string[]}
 */
export function splitTags(text) {
    if (text == null){
        return [];
    }
    const result = String(text);
    return result
        .split(/[,\n;\t\r]+/g)
        .map(value => value.trim())
        .filter(Boolean);
}

/**
 * @param {string[]} current
 * @param {string} incomingText
 * @param {NormalizeTagsOptions} [options]
 * @returns {string[]}
 */
export function mergeTagsFromText(current, incomingText, options = {}) {
    const next = [
        ...(Array.isArray(current) ? current : []),
        ...splitTags(incomingText)
    ];
    return normalizeTags(next, options);
}
