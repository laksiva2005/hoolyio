//'use strict';

var requirejsConfig = require('./src/main')();
var fs = require('fs-extra');

module.exports = function(grunt) {
    var globalConfig = {
        srcBasePath: null
    };


    // Project configuration.
    grunt.initConfig({
        globalConfig: globalConfig,
        // This line makes your node configurations available for use
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: './src/vendor',
                    cleanTargetDir: true,
                    layout: 'byType'
                }
            }
        },
        sass: {
            dist: {                            // Target
                options: {                       // Target options
                style: 'expanded'
              },
              files: {                         // Dictionary of files
                'src/static/vendor/materialize/css/materialize.css': 'sass/style.scss'
              }
            }
        },
        requirejs: {
            compile: {
                options: {
                    paths: requirejsConfig.paths,
                    removeCombined: true,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /(^\.|^api)/,
                    baseUrl: './src',
                    dir: "./dist",
                    optimize: 'uglify2',
                    optimizeCss: 'standard',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    modules: [{
                        name: "main",
                        include: ["vendor/almond/almond"],
                    }],
                    done: function(done, output) {
                        console.log('output', output);
                        var indexHtml = fs.readFileSync('./dist/index.html').toString('utf8');
                        indexHtml = indexHtml.replace(/vendor\/requirejs\/require/gi, 'main');
                    
                        fs.outputFileSync('./dist/index.html', indexHtml);
                        fs.removeSync('./dist/app');
                        fs.removeSync('./dist/vendor');
                        fs.removeSync('./dist/build.txt');

                    }
                }
            }
        }
    });
   
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-sass');   

    grunt.registerTask('default', ['bower', 'sass', 'requirejs']);

};