var gulp          = require('gulp');

var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var ssi   = require("gulp-ssi");

var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var mqpacker      = require('css-mqpacker');
var pixrem        = require('pixrem');
var csswring      = require('csswring');
var sassGlob      = require('gulp-sass-glob');
var sourcemaps    = require('gulp-sourcemaps');
var rename        = require('gulp-rename');
var wait          = require('gulp-wait');

var browserify    = require('browserify');
var buffer        = require('vinyl-buffer');

var cached        = require('gulp-cached');
var imagemin      = require('gulp-imagemin');

var webserver     = require('gulp-webserver');
var connectSSI    = require('connect-ssi');
var ip            = require('my-ip');
var del           = require('del');
var watch         = require('gulp-watch');
var runSequence   = require('run-sequence');

/* ==================================================
 * html
 * ================================================== */

gulp.task('html', function() {
  return gulp.src('_src/**/*.html')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(ssi({root: './_src/'}))
    .pipe(gulp.dest('./_dest'));
});

/* ==================================================
 * sass
 * ================================================== */

gulp.task('sass', function() {
  return gulp.src('./_src/**/*.scss')
    .pipe(wait(500))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass.sync({
      // outputStyle: 'nested',
      outputStyle: 'expanded',
      // outputStyle: 'compact',
      // outputStyle: 'compressed',
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 4 versions',
          'Firefox ESR',
          'ie >= 8',
          'Android >= 4.2',
          'ios_saf >= 7',
        ]
      }),
      pixrem,
      mqpacker
    ]))
    .pipe(gulp.dest('./_dest'))
    .pipe(postcss([
      csswring //Compress css
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./_dest'));
});

/* ==================================================
 * scripts
 * ================================================== */
gulp.task('scripts', function() {
  return gulp.src(['./_src/js/**/*.js', './_src/js/**/*.min.js'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest('./_dest/js'))
    .pipe(sourcemaps.write('.'))
});

/* ==================================================
 * font
 * ================================================== */

gulp.task('font', function() {
  return gulp.src('./_src/font/**/*')
    .pipe(gulp.dest('./_dest/font/'));
});

/* ==================================================
 * img
 * ================================================== */

gulp.task('img', function() {
  return gulp.src(['./_src/**/*.{svg,jpg,png,gif,mp4,ico}', './_static/**/*.{svg,jpg,png,gif,mp4,ico}'])
    .pipe(cached('img'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./_dest'));
});

/* ==================================================
 * server
 * ================================================== */

gulp.task('webserver', function() {
  gulp.src(['_dest', '_static'])
    .pipe(webserver({
      host: '0.0.0.0',
      port: 4000,
      livereload: {
        enable: true,
        port: 4001,
        filter: function(fileName) {
          if (fileName.match(/.map$/)) { // exclude all source maps from livereload
            return false;
          } else {
            return true;
          }
        }
      },
      directoryListing: {
        enable: true,
        path: '_dest',
        options: {
          'icons': true
        }
      },
      middleware: [
        connectSSI({
          ext: '.html',
          baseDir: '_dest'
        })
      ],
      open: 'http://' + ip() + ':4000/'
    }));
});

/* ==================================================
 * watch
 * ================================================== */

gulp.task('watch', function() {
  watch('_src/**/*.html', function() {
    gulp.start('html');
  });

  watch('_src/**/*.{scss,css}', function() {
    gulp.start('sass');
  });

  watch('_src/**/*.js', function() {
    gulp.start('scripts');
  });

  // watch('_src/**/*.{svg,jpg,png,gif,mp4,ico}', function() {
  //   gulp.start('img');
  // });
});

/* =================================================
 * clean
 * ================================================= */

gulp.task('clean', function() {
  return del([
    '_dest'
  ]);
});

/* =================================================
 * dev
 * ================================================= */

gulp.task('dev', ['watch', 'webserver']);

/* ==================================================
 * build
 * ================================================== */

gulp.task('build', function(callback) {
  runSequence(
    'clean', ['html', 'font', /*'img',*/ 'sass', 'scripts'], ['watch', 'webserver'],
    callback
  );
});

/* ==================================================
 * default (build)
 * ================================================== */

gulp.task('default', ['build']);
