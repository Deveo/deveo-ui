"use strict";

var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass');

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

// Watch files for changes
gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'watch']);
