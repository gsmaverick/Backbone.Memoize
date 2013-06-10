module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        jasmine: {
            files: ['test/index.html']
        }
    });

    // Task to run tests
    grunt.registerTask('test', 'jasmine');
};
