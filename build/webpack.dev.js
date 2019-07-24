const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')

module.exports = merge(webpackConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
});