const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// HTML
const html_task = () => {
  return src('app/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

// SCSS
const scss_task = () => {
  return src('app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
};

// JS
const js_task = () => {
  return src('app/js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
};

// Images
const img_task = () => {
  return src('app/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream());
};

// BrowserSync
const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  watch('app/**/*.html', html_task);
  watch('app/scss/**/*.scss', scss_task);
  watch('app/js/**/*.js', js_task);
  watch('app/img/*', img_task);
};

// Default task
exports.default = series(
  parallel(html_task, scss_task, js_task, img_task),
  serve
);
