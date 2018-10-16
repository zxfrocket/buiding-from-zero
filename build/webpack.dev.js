const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../client/dist/dev')
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 9001,
    inline: true,
    overlay: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                singleton: true,
                transform: './css.transform.js'
              }
            },
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
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './resources/images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}