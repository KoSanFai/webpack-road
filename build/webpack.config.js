const config = require('../config')

const path = require('path')
const webpack = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require("vue-loader/lib/plugin")
console.log("NODE_TEST_ENV_ENV", process.env.NODE_TEST_ENV_ENV)
/**
 * 通过cross-env设置的环境变量 只能在webpack.config.js中通过process.env获取
 */
function resolve(dir) {
  // 2个segment之间有且只有一个/分隔符，无论你输入的segment两侧是否带有/，第一个segment 左侧和最后一个右侧的/会被保留
  return path.join(__dirname, "..", dir)
}
// console.log(process.env.NODE_TEST_ENV, "NODE_TEST_ENV")
// console.log(process.env, "N/V") // Able to get process.env
// console.log(process.env.env, "N/V") // Unable to get process.env.env

const webpackConfig = (env, args) => { 
  // console.log("env", args)
  // 要获取参数要从args拿，从env无法拿到
  return {
    mode: "development",
    entry: {
      main: resolve("src/index.js")
    },
    output: {
      path: resolve("dist"),
      filename: "[name].[hash:8].js", // `js/` 是为了新建一个命名为js的文件夹来放置js文件
      chunkFilename: "[name].[chunkhash:8].js",
      publicPath: "/" // 不要轻易修改
    },
    devtool: "inline-source-map",
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: resolve("dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: args.env === "dev" ? ["@babel/preset-env"] : []
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                fallback: {
                  loader: "file-loader",
                  options: {
                    name: "img/[name][hash:8].[ext]"
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: "cache-loader"
            },
            {
              loader: "vue-loader",
              options: {
                preserveWhitespace: true
              }
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
          coreHR: JSON.stringify("i-form-x"),
          BASE_URL: JSON.stringify("http://localhost:3000")
        }
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: resolve("index.html")
      }),
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: [".js", ".jsx", ".vue"],
      modules: [resolve("src"), resolve("node_modules")],
      alias: {
        "@": resolve("src")
      }
    }
  }
}

module.exports = webpackConfig