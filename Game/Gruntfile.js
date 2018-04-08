module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'scss/dist/app.css': 'scss/app.scss'
                }
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['env']}]]
                },
                src: ['js/app.js'],        // zdroj napsaný v ES 6
                dest: 'js/dist/app.js'     // cílový soubor transpilovaný do ES 5.1
            }
        },

        watch: {
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass']
            },

            js: {
                files: [
                    'js/*.js',
                    'js/**/*.js',
                    '!js/*.min.js',
                    '!js/dist/*',
                    '!**/node_modules/**'
                ],
                tasks: ['browserify']
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};