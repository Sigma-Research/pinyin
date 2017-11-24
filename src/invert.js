import dict from './dict.js'

/**
 * 中文字和读音的映射对象
 * @type {Object}
 */
let invert = {}

for (let pinyin in dict) {
    let words = dict[pinyin]
    for (let i = 0, len = words.length; i < len; i++) {
        invert[words[i]] = pinyin
    }
}

export default invert
