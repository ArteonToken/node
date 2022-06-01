import json from '@rollup/plugin-json'

export default [{
  input: ['src/www/shell.js', 'src/www/views/wallet.js', 'src/www/views/stats.js', 'src/www/views/validator.js'],
  output: [{
    format: 'es',
    dir: 'app'
  }],
  plugins: [
    json()
  ]
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
