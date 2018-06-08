module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        connect: {
            server: {
                keepalive: true
            }
        },

        watch: {
            files: ['/app/**/*']
        },

    });

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', ['connect', 'watch']);

};