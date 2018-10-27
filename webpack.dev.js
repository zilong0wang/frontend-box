const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './app/dist',
        historyApiFallback: true,
        compress: true,
        port: 9000
    },
    // watch: true,
    /* watchOptions: {
        // aggregateTimeout: 300,
        // poll: 1000,
        ignored: /node_modules/
    } */
});