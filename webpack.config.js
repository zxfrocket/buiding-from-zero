module.exports = {
  entry: {
    app: './client/src/app.ts'
  },
  output: {
    filename: '[name].release.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader'
        },
        exclude: '/node_modules/'
      }
    ]
  }
}