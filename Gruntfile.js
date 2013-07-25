/*global module:false*/
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: {
                src: [ "*.js", "lib/**/*.js", "test/**/*.js" ],
                options: {
                    jshintrc: ".jshintrc"
                }
            }
        },
        mochacov: {
            coverage: {
                options: {
                    coverage: true,
                    reporter: 'html-cov',
                    output: 'coverage.html'
                }
            },
            test: {
                options: {
                    reporter: 'spec'
                }
            },
            options: {
                files: './test/*.js'
            }
        }
    });

    // grunt-contrib tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cov');

    // Default task
    grunt.registerTask('default', ['jshint', 'mochacov:test', 'mochacov:coverage']);
    grunt.registerTask('coverage', ['jshint', 'mochacov:test']);
};