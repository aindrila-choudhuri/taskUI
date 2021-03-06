var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        __dirname + "/public/app.jsx"
    ],
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 18192
                    }
                  }
                ]
              }
        ]
    },
    devtool: "source-map"

}
