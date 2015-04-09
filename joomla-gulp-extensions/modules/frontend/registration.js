var gulp = require('gulp');

var config = require('../../../gulp-config.json');

var extPath   = './extensions/modules/site/registration';
var mediaPath = extPath + '/media/mod_registration';

// Dependencies
var browserSync = require('browser-sync');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var del         = require('del');
var vinylPaths  = require('vinyl-paths');
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var zip         = require('gulp-zip');

// Clean
gulp.task('clean:modules.frontend.registration', ['clean:modules.frontend.registration:media'], function() {
	return gulp.src(config.wwwDir + '/modules/mod_registration', { read: false })
		.pipe(vinylPaths(del));
});

// Clean: media
gulp.task('clean:modules.frontend.registration:media', function() {
	return gulp.src(config.wwwDir + '/media/mod_registration', { read: false })
		.pipe(vinylPaths(del));
});

// Copy
gulp.task('copy:modules.frontend.registration',
	[
		'copy:modules.frontend.registration:module',
		'copy:modules.frontend.registration:media'
	],
	function() {
});

// Copy module
gulp.task('copy:modules.frontend.registration:module', ['clean:modules.frontend.registration', 'copy:modules.frontend.registration:media'], function() {
	return gulp.src([
		extPath + '/**',
		'!' + extPath + '/media',
		'!' + extPath + '/media/**'
	])
	.pipe(gulp.dest(config.wwwDir + '/modules/mod_registration'));
});

// Copy media
gulp.task('copy:modules.frontend.registration:media', ['clean:modules.frontend.registration:media'], function() {
	return gulp.src([
			mediaPath + '/**'
		])
		.pipe(gulp.dest(config.wwwDir + '/media/mod_registration'));
});

// Sass
gulp.task('sass:modules.frontend.registration', function () {
		return sass(mediaPath + '/scss/style.scss')
			.on('error', function (err) {
				console.error('Error!', err.message);
		})
		.pipe(gulp.dest(mediaPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_registration/css'))
		.pipe(minifyCSS())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_registration/css'));
});

// Compile scripts
gulp.task('scripts:modules.frontend.registration', function () {
	return gulp.src([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js',
			'!' + mediaPath + '/js/**/*-min.js'
		])
		.pipe(gulp.dest(config.wwwDir + '/media/mod_registration/js'))
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/js'))
		.pipe(gulp.dest(config.wwwDir + '/media/mod_registration/js'));
});

// Watch
gulp.task('watch:modules.frontend.registration',
	[
		'watch:modules.frontend.registration:module',
		'watch:modules.frontend.registration:scripts',
		'watch:modules.frontend.registration:sass'
	],
	function() {
});

// Watch: Module
gulp.task('watch:modules.frontend.registration:module', function() {
	gulp.watch([
			extPath + '/**',
			'!' + mediaPath,
			'!' + mediaPath + '/**'
		],
		['copy:modules.frontend.registration:module', browserSync.reload]);
});

// Watch: Scripts
gulp.task('watch:modules.frontend.registration:scripts',
	function() {
		gulp.watch([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js'
		],
		['scripts:modules.frontend.registration', browserSync.reload]);
});

// Watch: Styles
gulp.task('watch:modules.frontend.registration:sass',
	function() {
		gulp.watch(
			[
				mediaPath + '/scss/**'
			],
			['sass:modules.frontend.registration', browserSync.reload]
		);
});