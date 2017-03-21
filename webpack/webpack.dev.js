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
        vendor: [ path.resolve(rootDir, "src", "scripts", "vendor") ]
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
                include: [ path.resolve(rootDir, "src", "app") ],
                loaders: [ "css-to-string-loader", "css-loader", "sass-loader" ]
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loaders: ["html-withimg-loader", "pug-html-loader" ]
            },
            {
                test: /\.(?:png|jpe?g|svg|gif|eot|woff2?|ttf)$/,
                exclude: [ path.resolve(rootDir, "node_modules", "material-design-icons") ],
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(rootDir, "src", "style"),
                    path.resolve(rootDir, "node_modules")
                ],
                loaders: [ "style-loader", "css-loader", "sass-loader" ]
            },
            {
                test: /\.css$/,
                exclude: /src\/app/,
                loaders: [ "style-loader", "css-loader" ]
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.(?:xlf|svg)$/,
                include: [
                    path.resolve(rootDir, "node_modules", "material-design-icons"),
                    path.resolve(rootDir, "src", "locale")
                ],
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
        extensions: [ ".ts", ".scss", ".pug", ".js", ".css", ".xlf" ],
        alias: {
            "TweenMax": "gsap/tweenMax",
            "TimelineMax": "gsap/timelineMax",
            "jquery-ui": "jquery-ui/ui"
        }
    }
};