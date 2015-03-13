// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '',

    files: [
      'app/libs/jquery/dist/jquery.js',
      'app/scripts/**/*.js',
      'test/unit/**/*.js'
    ],

    frameworks: ['mocha', 'sinon-chai'],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/scripts/**/*.js': ['coverage']
    },

    coverageReporter: {
      // specify a common output directory
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'lcov', dir: 'test-results', subdir: 'coverage'},
      ]
    },

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS']
  });
};
