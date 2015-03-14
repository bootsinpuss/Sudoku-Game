// karma.conf.js
module.exports = function(config) {
  config.set({
    files: [
      'app/scripts/**/*.js',
      'test/unit/**/*.js'
    ],

    frameworks: ['mocha', 'sinon', 'sinon-chai'],

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
    }
  });
};
