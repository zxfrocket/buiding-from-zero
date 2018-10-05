const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob-all');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: '[name].release.[hash:5].js',
    chunkFilename: '[name].min.css'
  },
  resolve: {
    alias: {
      jquery$: path.resolve(__dirname, './client/src/lib/jquery.min.js')
    }
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
                  require('postcss-sprites')({
                    spritePath: './client/resources/images'
                  }),
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-min.[ext]',
              limit: 2000
              //publicPath: 'resources/images/',
              //outputPath: './dist'
            }
          },
          {
            loader: 'img-loader',
            options: {
              pngquant:{
                quality: 80
              }
            }
          }
        ]
      },
      {
        test: path.resolve(__dirname, './client/src/app.js'),
        use: {
          loader: 'imports-loader',
          options: {
            $: 'jquery'
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src']
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.[hash:5].css',
      allChunks: false
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, './client/**/*.html'),
        path.join(__dirname, './client/src/**/*.js')
      ])
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html',
      inject: true,
      chunks: ['app'],
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}