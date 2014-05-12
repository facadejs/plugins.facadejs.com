module.exports = function (grunt) {

    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        handlebars: {

            compile: {

                options: {
                    namespace: 'templates',
                    processName: function(path) {
                        return path.match(/([^\/]+)\.hbs/)[1];
                    }
                },

                files: {
                    'static/templates/templates.js': ['static/templates/handlebars/**/*.hbs']
                }

            }

        },

        watch: {

            default: {
                files: ['static/templates/handlebars/**/*.hbs'],
                tasks: ['handlebars']
            }

        }

    });

    grunt.registerTask('default', [ 'handlebars' ]);

};
