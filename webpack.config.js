const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    app1: './client/src/app1.js',
    app2: './client/src/app2.js',
    vendor: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].common.js'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      chunks: ['app1', 'app2']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
}