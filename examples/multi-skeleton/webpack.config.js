/**
 * @file skeleton conf
 * @author panyuqi (pyqiverson@gmail.com)
 */

/* eslint-disable fecs-no-require */

'use strict';

const path = require('path');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SkeletonWebpackPlugin = require('../../src');

function resolve(dir) {
    return path.join(__dirname, dir);
}

let webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: true
        })
    },
    devtool: false,
    plugins: [

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),

        new SkeletonWebpackPlugin({
            webpackConfig: require('./webpack.skeleton.conf'),
            quiet: true,
            minimize: true,
            router: {
                mode: 'history',
                routes: [
                    {
                        path: '/page1',
                        skeletonId: 'skeleton1'
                    },
                    {
                        path: '/page2',
                        skeletonId: 'skeleton2'
                    }
                ]
            }
        }),

        new HtmlWebpackPlugin({
            filename: utils.assetsPath('../index.html'),
            template: path.join(__dirname, './index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ]
});

module.exports = webpackConfig;
