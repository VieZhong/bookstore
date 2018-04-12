const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, '../back_end_koajs/apps/bookstore');
const APP_PATH = path.resolve(ROOT_PATH, 'app');


module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    //enable dev source map
    // devtool: 'eval-source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [APP_PATH, "node_modules"]
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [APP_PATH],
            enforce: "post",
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["react", "env"],
                    plugins: ["transform-object-rest-spread", "syntax-dynamic-import"],
                }
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ["css-loader", {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('cssnano')({
                                preset: 'default',
                            }),
                            require('autoprefixer')({
                                browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                            })
                        ]
                    }
                }, "sass-loader"]
            })
        }]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            // compress: true,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new CopyWebpackPlugin([{
            from: 'node_modules/react/dist/react.min.js',
            to: 'lib/'
        }, {
            from: 'node_modules/react-dom/dist/react-dom.min.js',
            to: 'lib/'
        }]),
        new HtmlwebpackPlugin({
            title: 'My Bookstore'
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'lib/react.min.js',
                'lib/react-dom.min.js'
            ],
            append: false
        }),
        new ExtractTextPlugin("lib/plugin.css")
    ]
}