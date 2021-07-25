const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',   //生产模式
    devtool: 'cheap-module-source-map',
}

module.exports = merge(commonConfig, prodConfig);
