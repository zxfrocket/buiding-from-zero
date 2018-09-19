module.exports = {
  entry: {
    app: './client/src/app.js'
  },
  output: {
    filename: '[name].release.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "targets": {
                  "browsers": ["last 2 versions", "ie 6-8"]
                }
              }]
            ]
          }
        },
        exclude: '/node_modules/'
      }
    ]
  }
}