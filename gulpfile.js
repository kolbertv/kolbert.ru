"use strict";


let gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    prefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

let path = {
    src: {
        style: 'front-src/scss/*.scss',
        js: 'front-src/babel/*.js'
    },

    dist: {
        style: 'app/public/style',
        js: 'app/public/js'
    },

    watch: {
        style: 'front-src/scss/*.scss',
        js: 'front-src/babel/*.js',
        html: 'app/templates/*.html',
        json: 'app/data/*.json'
    }
};

let serverConfig = {
    proxy: 'http://localhost:3000',
    tunnel: true
};

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass().on('error', function (error) {
            let fileName = error.file;
            let message = error.messageOriginal;
            let line = error.line;
            let column = error.column;
            gutil.log(gutil.colors.red.bold('SCSS ОШИБКА в строке: ' + line + ' столбец:' + column));
            gutil.log(gutil.colors.red.bold(fileName));
            gutil.log(gutil.colors.red.bold(message));
        }))
        .pipe(prefixer())
        .pipe(gulp.dest(path.dist.style))
        .pipe(reload({stream: true}))

});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(babel().on('error',function (err) {
            let message = err.message;
            let errName = err.name;
            let codeFrame = err.codeFrame;
            gutil.log(gutil.colors.red.bold('JavaScript ОШИБКА: ' + errName));
            gutil.log(gutil.colors.red.bold(message));
            gutil.log(gutil.colors.red.bold(codeFrame));
        }))
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream:true}))
});

gulp.task('json:build', function () {
    gulp.src(path.watch.json)
        .pipe(reload({stream:true}))
});

gulp.task('html:build', function () {
    gulp.src(path.watch.html)
        .pipe(reload({stream:true}))
});

gulp.task('build', [
    'style:build',
    'js:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.json, ['json:build']);
    gulp.watch(path.watch.html, ['html:build']);
});

gulp.task('webServer' , function () {
    browserSync(serverConfig);
});

gulp.task('default', ['build', 'webServer', 'watch']);