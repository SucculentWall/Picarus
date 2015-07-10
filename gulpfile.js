var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    browserify = require('browserify'),
    del = require('del'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    nodemon = require('gulp-nodemon');

//Scripts : Browserify, Reactify, Uglify
gulp.task('scripts', function() {
  browserify('dev/js/main.js')
      .transform('reactify')
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(plumber())
      //.pipe(uglify())
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
gulp.task('images', function() {
  gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('copy', function() {
  gulp.src('dev/index.html')
      .pipe(gulp.dest('dist'));
});

// calls each options first and then deletes /dist
gulp.task('clean', function(done) {
  del(['./dist/**/*'], done);
});

gulp.task('cleanhtml', function(done) {
  del(['./dist/index.html'], done);
});

gulp.task('cleanjs', function(done) {
  del(['./dist/js/**/*', './dist/js'], done);
});

gulp.task('cleancss', function(done) {
  del(['./dist/css/**/*', './dist/css'], done);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'index.js',
    tasks: []
  });
});

// Watch: Scripts, Styles, Images, LiveReload
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('dev/index.html',function() {
    return runSequence('cleanhtml','copy');
  });
  gulp.watch('dev/img/*', ['images']);
  gulp.watch('dev/js/**/*.js', function() {
    return runSequence('cleanjs', 'scripts');
  });
  gulp.watch('dev/less/**/*.less', function() {
    return runSequence('cleancss', 'styles');
  });
});

// cleans first, then builds the files again
gulp.task('default', function () {
  runSequence('clean','scripts', 'styles', 'images', 'copy', 'watch');
});


