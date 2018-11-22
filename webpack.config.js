const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // specifying the source js file for webpack to start building the dependency tree...
  entry: './js/app.js',
  // specifying the output folder and filename...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app_bundle.js'
  },

  // modules to be used and files on which they will be applied...
  module: {
    rules: [
      {test: /\.(js)$/, use: ['babel-loader']}
    ]
  },

  // plugin to create a new index.html file in the dist folder and add app_bundle.js to it...
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]

}