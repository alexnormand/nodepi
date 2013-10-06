module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build'],

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              'package.json',
              'index.js',
              'nodepi/*',
              'app/img/*',
              'app/templates/*'
            ],
            dest: 'build'
          }
        ]
      }
    },

    svgmin: {
      build: {
        files: {
          'build/app/img/raspberry-pi-logo.svg': 'build/app/img/raspberry-pi-logo.svg'
        }
      }
    },

    uglify: {
      options: {
        preserveComments: false
      },
      build: {
        files: {
          'build/app/js/main.js': ['app/components/selectize/dist/js/standalone/selectize.js', 'app/js/main.js']
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      build: {
        files: {
          'build/app/css/style.css': ['app/components/selectize/dist/css/selectize.css', 'app/css/style.css']
        }
      }
    }


  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgmin');

  // Default task(s).
  grunt.registerTask('default', ['clean','copy', 'svgmin', 'uglify', 'cssmin']);

};