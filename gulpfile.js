const gulp = require('gulp');
const babel = require('gulp-babel');
const webserver = require('gulp-server-livereload');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
let AWS = require('aws-sdk');
let fs = require('fs');
let Confirm = require('prompt-confirm');
let mime = require('mime-types');
let glob = require('glob');

const name = 'vegemilnoid-programs';
const version = '1.0.0';
const src = 'app/src';
const dist = 'app/dist';

const path = {
  js: `${src}/js/**/*.js`,
  css: `${src}/css/**/*.css`,
  img: `${src}/img/**/*.*`,
  api: `${src}/api/**/*.*`,
  lib: `${src}/lib/**/*.*`,
  html: `${src}/**/*.html`,
  transpiled: `${dist}/js/transpiled/**/*.js`
};

gulp.task('server', () => {
  return gulp.src(`${dist}/`).pipe(webserver({
    livereload: false,
    defaultFile: 'main.html',
    directoryListing: true,
    open: true,
    host: '127.0.0.1',
    port: 8080
  }));
});

gulp.task('transpile', () => {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(gulp.dest(`${dist}/js/transpiled`));
});

gulp.task('concat-js', () => {
  return gulp.src(path.transpiled)
    .pipe(concat(`${name}-${version}.js`))
    .pipe(gulp.dest(`${dist}/js`));
});

gulp.task('combine-js', () => {
  return gulp.src(path.transpiled)
    .pipe(concat(`${name}-${version}.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest(`${dist}/js`));
});

gulp.task('compile-css', () => {
  return gulp.src(path.css)
    .pipe(concat(`${name}-${version}.min.css`))
    .pipe(cssmin())
    .pipe(gulp.dest(`${dist}/css`));
});

gulp.task('copy-html', () => {
  return gulp.src(path.html).pipe(gulp.dest(`${dist}/`));
});

gulp.task('copy-files', () => {
    gulp.src(path.img).pipe(gulp.dest(`${dist}/img`));
    gulp.src(path.api).pipe(gulp.dest(`${dist}/api`));
    return gulp.src(path.lib).pipe(gulp.dest(`${dist}/js`));
});

gulp.task('watch', () => {
  livereload.listen();

  gulp.watch(path.js, gulp.series('transpile', 'prepare'));
  gulp.watch(path.lib, gulp.series('transpile', 'prepare'));
  gulp.watch(path.css, gulp.series('transpile', 'prepare'));
  gulp.watch(path.img, gulp.series('copy-files'));
  gulp.watch(path.html, gulp.series('copy-html'));
  gulp.watch(`${src}/**`).on('change', livereload.changed);
});

gulp.task('prepare', gulp.parallel('concat-js', 'combine-js', 'copy-html', 'compile-css', 'copy-files'));
gulp.task('build', gulp.series('transpile', 'prepare'));
gulp.task('run', gulp.series('transpile', 'prepare', 'server', 'watch'));