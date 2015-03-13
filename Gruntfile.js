module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        reporters: 'progress',
        runnerPort: 9998
      }
    },

    jshint: {
      options: {
        jshintrc: 'jshintrc.json',
        reporter: require('jshint-stylish')
      },

      code: {
        src: [
          'Gruntfile.js',
          'app/scripts/**/*.js',
          'karma.conf.js'
        ]
      },

      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.js']
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['clean', 'compass', 'browserify']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('lint', ['jshint:code']);
};
