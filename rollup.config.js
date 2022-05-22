import json from '@rollup/plugin-json'

export default [{
  input: 'src/www/shell.js',
  output: [{
    format: 'es',
    dir: 'app'
  }]
}, {
  input: 'src/www/chain.js',
  output: [{
    format: 'cjs',
    dir: 'app'
  }],
  plugins: [
    json()
  ]
}, {
  input: 'src/index.js',
  output: [{
    format: 'cjs',
    dir: 'app'
  }]
}]
