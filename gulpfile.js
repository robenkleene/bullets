var gulp = require('gulp');
var jade = require('gulp-jade');
var glob = require('glob');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');

// Paths

var paths = {
    test: {
      src: './test/src/',
      build: './test/build/'
    },
    example: {
      src: './example/src/',
      build: './example/build/'
    }
};


// Jade

gulp.task('jade-example', function() {
  gulp.src(path.join(paths.example.src, 'jade/index.jade'))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.example.build));
});

gulp.task('jade-test', function() {
  gulp.src(path.join(paths.test.src, 'jade/index.jade'))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.test.build));
});


// Browserify

gulp.task('browserify-test', function () {
    var b = browserify({
      entries: glob.sync(paths.test.src + 'tests/*.js')
    });

    b.bundle().pipe(source('tests.js')).pipe(gulp.dest('./test/build/js'));
});


// Watch

gulp.task('watch', function() {
    // Test
    gulp.watch(paths.test.src + 'jade/*.*', ['jade-test']);
    gulp.watch(paths.test.src + 'tests/*.js', ['browserify-test']);

    // Example
    // On example change also build test because test imports example
    gulp.watch(paths.example.src + 'jade/*.*', ['jade-example', 'jade-test']);
});

gulp.task('jade', ['jade-test', 'jade-example']);
gulp.task('default', ['jade', 'browserify-test']);
