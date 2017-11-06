/**
 * 匹配字符串 filter 在 pinyin 中的位置
 * @param pinyin 拼音对象，是 convertFull 返回的结果
 * @param filter 待匹配字符串
 * @param caseInsensitive 是否忽略大小写，默认为 true
 * @returns {{start: number, length: number} | null} 匹配的位置
 */
export default (pinyin, filter, caseInsensitive = true) => {
    let index
    if (!filter) return null
    if (caseInsensitive) filter = filter.toLowerCase()
    let text = caseInsensitive ? pinyin.text.toLowerCase() : pinyin.text
    if ((index = text.indexOf(filter)) >= 0) return {start: index, length: filter.length}
    let short = caseInsensitive ? pinyin.short.toLowerCase() : pinyin.short
    if ((index = short.indexOf(filter)) >= 0) return {start: index, length: filter.length}
    let full = caseInsensitive ? pinyin.full.toLowerCase() : pinyin.full
    if ((index = full.indexOf(filter)) >= 0) {
        let map = pinyin.map
        let indexEnd = index + filter.length
        let start
        let end
        for (let i = 0, len = map.length; i < len; i++) {
            if (map[i] <= index) start = i
            if (map[i] < indexEnd) {
                end = i
            } else {
                break
            }
        }
        return {start, length: end - start + 1}
    }
    return null
}
