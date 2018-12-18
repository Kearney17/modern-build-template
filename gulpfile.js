const { watch, series, parallel, src, dest } = require('gulp');
const config = require('./gulp.config')(),
	args = require('yargs').argv,
	browserSync = require('browser-sync').create(),
	del = require('delete'),
	colors = require('ansi-colors'),
	$ = require('gulp-load-plugins')({
		lazy:true,
		rename: {
			'gulp-task-listing': 'list'
		}
	});

const cleanCss = (cb) => {
	clean(`${config.css.compiled}`, cb);
}

const compileSass = () => {
	return src(config.src.sass)
		.pipe($.sass())
		.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
		.pipe(dest(config.css.compiled))
		.pipe(browserSync.stream());
};

const cleanDist = (cb) => {
	clean(`${config.build}`, cb);
};

const minifyCss = () => {
	return src(config.src.css)
		.pipe($.sourcemaps.init())	
		.pipe($.cleanCss())
		.pipe($.rename({ suffix: '.min' }))	
		.pipe($.sourcemaps.write('./',{ 
			includeContent: false, 
			sourceRoot: '../src/css' 
		}))
		.pipe(dest(config.build));
};

const minifyJs = () => {
	return src(config.src.js)
		.pipe($.sourcemaps.init())	
		.pipe($.uglifyEs.default())
		.pipe($.sourcemaps.write('./', { 
			includeContent: false, 
			sourceRoot: '../src/js' 
		}))
		.pipe(dest(config.build));
};

const watchSass = () => {
	watch(config.src.sass, compileSass);
};

const sync = () => {
	if (browserSync.active){
		return;
	}
	log('Starting Browser-Sync');

	let files = [].concat(config.src.app, config.src.js, config.src.css);
	
	let options = {
		proxy: config.app,
		files: files,
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		}, 
		injectChanges: true,
		logFileChanges: true,
		logLevel: args.debug ? 'debug' : 'info',
		logPrefix: 'brower-sync',
		notify: true,
		reloadDelay: 0
	};
	
	browserSync.init(options);
};

// helpers
const help = (cb) => {
	$.list();
	cb();
};

const clean = (path, cb) => {
	log(`deleting: ${path}`);
	del(path, cb);
};

const log = (msg, indent) => {
	indent = indent || 0;
	let prefix = '';

	for(let i = 0; i < indent; i++){
		prefix += ' ';
	};

	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				console.log(colors.yellow(`${prefix} ${item}: ${msg[item]}`));
				if(typeof(msg[item]) === 'object') {
					log(msg[item], ++indent);
				};
			}
		}
	} else {
		console.log(colors.yellow(`${prefix} ${msg}`));
	}
};

// export tasks
const compile = series(
	cleanCss, 
	compileSass
);

exports.default = series(help);
exports.compile = compile;
exports.build = series(compile, series(cleanDist, parallel(minifyCss,minifyJs)));
exports.sync = series(compile, parallel(watchSass, sync));