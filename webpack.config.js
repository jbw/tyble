var path = require("path");
//const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

var config = {

  entry: {
    "tyble": [
      "./src/components/index.ts",
    ],
  },

  devServer: {
    historyApiFallback: true,
    port: 3001,
    open: false,
    publicPath: '/'
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    library: 'tyble',
    libraryTarget: 'umd'
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
  }
}


module.exports = config;
