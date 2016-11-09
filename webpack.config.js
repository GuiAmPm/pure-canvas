const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/main.tsx',
    output: {
        filename: './dist/bundle.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.svg']
    },

    module: {
        loaders: [
            {test: /\.svg$/, loader: 'url'},
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ],
        preLoaders: [
            {test: /\.js$/, loader: 'source-map-loader'}
        ]
    },

    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Pure Canvas Examples'
        }),
    ]
};