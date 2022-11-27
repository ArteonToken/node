import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { execSync } from 'child_process'
import styles from "rollup-plugin-styles";
try {
  execSync('rm -rf app/monaco/*.js')
  execSync('rm -rf app/monaco/*.LICENSE.txt')
} catch {

}

export default [{
  input: ['src/monaco-loader.js'],
  output: [{
    format: 'es',
    dir: 'app/monaco'
  }],
  plugins: [
    json(),
    styles(),
    nodeResolve(),
    commonjs(),
  ]
}]
