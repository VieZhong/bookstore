var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, '../back_end_koajs/apps/bookstore');
var APP_PATH = path.resolve(ROOT_PATH, 'app');
module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },

  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: APP_PATH
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      // loaders: ['eslint'],
      loaders: [],
      include: APP_PATH
    }],
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: APP_PATH
    }, {
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'My Bookstore'
    })
  ]
}