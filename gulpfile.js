// Load Plugins
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var del = require('del');
var sh = require('shelljs');

// Used by watch
var paths = {
  sass: ['./scss/**/*.scss', 'www/css/style.css'],
  js: ['www/components/**/*.js']
};

// Default task
gulp.task('default', ['clean'], function(){
  gulp.start('sass', 'scripts');
});

// Clean
gulp.task('clean', function(cb) {
  del(['dist/**/*', 'www/css/*.min.css'], cb);
});

// Minify css
gulp.task('sass', function(done) {
  gulp.src(['./scss/ionic.app.scss', 'www/css/style.css'])
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Concat js files (could add ngmin and then uglify). Has a possibly unnecessary rename to min?
gulp.task('scripts', function() {
  return gulp.src('www/components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Update on change
gulp.task('watch', function() {
  // watch sass files
  gulp.watch(paths.sass, ['sass']);
  // watch js files
  gulp.watch(paths.js, ['scripts']);
});

// What does this do? Installs bower stuff? Do we need to install other stuffs?
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

// What does this do? Notifies user what to do if gulp install doesn't work?
gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
