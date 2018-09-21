const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './client/src/app.js',
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: './dist/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      children: true,
      minChunks: 2
    })
  ]
}