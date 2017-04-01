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
        port: "9999"
    },
    devtool: "source-map",
    entry: {
        app: [ path.resolve(rootDir, "src", "app", "main") ],
        vendors: [ path.resolve(rootDir, "src", "scripts", "vendors") ]
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
                test: /\.scss$/,
                include: [ path.resolve(rootDir, "src", "app"), ],
                loaders: [ "css-to-string-loader", "css-loader", "sass-loader" ]
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loaders: ["html-withimg-loader", "pug-html-loader" ]
            },
            {
                test: /\.(?:png|jpe?g|svg)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=8192"
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
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.xlf$/,
                loader: "raw-loader"
            }
        ]
    },
    externals: {
        "jquery": "window.jQuery"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(rootDir, "build")
    },
    plugins: [
        new ChunkWebpack({
            filename: "vendors.bundle.js",
            minChunks: Infinity,
            name: "vendors"
        }),
        new HtmlWebpack({
            filename: "index.html",
            inject: "body",
            template: path.resolve(rootDir, "src", "index.html")
        })
    ],
    resolve: {
        extensions: [ ".ts", ".scss", ".js", ".css" ],
        alias: {
            "TweenMax": "gsap/tweenMax",
            "TimelineMax": "gsap/timelineMax"
        }
    }
};