const path = require('path');

module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      './src/scripts.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'scripts.bundle.js',
  },
  module: {
    rules: [
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // query: {
        //    presets: ['@babel/preset-env', '@babel/preset-stage-0']
        // }
    }
    ]
  }
}
