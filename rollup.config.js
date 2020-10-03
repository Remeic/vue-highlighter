import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      exports: 'auto',
      format: 'esm',
      file: 'dist/vue-highlighter.esm.js'
    },
    {
      exports: 'auto',
      format: 'cjs',
      file: 'dist/vue-highlighter.cjs.js'
    },
    {
      format: 'iife',
      file: 'dist/vue-highlighter.min.js',
      name: 'vueHighlighter'
    }
  ],
  plugins: [
    commonjs(),
    terser()
  ]
}
