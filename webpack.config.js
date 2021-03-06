const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    entry: './examples/main.tsx',
    output: {
        filename: './dist/bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.svg']
    },

    module: {
        loaders: [
            {test: /\.svg$/, loader: 'url'},
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader?configFileName=tsconfig.examples.json'}
        ],
        preLoaders: [
            {test: /\.js$/, loader: 'source-map-loader'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Pure Canvas Examples'
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true
        })
    ]
};
