var gulp = require('gulp');
var jade = require('gulp-jade');


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


// Watch

gulp.task('watch', function() {
    gulp.watch('./test/src/jade/*.*', ['jade-test']);
    // On example change also build test because test imports example
    gulp.watch('./example/src/jade/*.*', ['jade-example', 'jade-test']);
});

gulp.task('jade', ['jade-test', 'jade-example']);
gulp.task('default', ['jade']);
