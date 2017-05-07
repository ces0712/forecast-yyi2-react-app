var path = require('path');
var webpack = require('webpack');

var jsEntryPath = path.resolve(__dirname, 'src', 'index.js');
var htmlEntryPath = path.resolve(__dirname, 'index.html');
var buildPath = path.resolve(__dirname, 'public', 'build');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const isDeveloping = process.env.NODE_ENV !== 'production';

var jsLoader;
var entryConfig;
var plugins;

if (isDeveloping) {
  entryConfig = [ 
    'webpack-hot-middleware/client?reload=true', 
    'react-hot-loader/patch',
    jsEntryPath,
    htmlEntryPath
  ];
  
  plugins = [ 
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.EnvironmentPlugin(['PORT_API','HOST']),
    new webpack.NoErrorsPlugin()
  ];

  jsLoader =  ['react-hot-loader/webpack', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-1'];

}else {
  entryConfig = [ 
    jsEntryPath,
    htmlEntryPath
  ];

  plugins = [ 
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.EnvironmentPlugin(['PORT_API','HOST']),
    new webpack.NoErrorsPlugin()
  ];

  jsLoader = ['babel?presets[]=react,presets[]=es2015,presets[]=stage-1'];
}


module.exports = {
  entry: entryConfig,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: jsLoader
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
  plugins: plugins
};

