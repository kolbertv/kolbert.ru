"use strict";

const {
    src,
    dest,
    series,
    parallel,
    watch
} = require("gulp");

const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber"); //чтобы не вылетал gulp при появлении ошибки при выполении таски
const rename = require("gulp-rename");
const sourcemap = require('gulp-sourcemaps')

const sass = require("gulp-sass");
// const csscomb = require('gulp-csscomb') //критически опасные ошибки в модуле
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// const tinypng = require('gulp-tinypng')  //критически опасные ошибки в модуле лучше https://tinypng.com
// const imageopt = require('gulp-image-optimization')  //критически опасные ошибки в модуле

let serverConfig = {
    proxy: "http://localhost:2999",
    tunnel: true
};

const path = {
    style: {
        src: "front-src/scss/*.scss",
        dest: "app/public/style"
    },
    js: {
        src: "front-src/babel/*.js",
        dest: "app/public/js"
    },
    watch: {
        html: "app/templates/**/*.html",
        ejs: "app/views/**/*.ejs",
        scssIncludes: "front-src/scss/includes/*.scss"
    }
};

let server = () => {
    browserSync.init(serverConfig);
};

let styleBuild = () => {
    return (
        src(path.style.src)
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(
            sass({
                // outputStyle: 'compressed'
            }).on("error", err => {
                console.error(
                    `Ошибка в SCSS файле: ${err.relativePath} в строке: ${
              err.line
            } в столбце: ${err.column}`
                );
                console.error(err.messageOriginal);
            })
        )
        .pipe(
            autoprefixer({
                browsers: ["last 5 version"],
                cascade: false
            })
        )
        // .pipe(csscomb())
        .pipe(sourcemap.write('/map'))
        .pipe(dest(path.style.dest))
        // .pipe(csso())
        // .pipe(rename({
        // extname: '.min.css'
        // }))
        // .pipe(sourcemap.write('/maps'))
        // .pipe(sourcemap.write())
        // .pipe(dest(path.style.dest))
        .pipe(browserSync.stream())
    );
};

let jsBuild = () => {
    return (
        src(path.js.src)
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(
            babel().on("error", err => {
                console.log(`JavaScript ОШИБКА: ${err.name}`);
                console.log(err.message);
                console.log(err.codeFrame);
            })
        )
        .pipe(sourcemap.write())
        .pipe(dest(path.js.dest))
        // .pipe(uglify())
        // .pipe(rename({
        //     extname: '.min.js'
        // }))
        // .pipe(sourcemap.write('/maps'))
        // .pipe(dest(path.js.dest))
        .pipe(browserSync.stream())
    );
};

let htmlWatch = () => {
    return src(path.watch.html).pipe(browserSync.stream());
};

let ejsWatch = () => {
    return src(path.watch.ejs).pipe(browserSync.stream());
};

let scssIncludesWatch = () => {
    return src(path.watch.scssIncludes).pipe(browserSync.stream());
};

let defaultTask = cb => {

    server();
    watch(path.style.src, styleBuild);
    watch(path.js.src, jsBuild);
    watch(path.watch.html, htmlWatch);
    watch(path.watch.ejs, ejsWatch);
    watch(path.watch.scssIncludes, styleBuild);

    cb();
};

exports.default = series(parallel(styleBuild, jsBuild), defaultTask);