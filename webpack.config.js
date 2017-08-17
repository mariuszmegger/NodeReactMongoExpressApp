var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!bootstrap/dist/js/bootstrap.min.js',
    // 'style!css!bootstrap/dist/css/bootstrap.min.css',
    './client/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'jquery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './client/components',
      './client/api'
    ],
    alias: {
      applicationStyles: 'client/styles/app.scss',
      actions:'client/actions/actions.jsx',
      reducers:'client/reducers/reducers.jsx',
      configureStore: 'client/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|playground)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
