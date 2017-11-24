/**
 * 测试字符串 pinyin 是否包含 filter
 * 示例：test('张三', 'zhangsan') -> true；test('张三', 'zs') -> true
 * @param pinyin 拼音对象，是 convertFull 返回的结果
 * @param filter 待测试字符串
 * @param caseInsensitive 是否忽略大小写，默认为 true
 * @returns {boolean} 是否包含
 */
export default (pinyin, filter, caseInsensitive = true) => {
    if (!filter) return false
    if (caseInsensitive) filter = filter.toLowerCase()
    let text = caseInsensitive ? pinyin.text.toLowerCase() : pinyin.text
    if (text.indexOf(filter) >= 0) return true
    let short = caseInsensitive ? pinyin.short.toLowerCase() : pinyin.short
    if (short.indexOf(filter) >= 0) return true
    let full = caseInsensitive ? pinyin.full.toLowerCase() : pinyin.full
    return full.indexOf(filter) >= 0
}
