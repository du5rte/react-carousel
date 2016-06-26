// WEBPACK CONFIGURATION

// For instructions about this file refer to:
// http://webpack.github.io
var path = require('path')
var webpack  = require('webpack')
var webpackRootDirectoriesAlias = require('webpack-root-directory-alias')

var development = process.env.NODE_ENV || 'development'

module.exports = {
  debug: development ? true : false,
  devtool: development ? '#eval-source-map' : null,
  context: path.join(__dirname, 'scripts'),
  entry: {
    index: development ? ['webpack-hot-middleware/client?reload=true', './'] : ['./']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'demo')
  },
  resolve: {
    extensions: ['', '.js','.jsx'],
    root: process.env.PWD,
    alias: webpackRootDirectoriesAlias()
  },
  plugins: development ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false }),
  ],
  module: {
    preLoaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      // Scripting
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      // Fonts
      { test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: 'file?name=[name].[ext]' },
      // Images
      { test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?{progressive:true, bypassOnDebug: true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'] }
    ]
  }
}
