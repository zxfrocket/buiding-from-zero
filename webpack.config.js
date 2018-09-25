const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/src/app.js'
  },
  output: {
    filename: '[name].release.js',
    path: path.resolve(__dirname, './client/dist'),
    publicPath: './dist/',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['lodash']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}