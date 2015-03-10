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
    compass: {
      dist:{
        options: {
          sassDir: './app/styles/',
          cssDir: './tmp/styles/',
          specify: 'app/styles/main.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['compass:dist']);
};
