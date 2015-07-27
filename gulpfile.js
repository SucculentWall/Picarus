require('./environment');

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  // imagemin = require('gulp-imagemin'),
  prefix = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence'),
  browserify = require('browserify'),
  del = require('del'),
  reactify = require('reactify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  nodemon = require('gulp-nodemon'),
  shell = require('gulp-shell'),
  gulpif = require('gulp-if'),
  protractor = require("gulp-protractor").protractor,
  replace = require('gulp-replace'),
  Server = require('karma').Server;


//Shell
gulp.task('brew', shell.task([
  'brew install imagemagick',
  'brew install graphicsmagick'
]));
gulp.task('apt-get', shell.task([
  'apt-get install imagemagick',
  'apt-get install graphicsmagick'
]));
gulp.task('shell', function () {
  if (process.env.NODE_ENV === 'deployment') runSequence('apt-get');
  else runSequence('brew');
});

//Scripts : Browserify, Reactify, Uglify
gulp.task('scripts', function () {
  browserify('dev/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(gulpif(process.env.NODE_ENV === 'deployment', uglify()))
    //.pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

//Styles: Compile, Minify 
gulp.task('styles', function () {
  gulp.src('dev/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(prefix())
    .pipe(minifyCSS())
    //.pipe(rename('app.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

//Images: Compress
gulp.task('images', function () {
  gulp.src('img/*')
    // .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy', function () {
  gulp.src('dev/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist'));
});

// calls each options first and then deletes /dist
gulp.task('clean', function (done) {
  del(['./dist/**/*'], done);
});

gulp.task('cleanhtml', function (done) {
  del(['./dist/index.html'], done);
});

gulp.task('cleanjs', function (done) {
  del(['./dist/js/**/*', './dist/js'], done);
});

gulp.task('cleancss', function (done) {
  del(['./dist/css/**/*', './dist/css'], done);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server/server.js',
    delay: 2500
  });
});


// Testing: Karma, Protractor

gulp.task('testClient', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tester', function () {
  gulp.src('./environment.js')
    .pipe(replace('process.env.TEST = false','process.env.TEST = true'))
    .pipe(gulp.dest('./'));
});

gulp.task('auth', function () {
  gulp.src('./environment.js')
    .pipe(replace('process.env.TEST = true','process.env.TEST = false'))
    .pipe(gulp.dest('./'));
});

gulp.task('protractor', function () {
  gulp.src(["./test/e2e/*.spec.js"])
    .pipe(protractor({
      configFile: "./protractor.conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8888/']
    }))
    .on('error', function(e) { throw e; });
});

// Watch: Scripts, Styles, Images, LiveReload
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('dev/index.html', function () {
    return runSequence('cleanhtml', 'copy');
  });
  gulp.watch('dev/img/*', ['images']);
  gulp.watch('dev/js/**/*.js', function () {
    return runSequence('cleanjs', 'scripts');
  });
  gulp.watch('dev/less/**/*.less', function () {
    return runSequence('cleancss', 'styles');
  });
});

// cleans first, then builds the files again

gulp.task('build', function () {
  runSequence('shell');
});

// gulp.task('default', function () {
//   runSequence('auth', 'clean', 'scripts', 'styles', 'images', 'copy', 'nodemon', 'watch');
// });

gulp.task('default', function () {
  runSequence('auth', 'clean', 'scripts', 'styles', 'images', 'copy', 'watch');
});

gulp.task('testnode', function () {
  runSequence('tester', 'clean', 'scripts', 'styles', 'images', 'copy');
});

gulp.task('test', function() {
  runSequence('testClient', 'testnode', 'protractor');
});