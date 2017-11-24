const RE_PROP_NAME = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

const RE_ESCAPE_CHAR = /\\(\\)?/g

const RE_NUMBER = /^\d+$/g

export const stringToPath = string => {
    let result = []
    string.replace(RE_PROP_NAME, (match, number, quote, string) => {
        result.push(quote ? string.replace(RE_ESCAPE_CHAR, '$1') : (number || match))
    })
    return result
}

export const getValueByPath = (obj, path, strict = false) => {
    let keys = stringToPath(path)
    let i = 0
    for (let len = keys.length; i < len - 1; i++) {
        if (!obj && !strict) break
        let key = keys[i]
        if (typeof obj === 'object' && (key in obj)) {
            obj = obj[key]
        } else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!')
            }
            break
        }
    }
    return obj ? obj[keys[i]] : null
}

export const setValueByPath = (obj, path, value) => {
    let keys = stringToPath(path)
    let i = 0
    for (let len = keys.length; i < len - 1; i++) {
        let key = keys[i]
        if (!obj[key]) obj[key] = RE_NUMBER.test(keys[i + 1]) ? [] : {}
        obj = obj[key]
    }
    return (obj[keys[i]] = value)
}
