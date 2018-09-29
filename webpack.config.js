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
          // {
          //   loader: 'file-loader',
          //   options: {
          //     publicPath: 'resources/images/',
          //     outputPath: './dist',
          //     useRelativePath: true
          //   }
          // },
          {
            loader: 'url-loader',
            options: {
              name: '[name]-min.[ext]',
              limit: 2000,
              publicPath: 'resources/images/',
              outputPath: './dist',
              useRelativePath: true
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
        test: /\.(eot|woff2?|tff|svg)$/,
        use:{
          loader: 'url-loader',
          options: {
            name: '[name]-min.[ext]',
            limit: 2000,
            publicPath: 'resources/fonts/',
            outputPath: './dist',
            useRelativePath: true
          }
        }
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