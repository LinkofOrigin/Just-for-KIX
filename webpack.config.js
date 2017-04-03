const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['react-hot-loader', 'babel-loader'],
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
