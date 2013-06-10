'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            src: 'backbone.memoize.js',

            options: {
                specs: 'test/*Spec.js',
                helpers: 'test/*Helper.js',
                vendor: ['jquery', 'underscore', 'backbone'].map(expandLibPath)
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['test']);
};

var expandLibPath = function(lib){
    return ['lib/', '/', '.js'].join(lib);
};
