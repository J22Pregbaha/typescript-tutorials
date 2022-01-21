module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({
        ts: {
            main: {
                src: ['src/*.ts'],
                dest: 'dist/'
            },
            options: {
                rootDir: "src"
            }
        }
    });

    grunt.registerTask('default', ['ts']);
}