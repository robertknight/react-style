'use strict';

var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //devtool: 'sourcemap',
  entry: './index.js',
  output: {
    filename: "bundle.js",
    path: __dirname + "/build"
  },
  resolve: {
    alias: {
      'react$': require.resolve('../../node_modules/react'),
      'react-style$': require.resolve('../../lib/index')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          ReactStylePlugin.loader(),
          'jsx-loader?harmony&sourceMap'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new ReactStylePlugin('bundle.css')
  ]
};
