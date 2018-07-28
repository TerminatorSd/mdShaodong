
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, './src/js')
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: path.resolve(__dirname, './src/js')
			},
			{
				test: /\.scss$/,
				use: [
				  'style-loader',
			    'css-loader', 
			    'sass-loader'
			  ]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
      filename: "[name].css"
    })
	],
	devServer: {
		hot: true,
		open: true
	},
	watch: true,
	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 300,
		poll: 1000
	}
}
