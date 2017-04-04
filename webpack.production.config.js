const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'https://linkoforigin.github.io/Just-for-KIX/dist/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.png|jpg|xml/,
                loader: 'file-loader?name=[name].[ext]',
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ]
    },
};
