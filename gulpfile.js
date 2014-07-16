"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var src  = ['sass/reset.scss', 'sass/main.scss', 'sass/deveo.dropdown.scss'];

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(src)
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'watch']);
