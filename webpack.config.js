const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: {
      main: "./src/main.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name]-[chunkhash].js"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      })
    ],
    devServer: {
      hot: false,
      liveReload: false
    }
  }
}
