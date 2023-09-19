const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

const prodWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(s*)css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                ]
            },
            {
                test: /\.(s*)css$/i,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: '[local]_[hash:base64:5]'
                                    },
                                }
                            }]
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                        }
                    }
                ]
            },
            {
                test: /\.(s*)css$/i,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [["postcss-preset-env"]],
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            additionalData: '@import "./src/styles/_variables.scss";'
                        }
                    }
                ],
            }
        ]
    },

    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
});

module.exports = prodWebpackConfig;

