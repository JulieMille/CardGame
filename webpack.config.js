// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

// module.exports = {
//     entry: { main: "./index.ts" },
//     output: {
//         path: path.resolve(__dirname, "dist"),
//         filename: "bundle.js",
//         publicPath: "",
//     },
//     mode: "development",
//     devServer: {
//         static: path.resolve(__dirname, "./dist"),
//         compress: true,
//         port: 8080,
//         open: true,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: "babel-loader",
//                 exclude: "/node_modules/",
//             },
//             {
//                 test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
//                 type: "asset/resource",
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     {
//                         loader: "css-loader",
//                     },
//                 ],
//             },
//             {
//                 test: /\.ts$/,
//                 use: "ts-loader",
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     resolve: {
//         extensions: [".ts", ".js"],
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: "./index.html",
//         }),
//         new CleanWebpackPlugin(),
//         new MiniCssExtractPlugin(),
//         new CopyPlugin({
//             patterns: [{ from: "static", to: "static" }],
//         }),
//     ],
// };

import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = path.resolve();

export default {
    entry: { main: "./index.ts" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "",
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [{ from: "static", to: "static" }],
        }),
    ],
};
