// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 尾部逗号
        'comma-dangle': 0,
        // 变量名可以不用驼峰style
        'camelcase': 0,
        // 允许一个 var 声明多个变量
        'one-var': 0,
        'space-before-function-paren': 0,
        'quotes': 0,
        // 允许 throw 抛出常亮
        'no-throw-literal': 0,
        // 用4个空格缩进
        'indent': [2, 4, {'SwitchCase': 1}],
        // 允许 return 语句中包含赋值语句
        'no-return-assign': 0,
        'no-useless-escape': 0
    }
}
