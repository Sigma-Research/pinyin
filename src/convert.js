import invert from './invert'

/**
 * 将中文转换为拼音，非中文的字符将会保留
 * @param {string} text 中文
 * @returns {string} 中文拼音
 */
export default text => {
    let result = ''
    for (let i = 0, len = text.length; i < len; i++) {
        let char = text[i]
        let charCode = char.charCodeAt(0)
        // 如果不在汉字处理范围之内,返回原字符.
        if (charCode > 40869 || charCode < 19968) {
            result += char
        } else {
            let name = invert[char]
            if (name !== undefined) result += name
        }
    }
    return result
}
