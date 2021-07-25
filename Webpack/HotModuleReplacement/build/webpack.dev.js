const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const devConfig = {
    mode: 'development',   //打包模式，默认为production，压缩代码。development 不压缩代码
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        compress: true,   //配置是否启用 gzip 压缩
        open: true,   //自动打开
        port: 8080,
        hot: true,
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin(),new BundleAnalyzerPlugin()],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'async',   //异步加载的模块才会被切割
            minSize: 20000,    //大于这个值的模块才会被切割
            minRemainingSize: 0,
            minChunks: 1,      //引入次数大于1才会被切割
            maxAsyncRequests: 30,     //按需加载时的最大并行请求数
            maxInitialRequests: 30,   //入口点的最大并行请求数
            enforceSizeThreshold: 50000,
            cacheGroups: {    //缓存组
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,  //那个文件夹下导入的模块会被分到一组
                    priority: -10,   //优先级
                    reuseExistingChunk: true,    //已经导入过的模块不会重复导入
                    name: '111.js'
                },
                default: {     //默认组
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    }
}

module.exports = merge(commonConfig, devConfig);