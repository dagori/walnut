'use strict';
const { src, dest, series, parallel, watch } = require('gulp');
const babel = require("gulp-babel");
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');

const config = {
  shape: {
    dimension: { // Set maximum dimensions
      maxWidth: 26,
      maxHeight: 26
    },
    spacing: { // Add padding
      padding: 5
    }
  },
  mode: {
    view: { // Activate the «view» mode
      bust: false,
      render: {
        scss: true // Activate Sass output (with default options)
      }
    },
    symbol: false // Activate the «symbol» mode
  }
};

function sprites() {
  return src('images/icon-*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('build/images'));
}

function styles() {
  return src('scss/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserList: ['last 2 versions', '>1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('build/css', { sourcemaps: true }))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(['js/*.js', 'vendor/*.js'])
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(sourcemaps.write())
  .pipe(dest('build/js'))
  .pipe(browserSync.stream())
}

function serve() {
  browserSync.init({
    server: {
       baseDir: "./"
    }
  });
  watch('*.html').on('change', browserSync.reload)
  watch('images/*', series(images))
  watch('js/*.js', series(scripts))
  watch('scss/*.scss', series(styles))
}

function images() {
  return src('images/**')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      }),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 7})
    ]))
    .pipe(dest('build/images'))
}

function clean() {
  return del(['build/**']);
}

function font() {
  return src('fonts/*')
  .pipe(dest('build/fonts'))
}

//Экспорт для вызова через консоль
exports.serve = serve;
exports.css = styles;
exports.js = scripts;
exports.img = images;
exports.clean = clean;
exports.sprites = sprites;
exports.build = series(clean, images, parallel(font, styles, scripts));
exports.default = series(clean, images, parallel(font, styles, scripts, serve));
