var gulp = require('gulp');
var jade = require('gulp-jade');
var glob = require('glob');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// Jade

gulp.task('jade-example', function() {
  gulp.src('./example/src/jade/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./example/build/'));
});

gulp.task('jade-test', function() {
  gulp.src('./test/src/jade/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./test/build/'));
});


// Browserify

gulp.task('browserify-test', function () {
    var b = browserify({
        entries: glob.sync('./test/src/tests/*.js')
    });

    b.bundle().pipe(source('tests.js')).pipe(gulp.dest('./test/build/js'));
});


// Watch

gulp.task('watch', function() {
    // Test
    gulp.watch('./test/src/jade/*.*', ['jade-test']);
    gulp.watch('./test/src/tests/*.js', ['browserify-test']);

    // Example
    // On example change also build test because test imports example
    gulp.watch('./example/src/jade/*.*', ['jade-example', 'jade-test']);
});

gulp.task('jade', ['jade-test', 'jade-example']);
gulp.task('default', ['jade', 'browserify-test']);
