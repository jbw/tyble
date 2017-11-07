var path = require("path");
//const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

var config = {

  entry: {
    app: [
      __dirname + "/index.tsx",
    ],
  },

  devServer: {
    historyApiFallback: true,
    port: 3001,
    open: false,
    publicPath: '/'
  },

  output: {
    path: path.resolve("./dist"),
    publicPath: './dist/',
    filename: "bundle.js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
   /* alias: {
      containers: srcPath('components/containers'),
      components: srcPath('components'),
    },*/
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
}


module.exports = config;