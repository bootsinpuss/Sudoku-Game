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

    open: {
      run: {
        path: 'index.html',
        app: 'Google Chrome'
      },
      coverage : {
        path : 'test-coverage/coverage.html',
        app: 'Google Chrome'
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
          'app/scripts/**/*.js'
        ]
      },

      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.js']
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'test-coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'test-coverage/coverage.html'
        },
        src: ['test/**/*.js']
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
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('build', ['clean', 'compass', 'browserify']);
  grunt.registerTask('default', ['build', 'lint', 'open:run', 'watch']);
  grunt.registerTask('lint', ['jshint:code']);
  grunt.registerTask('test', ['mochaTest', 'open:coverage']);
  grunt.registerTask('test:unit', ['mochaTest:test']);
  grunt.registerTask('test:cover', ['mochaTest:coverage', 'oepn:coverage']);
};
