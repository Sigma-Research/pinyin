/**
 * 高亮指定字符串
 * 示例：
 * highlight('I love Chinese', 'love') 或者 highlight('I love Chinese', {start: 2, length: 4})
 * 都将返回 'I <span class="match">love</span> Chinese'
 * @param input 文本
 * @param match 待高亮的 string；或者是待高亮的位置 {start, length}
 * @param successive 当使用字符串匹配时，指出待高亮字符串是否应连续
 * @param renderer 高亮方式，默认为添加 css class `match`。
 * 可以为 string，指定 css class；可以为 Function: string => string，接收待高亮 string， 返回高亮方式
 * @returns {*} 高亮后的字符串
 */
export default (input, match, successive, renderer) => {
    if (!input || !match) return input
    const render = (match_str, renderer) => {
        renderer = renderer || 'match'
        return typeof renderer === 'string' ? `<span class="${renderer}">${match_str}</span>` : renderer(match_str)
    }
    if (typeof match === 'string') { // highlight by match (input, match, successive = false)
        if (successive === true) {
            return input.replace(match, render(match, renderer))
        } else {
            renderer = successive
            let regexp = match.split(/\s+/g).map(s => s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')).join('|')
            return input.replace(new RegExp(regexp, 'igm'), match => render(match, renderer))
        }
    } else { // highlight by position(input, {start, length})
        renderer = successive
        let {start, length} = match
        if (!length) return input
        let before = input.substring(0, start)
        let match_str = input.substring(start, start + length)
        let after = input.substring(start + length)
        return before + render(match_str, renderer) + after
    }
}
