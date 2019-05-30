const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const SRC_DIR = './src';
const DIST_DIR = './dist';

module.exports = {
    context: __dirname,
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, DIST_DIR),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/images',
                        }
                    }
                ]
            },
            {
                test: /page\.html$|content\.html/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: './pages',
                        }
                    }
                ]
            },
        ]
    },
    mode: 'development',
    devServer: {
        contentBase: DIST_DIR,
        compress: true,
        port: 9000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(SRC_DIR, './index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        }),
        new CopyPlugin([
            {
                from: 'src/assets/images',
                to: './assets/images'
            }
        ])
    ]
};
