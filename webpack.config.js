// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: './index.js',
//     module: {
//         rules: [
//           { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
//           {
//             test: /\.(png|svg|jpg|jpeg|gif)$/i,
//             type: "asset/resource",
//           },
//           {
//             test: /\.(woff|woff2|eot|ttf|otf)$/i,
//             type: "asset/resource",
//           },
//         ]
//       },
//       output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         clean: true,
//       },
//       mode: 'development',
//       plugins: [new HtmlWebpackPlugin()]
// };


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { main: './index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }]
      }
    ]
  },  
  plugins: [new HtmlWebpackPlugin({
    template: './index.html' 
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "static", to: "static" },
      ],
    })
  ]
};