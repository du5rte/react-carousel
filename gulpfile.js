// GULP CONFIGURATION

// For instructions about this file refer to:
// http://gulpjs.com
var gulp                 = require('gulp')
var $                    = require('gulp-load-plugins')()
var del                  = require('del')

// http://browsersync.io
var browserSync          = require('browser-sync').create()

// http://webpack.github.io
var webpack              = require('webpack')
var webpackConfig        = require('./webpack.config.js')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

// Clean
gulp.task('clean', function(done) {
  del(['demo/*'], done())
  done()
})

// Webpack Compilers
var frontCompiler = webpack(require('./webpack.config.js'))

// Webpcak Logger
function webpackLogger(done) {
  return function(error, stats) {
    if (error) {
      throw new $.util.PluginError('webpack', error)
    } else {
      $.util.log('[webpack]', stats.toString({colors: true}))
    }
    if (done) done()
  }
}

// Styles
gulp.task('styles', function() {
  return gulp.src('styles/**/*.{sass,scss,css}')
      // add styles compiler (e.g. gulp-sass)
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

// Views
gulp.task('views', function() {
  return gulp.src('views/**/*.html')
    // add views compiler (e.g. gulp-jade)
    // .pipe($.mustache())
    .pipe(gulp.dest('demo'))
})

// Webpack Bundler
gulp.task('bundle', function(done) {
  frontCompiler.run(webpackLogger(done))
})

// Application
gulp.task('application', function(done) {
  backCompiler.run(webpackLogger(done))
})

// Watcher
gulp.task('watch', function () {

  // Browsersync Client Server
  browserSync.init({
    browser: 'google chrome canary',
    server: {
      baseDir: 'demo',
      middleware: [
        webpackDevMiddleware(frontCompiler, {
          noInfo: true,
          stats: { colors: true, chunkModules: false }
        }),
        webpackHotMiddleware(frontCompiler)
      ]
    }
  })

  gulp.watch('views/**/*.{html,jade}', gulp.series('views', browserSync.reload))
  gulp.watch('styles/**/*.{sass,scss,css}', gulp.series('styles'))

})

// Development Environment
gulp.task('development',
  gulp.series('clean', gulp.parallel('views', 'styles'), 'watch')
)

// Production Environment
gulp.task('production',
  gulp.series('clean', gulp.parallel('views', 'styles'), 'bundle')
)

// Default
gulp.task('default', gulp.parallel(process.env.NODE_ENV || 'development'))
