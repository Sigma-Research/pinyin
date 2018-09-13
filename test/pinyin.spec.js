import { compare, convert, convertFull, exec, highlight, init, search, test } from '../src/pinyin'
import { expect } from 'chai'

describe('pinyin', () => {
    it('convert', () => {
        expect(convert('你好')).to.eql('nihao')
        expect(convert('hello')).to.eql('hello')
        expect(convert('hello 你好')).to.eql('hello nihao')
    })

    it('convertFull', () => {
        let pinyin = convertFull('hello 你好')
        expect(pinyin.full).to.equal('hello nihao')
        expect(pinyin.short).to.equal('hello nh')
        expect(convertFull('hello 你好').map).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 8])
        expect(pinyin.text).to.equal('hello 你好')
    })

    it('exec', () => {
        let pinyin = convertFull('hello 你好')
        expect(exec(pinyin, null)).to.equal(null)
        expect(exec(pinyin, 'hello')).to.deep.equal({start: 0, length: 5})
        expect(exec(pinyin, '你好')).to.deep.equal({start: 6, length: 2})
        expect(exec(pinyin, 'nh')).to.deep.equal({start: 6, length: 2})
        expect(exec(pinyin, 'hello nh')).to.deep.equal({start: 0, length: 8})
        expect(exec(pinyin, 'world')).to.equal(null)
    })

    it('test', () => {
        let pinyin = convertFull('hello 你好')
        expect(test(pinyin, null)).to.equal(false)
        expect(test(pinyin, 'hello')).to.equal(true)
        expect(test(pinyin, '你好')).to.equal(true)
        expect(test(pinyin, 'hello 你好')).to.equal(true)
        expect(test(pinyin, 'nh')).to.equal(true)
        expect(test(pinyin, 'hello nh')).to.equal(true)
    })

    it('init', () => {
        let array = [
            {name: '王2小', group: '三班'},
            {name: '张三', group: '四班'},
        ]
        init(array, ['name'])
        expect(array).to.deep.equal([
            {
                'name': '王2小',
                'group': '三班',
                '$$pinyin': {
                    'name': {
                        'full': 'wang2xiao',
                        'short': 'w2x',
                        'map': [0, 4, 5],
                        'text': '王2小',
                        'length': null,
                        'start': null
                    }
                }
            },
            {
                'name': '张三',
                'group': '四班',
                '$$pinyin': {
                    'name': {
                        'full': 'zhangsan',
                        'short': 'zs',
                        'map': [0, 5],
                        'text': '张三',
                        'length': null,
                        'start': null
                    }
                }
            }
        ])
    })

    it('search', () => {
        let array = [
            {name: '王2小', group: '三班'},
            {name: '张三', group: '四班'},
        ]
        let match

        match = search(array, 'wang', ['name'])
        expect(match.length).to.equal(1)
        expect(match[0].name).to.equal('王2小')
        expect(match[0].$$pinyin.name).to.include({start: 0, length: 1})

        match = search(array, 'zhangsan', ['name'])
        expect(match.length).to.equal(1)
        expect(match[0].name).to.equal('张三')
        expect(match[0].$$pinyin.name).to.include({start: 0, length: 2})

        match = search(array, 'zs', ['name'])
        expect(match.length).to.equal(1)
        expect(match[0].name).to.equal('张三')
        expect(match[0].$$pinyin.name).to.include({start: 0, length: 2})

        match = search(array, 'san', ['name', 'group'])
        expect(match.length).to.equal(2)
        expect(match[0].group).to.equal('三班')
        expect(match[0].$$pinyin.group).to.include({start: 0, length: 1})
        expect(match[1].name).to.equal('张三')
        expect(match[1].$$pinyin.name).to.include({start: 1, length: 1})
    })

    it('not search on undefined', () => {
        let array = [
            {name: 'Bob'}
        ]
        expect(search(array, 'xx', ['group'])).to.deep.equal([])
        expect(array[0].$$pinyin.group).to.deep.include({full: '', short: '', text: '', map: []})
    })

    it('compare', () => {
        expect(compare('你好', 'hello')).to.equal(1)
        expect(compare('你好', '我也好')).to.equal(-1)
        expect(compare('踌躇', '愁楚')).to.equal(0)
        expect(compare('Hello 你好', 'Hello World')).to.equal(-1)
    })

    it('highlight', () => {
        expect(highlight('你好', {start: 0, length: 1})).to.equal('<span class="match">你</span>好')
        expect(highlight('你好', {start: 1, length: 1})).to.equal('你<span class="match">好</span>')
        expect(highlight('你好', '你')).to.equal('<span class="match">你</span>好')
        expect(highlight('hello world', 'hello')).to.equal('<span class="match">hello</span> world')
        expect(highlight('the subject is about subway', 'sub')).to.equal('the <span class="match">sub</span>ject is about <span class="match">sub</span>way')
        expect(highlight('the subject is about subway', 'sub', true)).to.equal('the <span class="match">sub</span>ject is about subway')
    })

    it('highlight with custom renderer', () => {
        expect(highlight('你好', {start: 1, length: 2}, match => `[${match}]`)).to.equal('你[好]')
        expect(highlight('你好', '好', match => `[${match}]`)).to.equal('你[好]')
    })

    it('search and highlight', () => {
        let array = [
            {name: '王2小', group: '三班'},
            {name: '张三', group: '四班'},
        ]
        search(array, 'wang', ['name'])
        let [a, b] = array
        expect(highlight(a.name, a.$$pinyin.name)).to.equal('<span class="match">王</span>2小')
        expect(highlight(b.name, b.$$pinyin.name)).to.equal('张三')
    })
})
