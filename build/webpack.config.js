const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require("vue-loader/lib/plugin")

const config = require('../config')

/**
 * 通过cross-env设置的环境变量 只能在webpack.config.js中通过process.env获取
 */
console.log("NODE_ENV_TEST", process.env.NODE_ENV_TEST)

function resolve(dir) {
  // 2个segment之间有且只有一个/分隔符，无论你输入的segment两侧是否带有/，第一个segment 左侧和最后一个右侧的/会被保留
  return path.join(__dirname, "..", dir)
}


const webpackConfig = {
    entry: {
      main: resolve("src/index.js")
    },
    output: {
      path: resolve("dist"),
      filename: "js/[name].[hash:8].js", // `js/` 是为了新建一个命名为js的文件夹来放置js文件
      chunkFilename: "js/[name].[chunkhash:8].js",
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
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        // {
        //   test: /\.scss$/,
        //   use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
        // },
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
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'media/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[hash:8].[ext]'
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
                compilerOptions: {
                  preserveWhitespace: false
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
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


module.exports = webpackConfig