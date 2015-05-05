var gulp = require('gulp');

var jade = require('gulp-jade');
 
gulp.task('jade-test', function() { 
  gulp.src('./test/src/jade/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./test/build/'))
});

gulp.task('jade', ['jade-tests', 'jade-example']);
gulp.task('default', ['jade']);