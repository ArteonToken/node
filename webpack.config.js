const path = require('path');
const webpack = require('webpack');
module.exports = [{
	entry: {
		// Package each language's worker and give these filenames in `getWorkerUrl`
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
	},
	output: {
		globalObject: 'self',
		filename: '[name].js',
		path: path.resolve(__dirname, 'app/monaco'),
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			}
		]
	}
}];
