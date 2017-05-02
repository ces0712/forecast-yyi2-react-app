var path = require('path');
var webpack = require('webpack');

var jsEntryPath = path.resolve(__dirname, 'src', 'index.js');
var htmlEntryPath = path.resolve(__dirname, 'index.html');
var buildPath = path.resolve(__dirname, 'public', 'build');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    jsEntryPath,
    htmlEntryPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-1']
    }, 
    {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    },
    {
      test: /\.css$/, 
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.NoErrorsPlugin()
  ]
};

