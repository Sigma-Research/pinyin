import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
    input: 'pinyin.js',
    name: 'pinyin',
    output: {
        file: 'dist/pinyin.js',
        format: 'iife'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        commonjs(),
        resolve()
    ]
}
