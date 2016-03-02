'use strict';

let path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './main.js'
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
  watchOptions: {
    poll: true,
    aggregateTimeout: 1000
  }
};
