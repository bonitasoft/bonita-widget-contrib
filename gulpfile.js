var gulp = require('gulp');
var zip = require('gulp-zip');
var join = require('path').join;
var merge = require('merge-stream');
var Promise = require('promise');
var yargs = require('yargs');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

var buildWidget = require('widget-builder');

var runKarma = require('./script/run-karma');
var dir = require('./script/dir');
var deploy = require('./script/deploy');

gulp.task('clean', function () {
  return gulp.src('dist').pipe(clean());
});

gulp.task('build', ['clean'], function () {
  return merge(dir('src/widgets').map(function (widget) {
    return merge(
      gulp.src(join('src/widgets', widget, '*.json')).pipe(buildWidget()),
      gulp.src(join('src/widgets', widget, 'assets/**/*')).pipe(rename(function (path) {
        path.dirname = join(widget, 'assets', path.dirname);
      })))
      .pipe(gulp.dest(join('dist', widget, 'resources')));
  }));
});

gulp.task('build:watch', ['build'], function () {
  gulp.watch('src/widgets/**/*', ['build']);
});

gulp.task('test', ['build'], function (done) {
  Promise
    .all(dir('src/widgets').map(runKarma.bind(null, {watch: false})))
    .then(done.bind(null, null));
});

gulp.task('test:watch', ['build:watch'], function (done) {
  Promise
    .all(dir('src/widgets').map(runKarma.bind(null, {watch: true})))
    .then(done.bind(null, null));
});

gulp.task('zip', ['build'], function () {
  return merge(dir('dist').map(function (widget) {
    return gulp.src(join('dist', widget, '**/*'))
      .pipe(zip(widget + '.zip'))
      .pipe(gulp.dest('dist'));
  }));
});

gulp.task('deploy', ['zip'], function () {
  var argv = getDeploymentArguments();
  return gulp.src(join('dist', argv.widget + '.zip')).pipe(deploy(argv.host, argv.force));
});

gulp.task('deploy:watch', ['deploy'], function () {
  var argv = getDeploymentArguments();
  return gulp.watch(join('src/widgets', argv.widget, '**/*'), ['deploy']);
});

gulp.task('default', ['zip', 'test']);

function getDeploymentArguments() {
  return yargs
    .usage('Usage: npm run deploy[:watch] -- --widget customWidget [--host http://127.0.0.1:8080/designer] [--force true]')
    .demand('widget')
    .alias('widget', 'w')
    .choices('widget', dir('dist'))
    .describe('widget', 'Widget directory name to deploy')
    .demand('host', false)
    .default('host', 'http://127.0.0.1:8080/designer')
    .demand('force', false)
    .default('force', false)
    .argv;
}
