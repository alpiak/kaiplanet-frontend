/**
 * Created by qhyang on 2017/2/10.
 */
"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
    devtool: "inline-source-map",
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: "tslint",
                test: /\.ts$/
            },
            {
                exclude: /node_modules/,
                loader: "ts",
                test: /\.ts$/
            },
            {
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                test: /\.scss$/
            },
            {
                exclude: /node_modules/,
                loader: "pug-loader",
                test: /\.pug$/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('.', 'src')
    },
    tslint: {
        emitErrors: true
    }
};