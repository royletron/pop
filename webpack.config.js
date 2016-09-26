var path = require('path');
var webpack = require('webpack');
var html = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var cssnano = require('cssnano')
var nested = require('postcss-nested')

module.exports = {
  target: 'web',
  entry: './src/index.js',
  resolve: {extensions: ['', '.js', '.jsx']},
  output: {
    path: 'dist/',
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    hot: true,
    inline: true,
    port: 3333
  },

  debug: true,
  devtool: 'eval-source-map',

  postcss: function () {
    return [precss, nested, autoprefixer]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new html({template: 'src/index.ejs'})
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  }
};
