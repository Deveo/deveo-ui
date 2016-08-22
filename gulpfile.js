"use strict";

var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename');

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
    gulp.watch('js/*.js', ['uglify']);
});

// Prepare package
gulp.task('dist', ['uglify']);

// Default task
gulp.task('default', ['watch']);
