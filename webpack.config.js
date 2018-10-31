const webpack = require("webpack");
const path = require("path");

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        inline: false,
        publicPath: "/",
        contentBase: "./dist"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx$|\.js$/,
                loaders: ["babel-loader"],
                exclude: /node_modules/,
                include: path.resolve(__dirname, "./src")
            },
            {
                test: /\.scss$|\.sass$|\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};

module.exports = config;
