var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: {
        sayHello: './src/lambdas/sayHello.js',
        message: './src/lambdas/message.js'
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, './build'),
        libraryTarget: "var",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2017', 'stage-0']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};