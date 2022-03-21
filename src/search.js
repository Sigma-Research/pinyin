import { getValueByPath } from './util'

import exec from './exec'
import init from './init'

/**
 * 检查多个字段 fields 是否匹配关键词 filter，副作用是会把该字段设置上 $$pinyin 属性
 * 示例：
 * let students = [{name: '张三', number: '123'}, {name: '李四', number: '456'}]
 * search(students, 'zs', ['name', 'number'])
 * 返回 [{name: '张三', number: '123', $$pinyin: {name: {start: 0, length: 2}}, number: {start: 0, length: 0}}]
 * 表示 匹配了张三同学的名字，同时可以用 $$pinyin.name 来高亮 name，结合 highlight 使用。
 * @param input 数组
 * @param filter 匹配关键词
 * @param fields 待检查的字段
 * @param or 表示多个字段只要有一个匹配即可，如果 or=false，必须每个字段都匹配
 * @param pinyinKey 检查匹配的位置设置在改属性上，默认为 `$$pinyin`
 * @returns {*} 满足结果的项
 */
export default (input, filter, fields, or = true, pinyinKey = '$$pinyin') => {
    if (!input) return
    init(input, fields, pinyinKey)
    filter = (filter && filter.trim()) || ''
    if (!filter) return input
    let test = item => {
        // 某字段是否已经匹配到过关键词
        let checked = {}
        let testField = (filter, field) => {
            let pinyin = getValueByPath(getValueByPath(item, pinyinKey), field)
            let match = exec(pinyin, filter)
            // 如果该字段已经匹配到过关键词，不再设置 start、length
            if (!checked[field] && match) {
                pinyin.start = match.start
                pinyin.length = match.length
            }
            return !!match
        }
        let testFilter = filter => {
            let pass
            for (let i = 0, len = fields.length; i < len; i++) {
                let field = fields[i]
                // 检查某个字段是否匹配关键词，如果已经匹配并且or=true，通过
                if (testField(filter, field)) {
                    checked[field] = true
                    if (or) pass = true
                } else if (!or) {
                    return false
                }
            }
            return pass
        }
        // 关键词用空格分割，检查每个关键词
        let filters = filter.split(/\s+/g)
        for (let i = 0, len = filters.length; i < len; i++) {
            if (!testFilter(filters[i])) return false
        }
        return true
    }
    // return input.filter(test)
    return input.filter(item => {
        if (test(item)) {
            return true;
        }
        if (item.children && item.children.length) {
            return item.children.some(item => test(item));
        }   
        return false;
    });
}
