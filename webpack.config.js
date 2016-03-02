'use strict';

let path = require('path');

let autoprefixer = require('autoprefixer');
let cssImport = require('postcss-import');
let cssNested = require('postcss-nested');
let cssVars = require('postcss-simple-vars');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ExtractCSS = new ExtractTextPlugin(1, 'style.css');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './main.js',
    style: './main.css'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader' }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel?presets[]=es2015']
      },
      {
        test: /\.css$/,
        loader: ExtractCSS.extract('style', 'css!postcss')
      }
    ]
  },
  eslint: {
    fix: true,
    configFile: './.eslintrc',
    emitWarning: true,
    emitError: true,
    failOnWarning: false,
    failOnError: true
  },
  postcss: (webpack) => [
    cssImport({ addDependencyTo: webpack }),
    cssNested(),
    cssVars(),
    autoprefixer
  ],
  plugins: [ExtractCSS],
  watchOptions: {
    poll: true,
    aggregateTimeout: 1000
  }
};
