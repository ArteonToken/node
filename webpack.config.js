const path = require('path');
const webpack = require('webpack');
module.exports = [{
  entry: ['./app/chain.js'],
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      WRTC_IMPORT: `globalThis.wrtc = {
        RTCPeerConnection,
        RTCSessionDescription,
        RTCIceCandidate
      }`
    })
  ],
  resolve: {
    alias: {
      chain: false
    },
     
    fallback: {
      vm: require.resolve("vm-browserify"),
      stream: require.resolve('stream-browserify'),
      // "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      crypto: require.resolve('crypto-browserify'),
      // "path": require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      url: false,
      util: false,
      path: require.resolve("path-browserify"),
      fs: false
      // "assert": require.resolve("assert/"),
    }
  },
  // experiments: {
  //   outputModule: true
  // },
  output: {
    // library: {
    //   type: 'module'
    // },
    filename: 'chain.js',
    path: path.resolve(__dirname, 'app'),
  }
}];
