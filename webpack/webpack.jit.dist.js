/**
 * Created by qhyang on 2017/4/13.
 */

"use strict";

const HtmlWebpack = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const BannerWebpack = require("banner-webpack-plugin");
const UglifyJSWebpack = require('uglifyjs-webpack-plugin');

const rootDir = path.resolve(__dirname, "..");

module.exports = {
    entry: {
        coreJS: [ "core-js" ],
        app: [ path.resolve(rootDir, "src", "main-jit") ],
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
                loaders: [ "babel-loader?presets[]=es2015", "ts-loader", "angular-router-loader" ]
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
                test: /\.json$/,
                include: [ path.resolve(rootDir, "src", "scripts", "emojis.json") ],
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
        "jquery": "window.jQuery",
        "TweenLite": "window.TweenLite"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(rootDir, "dist")
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
            template: path.resolve(rootDir, "src", "index-jit.html")
        }),
        new BannerWebpack({
            chunks: {
                app: {
                    beforeContent: `//
                    (function() {   
                        if (window.$ && window.TweenLite) {
                            var $counter = $(".app-loading__counter");
                            var loading = {
                                progress: $counter.data("loaded-percent") || 0
                            };
                            
                            $counter.data("loaded-percent", 80);
                            TweenLite.to(loading, 0.5, {
                                progress: 80,
                                onUpdate: function() {
                                    $(".app-loading__counter h1").text(loading.progress.toFixed() + "%");
                                    $(".app-loading__counter hr").width(loading.progress.toFixed() + "%");
                                }
                            });
                        }
                    }());
                `},
                vendors: {
                    beforeContent: `//
                    (function() {    
                        if (window.$ && window.TweenLite) {
                            var $counter = $(".app-loading__counter");
                            var loading = {
                                progress: $counter.data("loaded-percent") || 0
                            };
                            
                            $counter.data("loaded-percent", 20);
                            TweenLite.to(loading, 0.5, {
                                progress: 20,
                                onUpdate: function() {
                                    $(".app-loading__counter h1").text(loading.progress.toFixed() + "%");
                                    $(".app-loading__counter hr").width(loading.progress.toFixed() + "%");
                                }
                            });
                        }
                    }());
                `}
            }
        }),
        new UglifyJSWebpack()
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