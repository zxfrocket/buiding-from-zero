const path = require('path');

module.exports = {
  entry: {
    app: './client/src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    publicPath: './dist/',
    filename: '[name].release.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
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
              minimize: true,
              modules: true,
              localIdentName:'[path]__[name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  }
}