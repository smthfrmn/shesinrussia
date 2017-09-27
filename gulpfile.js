var gulp = require('gulp'),
    sass = require('gulp-sass'), //plugin to compile sass
    postcss = require('gulp-postcss'), //handles css plugins like autoprefixer and cssnano
    autoprefixer = require('autoprefixer'), //autoprefixes css
    cssnano = require('cssnano'), //minifies css
    sourcemaps = require('gulp-sourcemaps'), //maps css to sass file in the DOM
    concat = require('gulp-concat'), //concatenates js into one file
    uglify = require('gulp-uglify'), //minifies js
    pug = require('gulp-pug'), //plugin to compile pug (renamed from jade) templates
    imagemin = require('gulp-imagemin'), //optimize images
    cache = require('gulp-cache'), //caches images so that minified images dont get reprocessed
    bs = require('browser-sync').create();
    deploy = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

// SASS

var sassSrc = ['src/sass/*.scss'],
    sassDist = ['docs/css'];

gulp.task('css', function() {
    var processors = [
            autoprefixer(),
            cssnano(),
        ],
        sassOptions = {
            errLogToConsole: true,
            outputStyle: 'compressed'
        };
    return gulp.src(sassSrc)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('docs/css'))
        .pipe(bs.reload({
            stream: true
        }));
});

// JAVASCRIPT

var jsSrc = ['src/scripts/*.js'],
    jsDist = ['docs/js'];

gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'));
});

// ASSETS

gulp.task('images', function() {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'))
});

// LIVE RELOAD

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: 'docs'
        }
    })
});

// WATCH

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(sassSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
});


/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./docs/**/*")
    .pipe(deploy())
});

gulp.task('default', ['css', 'js', 'watch']);
