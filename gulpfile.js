var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    del = require('del'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    nodemon = require('gulp-nodemon');

//Scripts : Browserify, Reactify, Uglify
gulp.task('scripts', function() {
  browserify('dev/js/main.js')
      .transform('reactify')
      .bundle()
      .pipe(source('main.js'))
      .pipe(plumber())
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('build/js'));
});

//Styles: Compile, Minify 
gulp.task('styles', function () {
  gulp.src('dev/less/*.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(prefix())
      //.pipe(minifyCSS())
      .pipe(rename('app.min.css'))
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
  gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(done) {
  del(['./dist'], done);
});

gulp.task('cleanhtml', function(done) {
  del(['./dist/*.html'], done);
});

gulp.task('cleanjs', function(done) {
  del(['./dist/js'], done);
});

gulp.task('cleancss', function(done) {
  del(['./dist/css'], done);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'index.js',
    tasks: []
  });
});

// Watch: Scripts, Styles, Images, LiveReload
gulp.task('watch', function() {
  var server = livereload();
  gulp.watch('dev/index.html',['cleanhtml','copy']);
  gulp.watch('dev/img/*', ['images']);
  gulp.watch('dev/js/**/*.js', ['cleanjs','scripts']);
  gulp.watch('dev/less/*.less', ['cleancss','styles']);
});

gulp.task('default', ['clean','scripts', 'styles', 'images', 'copy', 'watch']);


