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
        extensions: [".ts", ".tsx", ".js", ".css"],
        /* alias: {
           containers: srcPath('components/containers'),
           components: srcPath('components'),
         },*/
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                },
                {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]

    },
}


module.exports = config;
