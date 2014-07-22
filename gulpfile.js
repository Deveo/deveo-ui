"use strict";

var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-cssmin');

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
    gulp.watch('sass/*.scss', ['sass']);
});

// Prepare package
gulp.task('dist', ['cssmin', 'uglify']);

// Default task
gulp.task('default', ['sass', 'watch']);
