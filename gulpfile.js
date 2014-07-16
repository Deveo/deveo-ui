"use strict";

var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');

var paths = {
    styles: ['sass/main.scss']
};

// Compile Sass
gulp.task('sass', function() {
    return gulp.src(paths.styles)
        .pipe(plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);
});

// Run the server
gulp.task('webserver', function () {
    gulp.src('public')
        .pipe(webserver({
            livereload: true
        }));
});

// Default task
gulp.task('default', ['sass', 'watch', 'webserver']);
