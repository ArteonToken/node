import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import modify from 'rollup-plugin-modify';
import { execSync } from 'child_process'

try {
  execSync('rm -rf app/*.js')
} catch {

}

export default [{
  input: ['src/www/shell.js', 'src/www/views/wallet.js', 'src/www/views/stats.js', 'src/www/views/validator.js'],
  output: [{
    format: 'es',
    dir: 'app'
  }],
  external: [
    './api.js'
  ],
  plugins: [
    json(),    
    commonjs(),
    nodeResolve()
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
}]
