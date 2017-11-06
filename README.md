# pinyin

pinyin search, match and hightlight

## install
```bash
npm install --save git+ssh://git@github.com/wangfengming/pinyin.git#1.0.0
```

you can include pinyin by direct `<scrip>` 
```html
<script src="node_modules/pinyin/dist/pinyin.js"></script>
```
or by `require`
```javascript
let pinyin = require('pinyin')
```
you can only `require` what you need
```javascript
let pinyinSearch = require('pinyin/search')
```

## Usage

do search:
```javascript
let students = [
    {name: '张三', school: '衡水一中'},
    {name: '李四', school: '北京三中'},
    {name: '王五', school: '济南二中'}
]
// search student who's name or school include `三`
let filtered = pinyin.search(students, '三', ['name', 'school'])
// or use pinyin `san`
// let filtered = pinyin.search(students, 'san', ['name', 'school'])
```
the result is
```javascript
[
  {
    name: '张三',
    school: '衡水一中',
    $$pinyin: {name: {start: 1, length: 1, ...}, school: {...}}
  },
  {
    name: '李四',
    school: '北京三中',
    $$pinyin: {name: {...}, school: {start: 2, length: 1, ...}}
  }
]
```
start & length is the matched position
> `$$pinyin` can be other key by specify the `pinyinKey`: search(students, '三', ['name', 'school'], 'pinyinKey')

> `$$pinyin.name` entire object is: `{start: 1, length: 1, full: 'zhangsan', short: 'zs', map: [0, 5]}`

highlight the match
```javascript
pinyin.highlight(filtered[0].name, filtered[0].$$pinyin.name)
// `张<span class="match">三</span>`
```
you can specify the renderer
```javascript
pinyin.highlight(filtered[0].name, filtered[0].$$pinyin.name, 'highlight')
// `张<span class="highlight">三</span>`
```
or
```javascript
pinyin.highlight(filtered[0].name, filtered[0].$$pinyin.name, match => `[${match}]`)
// `张[三]`
```

## test

install by
```bash
npm install
```

run test
```bash
npm run test
```
