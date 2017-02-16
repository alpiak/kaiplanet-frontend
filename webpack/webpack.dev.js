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
        vendor: [ path.resolve(rootDir, "src", "script", "vendor") ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "tslint-loader",
                enforce: "pre"
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.(?:png|jpg)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.scss$/,
                include: [ path.resolve(rootDir, "src", "app"), ],
                loaders: [ "css-to-string-loader", "css-loader", "sass-loader" ]
            },
            {
                test: /\.scss$/,
                include: [ path.resolve(rootDir, "src", "style"), ],
                loaders: [ "style-loader", "css-loader", "sass-loader" ]
            },
            {
                test: /\.css$/,
                exclude: /(?:node_modules|src\/app)/,
                loaders: [ "style-loader", "css-loader" ]
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: "pug-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "js-loader"
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
        extensions: [ ".js", ".ts", ".scss", ".css" ]
    }
};