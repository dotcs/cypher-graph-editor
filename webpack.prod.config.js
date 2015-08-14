var path = require("path"),
    webpack = require('webpack'),
    config = require('./webpack.dev.config.js');

config.entry = './src/index';
config.output.path = './dist';

config.plugins = [
  // removes a lot of debugging code
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }}),

  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("package.json", ["main"]),
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
  ]),

  new webpack.ProvidePlugin({
    '_': "lodash",
    'd3': "d3",
    'cx': "classnames"
  }),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })

];

module.exports = config;