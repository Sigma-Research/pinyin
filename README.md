# pinyin

pinyin search, match and highlight

## install
```bash
npm install --save git+ssh://git@github.com/wangfengming/pinyin.git#VERSION
```

you can include pinyin by direct `<script>`
```html
<script src="node_modules/pinyin/dist/pinyin.js"></script>
```
or by `require`
```javascript
let pinyin = require('pinyin')
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
```
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

### work with vue

template:
```html
<input type="text" v-model="search">
<table>
<tbody>
    <tr v-for="student in filtered">
        <td><span v-html="highlight(student.name, student.$$pinyin.name)"></span></td>
        <td><span v-html="highlight(student.school, student.$$pinyin.school)"></span></td>
    </tr>
</tbody>
</table>
```

vm:
```javascript
import {search, highlight} from 'pinyin'

export default {
    data() {
        return {
            search: '',
            students: [
                {name: '张三', school: '衡水一中'},
                {name: '李四', school: '北京三中'},
                {name: '王五', school: '济南二中'}
            ]
        }
    },
    methods: {
        highlight: highlight
    },
    computed: {
        filtered() {
            return search(this.students, this.search, ['name', 'school'])
        }
    }
}
```

### work with angular1

template:
```html
<div ng-controller="MainCtrl as main">
<input type="text" ng-model="main.search">
<table>
<tbody>
    <tr ng-repeat="student in main.students|pinyinSearch:main.search:['name', 'school']">
        <td><span ng-bind-html="student.name|highlight:student.$$pinyin.name"></span></td>
        <td><span ng-bind-html="student.school|highlight:student.$$pinyin.school"></span></td>
    </tr>
</tbody>
</table>
</div>
```
mv:
```javascript
angular.module('app').controller('MainCtrl', ['$scope', $scope => {
    $scope.search = ''
    $scope.students = [
        {name: '张三', school: '衡水一中'},
        {name: '李四', school: '北京三中'},
        {name: '王五', school: '济南二中'}
    ]
}])
```

filter:
```javascript
import {search, highlight} from 'pinyin'

angular.module('app')
.filter('pinyinSearch', [() => search])
.filter('highlight', [() => highlight])
```

#### or without filter:

template:
```html
<div ng-controller="MainCtrl as main">
<input type="text" ng-model="main.search">
<table>
<tbody>
    <tr ng-repeat="student in main.filtered">
        <td><span ng-bind-html="highlight(student.name, student.$$pinyin.name)"></span></td>
        <td><span ng-bind-html="highlight(student.school, student.$$pinyin.school)"></span></td>
    </tr>
</tbody>
</table>
</div>
```

mv:
```javascript
import {search, highlight} from 'pinyin'

angular.module('app').controller('MainCtrl', ['$scope', $scope => {
    $scope.search = ''
    $scope.students = [
        {name: '张三', school: '衡水一中'},
        {name: '李四', school: '北京三中'},
        {name: '王五', school: '济南二中'}
    ]
    $scope.highlight = highlight
    $scope.$watch('search', () => {
        $scope.filtered = search($scope.students, $scope.search, ['name', 'score'])
    })
}])
```

> Don't use `pinyinSearch` filter, recommend to watch `search` change and compute out the filtered students

## test

install by
```bash
npm install
```

run test
```bash
npm run test
```
