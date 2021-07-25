const path = require('path');  //路径解析
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',  //入口文件
    /*是对下面这句的简写
    {
        main: './src/index.js'
    }
    */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,  //node_module里的代码不用考虑
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        useBuiltIns: 'usage',
                    }]]
                }
            },
            //     {
            //     test: /\.(jpg|png|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'images/',
            //         }
            //     },
            // },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        // 模板文件
        template: 'src/index.html',
    }), new CleanWebpackPlugin()],
    output: {             //出口文件
        filename: '[name].js',   //文件名
        path: path.resolve(__dirname, '../dist')  //绝对路径__dirname，dist目录下
    },

}