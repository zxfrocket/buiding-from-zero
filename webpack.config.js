const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
  entry: {
    app: './client/src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    publicPath: './dist/',
    filename: '[name].release.js',
    chunkFilename: '[name].min.css'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.transform.js'
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName:'[path]__[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, './client/**/*.html'),
        path.join(__dirname, './client/src/**/*.js')
      ])
    })
  ]
}