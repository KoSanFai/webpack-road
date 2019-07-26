
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const webpackConfig = require('./webpack.config')

function resolve(dir) {
  return path.join(__dirname, "..", dir)
}

module.exports = merge(webpackConfig, {
  mode: "production",
  devtool: "source-map",
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         name: "chunk-vendors",
  //         test: /[\\\/]node_modules[\\\/]/,
  //         priority: -10,
  //         chunks: "initial"
  //       },
  //       common: {
  //         name: "chunk-common",
  //         minChunks: 2,
  //         priority: -20,
  //         chunks: "initial",
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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
    /**
     * 1.Webpack是属于Node的程序，Node环境下的环境变量，Webpack可以配置可以灵活读取
     * 2.但是index.js属于Webpack要构建的产物，如果里面也想读取环境变量。可以通过这个DefinePlugin定义一下
     * 3.通过这个DefinePlugin定义的变量只能在项目中的js文件中获取，不能在webpack.config.js中获取
     */
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        coreHR: JSON.stringify("i-form-x"),
        BASE_URL: JSON.stringify("http://localhost:3000")
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css"
    }),
    new CopyPlugin([
      {
        from: resolve("src/assets/export-template"),
        to: resolve("dist/export-template")
      }
    ]),
    new CleanWebpackPlugin()
  ]
})