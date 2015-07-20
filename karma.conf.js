// Karma configuration
// Generated on Fri Jul 17 2015 16:44:13 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify','mocha','chai', 'sinon'],


    // list of files / patterns to load in the browser
    // ***NOTE*** Edit source files in include.conf.js & include test spec files below
    files: require('./include.conf.js').concat([
      'test/example/*.spec.js',
      'test/unit/*.spec.js'
    ]),


    // list of files to exclude
    exclude: [
      'gulpfile.js',
      'index.js',
      'karma.conf.js'
    ],

    browserify: {
        debug: true,
        transform: ['reactify']
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // ***NOTE*** Once you're using Browserify, you need to use transforms. 
    // If you wanted to use Istanbul (e.g. for coverage reporting), for example, 
    // you'd use a transform and not a preprocessor.
    preprocessors: {
        'test/example/*.spec.js': ['browserify'],
        'test/unit/*.spec.js': ['browserify'],
        'dev/js/**/*.js': ['browserify']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    plugins: [
        'karma-coverage',
        'karma-mocha',
        'karma-browserify',
        'karma-chai',
        'karma-sinon',
        'karma-chrome-launcher'
    ]
  })
}
