var PATH = '',
		OPTIONS = {
			serverHost: 'localhost',
			serverPort: 1111,
			serverLivereload: true,
			coffeeWraping: true,
			notices: true
		};

var gulp = require('gulp'),
		connect = require('gulp-connect'),
		coffee = require('gulp-coffee'),
		clean = require('gulp-clean'),
		sass = require('gulp-sass'),
		colors = require('colors'),
		fileinclude = require('gulp-include'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		filelist = require('gulp-filelist'),
		using = require('gulp-using'),
		map = require('map-stream'),
		plumber = require('gulp-plumber'),
		autoprefixer = require('gulp-autoprefixer'),
		jsmin = require('gulp-jsmin'),

		exec = require("child_process").exec;

var execute = function(command, callback){
	exec(command, function(error, stdout, stderr){
		if (callback){
			callback(stdout);
		}
	});
};

execute("notify-send 'Gulp.js' 'Система сборки успешно запущена.' -i dialog-apply");

var logSASS = function(err) {
	var mess = err.message.replace(/(\n|\r|Current dir:)/gim, '');
	if (OPTIONS.notices === true) {
		execute("notify-send 'SASS' '" + mess + "' -i dialog-no", function() {});
	}
	return console.log("\n\r"+
		colors.grey("[ ")+(colors.red('ERROR!'))+colors.grey(" ]")+" SASS\r\n"+
		(colors.red(mess))+"\r\n"
	);
};

var logCoffeeScript = function(err) {
	var mess = err.message.replace(/(\n|\r|Current dir:)/gim, '');
	if (OPTIONS.notices === true) {
		execute("notify-send 'Coffeescript' '" + err.message + "\r\n → " + (err.stack.substr(0, err.stack.indexOf('error:'))) + "'  -i dialog-no", function() {});
	}
	return console.log("\n\r"+
		colors.grey("[ ")+(colors.red('ERROR!'))+colors.grey(" ]")+" CoffeeScript\r\n"+
		colors.red(mess)+colors.red(err.stack)+"\n\r"
	);
};

gulp.task('connect', function(){
	connect.server({
		host: OPTIONS.serverHost,
		port: OPTIONS.serverPort,
		livereload: OPTIONS.serverLivereload,
		root: [PATH+'dist',PATH+'dev-tools',PATH+'scss',PATH+'server']
	});
});

gulp.task('CoffeeScript', function(){
	var src = gulp.src([PATH+'coffee/*coffee', PATH+'coffee/*/*coffee'])
		.pipe(plumber())
		.pipe(fileinclude());
	if (OPTIONS.coffeeWraping === true){
		src
			.pipe(plumber({
				errorHandler: function(err){
					logCoffeeScript(err);
				}
			}))
			.pipe(coffee({bare: true}))
			.pipe(gulp.dest(PATH+'dist/js/full'))
			.pipe(jsmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(PATH+'dist/js'));
	} else {
		src
			.pipe(plumber({
				errorHandler: function(err){
					logCoffeeScript(err);
				}
			}))
			.pipe(coffee())
			.pipe(gulp.dest(PATH+'dist/js/full'))
			.pipe(jsmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(PATH+'dist/js'));
	}
	src.pipe(connect.reload());
});

gulp.task('SASS', function(){
	var src = gulp.src(PATH+'scss/*.scss');
	src
		.pipe(plumber({
			errorHandler: function(err){
				logSASS(err);
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
			browsers: [
				'Chrome > 30', 'Firefox > 20', 'iOS > 5', 'Opera > 12',
				'Explorer > 8', 'Edge > 10']
		}))
		.pipe(gulp.dest(PATH+'dist/css/full'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(PATH+'dist/css'))
		.pipe(connect.reload());
});

gulp.task('HTML-include', function(){
	var src = gulp.src(PATH+'html/*.html');
	src
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(PATH+'dist/'))
		.pipe(connect.reload());
});

gulp.task('CSS', function(){
	src = gulp.src(PATH+'dist/css/*.css');
	src.pipe(connect.reload());
});

gulp.task('Javascript', function(){
	src = gulp.src(PATH+'dist/js/*.js');
	src.pipe(connect.reload());
});
gulp.task('HTML', function(){
	src = gulp.src(PATH+'dist/*html');
	src.pipe(connect.reload());
});

gulp.task('Watch-task', function(){
	gulp.watch(PATH+'coffee/*coffee', 				['CoffeeScript']);
	gulp.watch(PATH+'coffee/*/*coffee',				['CoffeeScript']);
	gulp.watch(PATH+'scss/*.scss', 						['SASS']);
	gulp.watch(PATH+'scss/*/*.scss', 					['SASS']);
	gulp.watch(PATH+'html/*html', 						['HTML-include']);
	gulp.watch(PATH+'html/includes/*html', 		['HTML-include']);
	// gulp.watch(PATH+'dist/css/*css', 					['CSS']);
	// gulp.watch(PATH+'dist/js/*js', 						['Javascript']);
	// gulp.watch(PATH+'dist/*html', 						['HTML']);
});

gulp.task('default', [
	'CoffeeScript',
	'Watch-task',
	'SASS',
	'HTML-include',
	// 'CSS',
	// 'HTML',
	// 'Javascript',
	'connect'
]);