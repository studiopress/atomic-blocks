const ExtractText = require( 'extract-text-webpack-plugin' );
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

const editorStyles = new ExtractText( {
	filename: './blocks.editor.build.css',
} );

const frontendStyles = new ExtractText( {
	filename: './blocks.style.build.css',
} );

const plugins = [ editorStyles, frontendStyles ];

const scssConfig = {
	use: [
		{
			loader: 'css-loader',
		},
		{
			loader: 'sass-loader',
			options: {
				prependData: '@import "./src/common.scss";\n',
			},
		},
	],
};

module.exports = {
	context: __dirname,
	devtool: devMode ? 'inline-sourcemap' : false,
	mode: devMode ? 'development' : 'production',
	entry: {
		blocks: './src/blocks.js',
	},
	output: {
		path: __dirname + '/dist/',
		filename: '[name].build.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					path.resolve( __dirname, 'node_modules' ),
					path.resolve( __dirname, 'build' ),
					path.resolve( __dirname, 'vendor' ),
				],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-react' ],
						},
					},
				],
			},
			{
				test: /editor\.scss$/,
				exclude: [
					path.resolve( __dirname, 'node_modules' ),
					path.resolve( __dirname, 'build' ),
					path.resolve( __dirname, 'vendor' ),
				],
				use: editorStyles.extract( scssConfig ),
			},
			{
				test: /style\.scss$/,
				exclude: [
					path.resolve( __dirname, 'node_modules' ),
					path.resolve( __dirname, 'build' ),
					path.resolve( __dirname, 'vendor' ),
				],
				use: frontendStyles.extract( scssConfig ),
			},
		],
	},
	plugins,
};
