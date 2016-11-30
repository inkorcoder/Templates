/*--------------------------- variables --------------------------*/

var PATH = '',
		OPTIONS = {
			serverHost: 'localhost',
			serverPort: 1111,
			serverLivereload: true,
			coffeeWraping: true,
			notices: true
		};

/*---------------------------- modules ----------------------------*/

var gulp 					= require('gulp'),
		connect 			= require('gulp-connect'),
		coffee 				= require('gulp-coffee'),
		clean 				= require('gulp-clean'),
		sass 					= require('gulp-sass'),
		colors 				= require('colors'),
		fileinclude 	= require('gulp-include'),
		cssmin 				= require('gulp-cssmin'),
		rename 				= require('gulp-rename'),
		filelist 			= require('gulp-filelist'),
		using 				= require('gulp-using'),
		map 					= require('map-stream'),
		plumber 			= require('gulp-plumber'),
		autoprefixer 	= require('gulp-autoprefixer'),
		jsmin 				= require('gulp-minify'),
		concat 				= require('gulp-concat'),

		// notifications
		exec = require("child_process").exec;

/*---------------------------- helpers ----------------------------*/

// notifications function
var execute = function(command, callback){
	exec(command, function(error, stdout, stderr){
		if (callback){
			callback(stdout);
		}
	});
};

// console log for SASS task
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

// console log for CoffeeScript task
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

/*----------------------------- tasks ----------------------------*/

// console log for SASS task
gulp.task('connect', function(){
	connect.server({
		host: OPTIONS.serverHost,
		port: OPTIONS.serverPort,
		livereload: {
			port: 2233
		},
		root: [PATH+'dist',PATH+'dev-tools',PATH+'scss',PATH+'server']
	});
});

// SASS compilation
gulp.task('SASS', function(){
	return gulp.src(PATH+'scss/*.scss')
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
		.pipe(gulp.dest(PATH+'dist/css'))
});

// CSS concat / reload
gulp.task('CSS', function(){
	return gulp.src(PATH+'dist/css/*.css')
		.pipe(concat('styles.css'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(PATH+'dist/css/build'))
		.pipe(connect.reload());
});

// HTML includer
gulp.task('HTML-include', function(){
	return gulp.src(PATH+'html/*.html')
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(PATH+'dist/'))
});

// HTML reload
gulp.task('HTML', ['HTML-include'], function(){
	return gulp.src(PATH+'dist/*html')
		.pipe(connect.reload())
});

// CoffeeScript compiler
gulp.task('CoffeeScript', function(){
	return gulp.src([PATH+'coffee/*coffee', PATH+'coffee/*/*coffee'])
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(plumber({
			errorHandler: function(err){
				logCoffeeScript(err);
			}
		}))
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest(PATH+'dist/js'))
});

// Javascript concat / reload
gulp.task('Javascript', ['CoffeeScript'], function(){
	return gulp.src([
			PATH+'dist/js/lib/*.js',
			PATH+'dist/js/plugins/*.js',
			PATH+'dist/js/init/*.js',
			PATH+'dist/js/*.js'
		])
		.pipe(concat('bundle.js', {newLine: ';'}))
		.pipe(gulp.dest(PATH+'dist/js/bundle'))
		.pipe(connect.reload());
});

// watch task
gulp.task('Watch-task', function(){
	gulp.watch(PATH+'coffee/**/*coffee', 				['Javascript']);
	gulp.watch(PATH+'scss/**/*.scss', 					['SASS']);
	gulp.watch(PATH+'dist/css/*css', 						['CSS']);
	gulp.watch(PATH+'html/**/*html', 						['HTML-include', 'HTML']);
});

// default task
gulp.task('default', [
	'CoffeeScript',
	'Watch-task',
	'SASS',
	'CSS',
	'HTML-include',
	'Javascript',
	'HTML',
	'connect'
], function(){
	execute("notify-send 'Gulp.js' 'Система сборки успешно запущена.' -i dialog-apply");
});