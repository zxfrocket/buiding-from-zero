const merge = require('webpack-merge')
const prodConf = require('./build/webpack.prod')
const devConf = require('./build/webpack.dev')

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

const isProd = (env) => {
  return env === 'production'
}

const generateConfig = (env) => {
  return {
    entry: {
      app: './client/src/app.js'
    },
    resolve: {
      alias: {
        jquery$: path.resolve(__dirname, './client/src/lib/jquery.min.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, './client/src'),
          exclude: path.resolve(__dirname, './client/src/lib'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ].concat(isProd(env) ? [] : [{
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }])
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
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './client/index.html',
        inject: true,
        chunks: ['app', 'manifest'],
        minify: {
          collapseWhitespace: isProd()
        }
      }),
      new HtmlInlineChunkPlugin({
        inlineChunks: ['manifest']
      }),
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}

module.exports = (env) => {
  let config = env === 'production' ? prodConf : devConf
  return merge(generateConfig(env), config)
}