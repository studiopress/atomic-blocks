module.exports = function(grunt) {

    // Configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Generate POT
        makepot: {
            plugin: {
                options: {
                    type: 'wp-plugin',
                    domainPath: '/languages',
                }
            }
        },
    });

    // Generate POT
    grunt.loadNpmTasks('grunt-wp-i18n');
};
