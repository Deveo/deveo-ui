"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'public/css/main.css': 'sass/main.scss',
                    'public/css/deveo.dropdown.css': 'sass/deveo.dropdown.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

};
