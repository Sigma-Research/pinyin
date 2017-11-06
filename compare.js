import convert from './convert'

/**
 * 按拼音对 a, b 进行排序
 * 如果 a 在 b 前面，返回 -1；如果 a 和 b 读音相同，返回 0；如果 a 在 b 后面，返回 1
 * @param {string} a 待比较的第一个汉字
 * @param {string} b 待比较的第二个汉字
 * @param caseInsensitive 忽略大小写，默认为 true
 * @returns {number} 读音顺序
 */
export default (a, b, caseInsensitive = true) => {
    a = convert(a)
    b = convert(b)
    if (caseInsensitive) {
        a = a.toLowerCase()
        b = b.toLowerCase()
    }
    if (a < b) return -1
    if (a > b) return 1
    return 0
}
