module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    clean: {
      dist: ['build']
    },

    browserify: {
      dist: {
        src: 'app/scripts/app.js',
        dest: 'build/scripts/bundle.js'
      }
    },

    compass: {
      dist:{
        options: {
          sassDir: './app/styles/',
          cssDir: './build/styles/',
          specify: 'app/styles/main.scss'
        }
      }
    },

    watch: {
      styles: {
        files: 'app/styles/*.scss',
        tasks: ['compass']
      },
      scripts: {
        files: 'app/scripts/*.js',
        tasks: ['browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['clean', 'compass', 'browserify']);
  grunt.registerTask('default', ['watch']);
};
