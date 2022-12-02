import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import modify from 'rollup-plugin-modify';
import { execSync } from 'child_process'
import styles from "rollup-plugin-styles";
try {
  execSync('rm -rf app/*.js')
  execSync('rm -rf app/*.LICENSE.txt')
} catch {

}


const views = [
  'src/www/wallet.js', 'src/www/stats.js', 'src/www/validator.js', 'src/www/editor.js', 'src/www/explorer.js'
]

export default [{
  input: ['src/www/shell.js', ...views],
  output: [{
    format: 'es',
    dir: 'app'
  }],
  external: [
    './api.js',
    './monaco/monaco-loader.js',
    '@monaco-import'
  ],
  plugins: [
    json(),
    styles(),
    nodeResolve(),
    commonjs(),
    modify({
      '@monaco-import': './monaco/monaco-loader.js'
    })
  ]
}, {
  input: ['src/api.js', 'src/preload.js'],
  output: [{
    format: 'cjs',
    dir: 'app'
  }],
  plugins: [
    json(),
    commonjs(),
		modify({
			SUBTLE_IMPORT: `const { subtle } = crypto`
		})
  ]
}, {
  input: 'src/index.js',
  output: [{
    format: 'cjs',
    dir: 'app'
  }]
}, {
  input: ['./node_modules/@leofcoin/workers/src/block-worker.js'],
  output: [{
    dir: 'app/',
    format: 'cjs'
  }],
  plugins: [
    json()
  ]
}, {
  input: ['./node_modules/@leofcoin/workers/src/transaction-worker.js', './node_modules/@leofcoin/workers/src/pool-worker.js', './node_modules/@leofcoin/workers/src/machine-worker.js'],
  output: [{
    dir: 'app/workers',
    format: 'cjs'
  }],
  plugins: [
    json()
  ]
}]
