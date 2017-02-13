/**
 * Created by qhyang on 2017/2/10.
 */

"use strict";

const HtmlWebpack = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;

const rootDir = path.resolve(__dirname, "..");

module.exports = {
    devServer: {
        contentBase: path.resolve(rootDir, "dist"),
    },
    devtool: "source-map",
    entry: {
        app: [ path.resolve(rootDir, "src", "app", "main") ],
        vendor: [ path.resolve(rootDir, "src", "vendor") ]
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: "tslint-loader",
                test: /\.ts$/,
                enforce: "pre"
            },
            {
                exclude: /node_modules/,
                loader: "ts-loader",
                test: /\.ts$/
            },
            {
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                test: /\.scss$/
            },
            {
                exclude: /node_modules/,
                loader: "pug-loader",
                test: /\.pug$/
            }
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(rootDir, "build")
    },
    plugins: [
        new ChunkWebpack({
            filename: "vendor.bundle.js",
            minChunks: Infinity,
            name: "vendor"
        }),
        new HtmlWebpack({
            filename: "index.html",
            inject: "body",
            template: path.resolve(rootDir, "src", "index.html")
        })
    ],
    resolve: {
        extensions: [ '.js', '.ts' ]
    }
};