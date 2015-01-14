"use strict";

var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-cssmin'),
    foreach = require('gulp-foreach'),
    cache   = require('gulp-cached'),
    csscomb = require('gulp-csscomb');

// Compile Sass
gulp.task('sass', function () {
    return gulp.src(['sass/deveo.scss'])
        .pipe(plumber(function (error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Minify CSS
gulp.task('cssmin', ['sass'], function () {
    gulp.src('dist/css/deveo.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

// Comb Sass files
gulp.task('csscomb', function () {
    return gulp.src('sass/*.scss')
        .pipe(plumber(function (error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(foreach(function (stream) {
            return stream
                .pipe(cache('combing'))
                .pipe(csscomb());
        }))
        .pipe(gulp.dest('sass'));
});

// Concatenate all JavaScript files into one
gulp.task('concat', function () {
    return gulp.src(['js/*.js'])
        .pipe(concat('deveo.js'))
        .pipe(gulp.dest('dist/js'));
});

// Uglify JavaScript
gulp.task('uglify', ['concat'], function () {
    gulp.src('dist/js/deveo.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

// Watch files for changes
gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['cssmin']);
    gulp.watch('js/*.js', ['uglify']);
});

// Prepare package
gulp.task('dist', ['cssmin', 'uglify']);

// Default task
gulp.task('default', ['cssmin', 'watch']);
