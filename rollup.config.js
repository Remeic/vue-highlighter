import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'

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
    babel({ babelHelpers: 'runtime' }),
    commonjs(),
    terser()
  ],
  external: [/@babel\/runtime/]
}
