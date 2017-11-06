import invert from './invert'

/**
 * 转换中文为固定格式
 * {
 *   full: string,      // 全拼音
 *   short: string,     // 韵母
 *   map: Array,        // 每个字在 full 中的位置
 *   text: string,      // 原始的中文
 *   toString: Function // 将返回全拼音（即 full）
 * }
 * @param text 中文字符串
 * @returns {{full: string, short: string, map: Array, text: string, toString: (function(): string)}} 拼音对象
 */
export default text => {
    let full = ''
    let short = ''
    let map = []
    for (let i = 0, len = text.length; i < len; i++) {
        let ch = text[i]
        let unicode = ch.charCodeAt(0)
        // 如果不在汉字处理范围之内,返回原字符.
        if (unicode > 40869 || unicode < 19968) {
            map.push(full.length)
            full += ch
            short += ch
        } else {
            let name = invert[ch]
            if (name) {
                map.push(full.length)
                full += name
                short += name[0]
            } else {
                map.push(full.length)
                full += ch
                short += ch
            }
        }
    }
    let toString = () => full
    return {full, short, map, text, toString}
}
