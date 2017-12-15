var path = require("path");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = function (env) {

    const _plugins = [];
    if (env === 'analyzer') {
        _plugins.push(new BundleAnalyzerPlugin());
    }

    return {
        entry: {
            tyble: [
                "./src/tyble/index.ts",
            ]
        },

        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].js",
            library: 'tyble',
            libraryTarget: 'umd'
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js"]
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
                    exclude: /node_modules/
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
        }
    };

    plugins: _plugins

};
