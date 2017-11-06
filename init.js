import {getValueByPath, setValueByPath} from './util'

import convertFull from './convertFull'

/**
 * 将数组或对象中指定 fields 通过 convertFull 转换为拼音对象
 * 示例：init([{name: '张三'}], ['name'])
 * -> [{name: '张三', $$pinyin: {name: {short: 'zs', full: 'zhangsan', text: '张三'}}}]
 * @param input 输入的数组或对象
 * @param fields 指定字段
 * @param pinyinKey 转换出的拼音对象放在该字段
 * @returns {*} 返回修改后的输入数组或对象
 */
export default (input, fields, pinyinKey = '$$pinyin') => {
    if (!input) return
    let setAttr = item => {
        let pinyinData = getValueByPath(item, pinyinKey)
        if (!pinyinData) setValueByPath(item, pinyinKey, pinyinData = {})
        if (!fields) {
            fields = []
            for (let field in pinyinData) fields.push(field)
        }
        fields.forEach(field => {
            let pinyin = getValueByPath(pinyinData, field)
            if (!pinyin) {
                setValueByPath(pinyinData, field, convertFull(getValueByPath(item, field, '') + ''))
            } else {
                pinyin.start = pinyin.length = 0
            }
        })
    }
    if (Array.isArray(input)) {
        input.forEach(setAttr)
    } else {
        setAttr(input)
    }
    return input
}
