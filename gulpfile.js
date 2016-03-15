// steps
// ------------
// npm install -g gulp
// npm init
// npm install gulp --save-dev
// npm -g install browser-sync --no-optional
// npm install gulp-uglify gulp-rename gulp-ruby-sass gulp-autoprefixer gulp-plumber browser-sync --save-dev
// files used
// ------------
// gulp-uglify
// gulp-rename
// gulp-ruby-sass
// gulp-autoprefixer
// gulp-plumber
// browser-sync
//
// npm "package name" --save-dev

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync');

// script task

gulp.task('scripts', function() {
	gulp.src(['js/*.js', '!js/*.min.js'])
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/'));
});

//sass tasks

gulp.task('sass', function() {
  return sass('css/**/*.scss')
	 	.pipe(plumber())
    .on('error', sass.logError)
		.pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('css/'));
});

//html tasks

gulp.task('html', function() {
	gulp.src('*.html');
});

//browser tasks

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

//watch tasks

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('css/**/*.scss', ['sass']);
	gulp.watch('*.html', ['html']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('css/*.css', browserSync.reload);
	gulp.watch('js/main.min.js', browserSync.reload);

});

//default task

gulp.task('default', ['scripts', 'sass', 'html', 'browserSync', 'watch']);
