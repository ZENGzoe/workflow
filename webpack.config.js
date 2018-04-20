var CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var minify = process.env.ENV == 'prod'; //是否压缩

module.exports = {
    mode : process.env.ENV == 'prod' ? 'production' : 'development',
    entry : {
        index : './src/js/index.js'
    },
    output : {
        path : __dirname + '/dist',
        filename : 'js/[name].js'
    },
    module : {
        rules : [{
            test : /\.(css|scss)$/,
            use : ExtractTextWebpackPlugin.extract({
                use : [
                    'css-loader?-url&-reduceTransforms',
                    'sass-loader',
                    'postcss-loader'
                ]
            })
        },{
            test : /\.js$/,
            exclude : /node_modules/,
            loader : 'babel-loader'
        }]
    },
    plugins : [
        new CleanWebpackPlugin('./dist'),
        new ExtractTextWebpackPlugin('css/[name].css'),
        new webpack.ProvidePlugin({
            $ : '../lib/zepto.js'
        }),
        new CopyWebpackPlugin([
            {
                from : './src/img',
                to : 'img',
                ignore : ['.gitkeep']
            }
        ]),
        new HtmlWebpackPlugin({
            inject : false,
            minify : minify ? {
                collapseWhitesspace : true,
                minifyCSS : true,
                minifyJS : true ,
                removeComments : true
            } : false,
            template : './src/index.html'
        })
    ],
    devtool: 'source-map'
}



