var path = require('path');

module.exports = {
	entry: './main.jsx',
	output: {
        path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'index.js'
	},
    devServer: {
		inline: true
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
};
