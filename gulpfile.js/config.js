var path = require('path');
var historyApiFallback = require('connect-history-api-fallback');

// var webpack = require('webpack');
// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');

// var webpackConfig = require('./webpack.config');
// var bundler = webpack(webpackConfig);

module.exports = {
	root: {
		src: path.join(__dirname, '../src'),
		dest: path.join(__dirname, '../docs')
	},
	watchableTasks: ['copyScripts', 'copyImg', 'copyFonts', 'ejs', 'scripts', 'styles', 'iconfont'],
	tasks: {
		browserSync: {
			server: {
				baseDir: "./docs",
				middleware: [ historyApiFallback() ]
			},
			open: false
		},
		node: {
			src: 'js/*',
			extensions: ['js']
		},
		scripts: {
			src: 'js/client',
			dest: 'assets/js',
			output: 'app.js',
			sources: [
				{ input: 'main.js', output: 'main.js'}
			],
			extensions: ['js']
		},
		copyScripts: {
			src: 'js/vendor',
			dest: 'assets/js',
			extensions: ['js']
		},
		copyImg: {
			src: 'img',
			dest: 'assets/img',
			extensions: ['jpg', 'svg', 'png', 'gif']
		},
		copyFonts: {
			src: 'fonts',
			dest: 'assets/fonts',
			extensions: ['woff', 'eot', 'woff2', 'svg', 'ttf', 'otf']
		},
		styles: {
			src: 'styles',
			dest: 'assets/css',
			sources: [
				{ input: 'styles.scss', output: 'styles.css'}
			],
			extensions: ['scss','sass','css']
		},
		ejs: {
			src: 'templates',
			dest: '.',
			extensions: ['ejs']
		},   
		sprite: {
			src: 'images/',
			dest: 'assets/css/img/',
			cssDest: './src/styles',
			imgName: 'sprite.png',
			retinaImgName: 'sprite@2x.png',
			cssName: 'sprite.scss',
			extensions: ['png']
		},
		iconfont: {
			src: 'icons/',
			dest: 'assets/fonts/',
			template: 'icons/templates/webfont.template.css',
			cssDest: './src/styles',
			cssName: '_icons.scss',
			extensions: ['svg'],
			config: {
				fontName: 'american-made-icons', // required
				appendUnicode: true, // recommended option
				formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
				timestamp: Math.round(Date.now()/1000), // recommended to get consistent builds when watching files
				normalize: true,
				fontHeight: 500
			}
		},
	}
};
