/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devServer = {
    port: 4500,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: true,
    inline: true,
    compress: true,
    contentBase: '/',
};

module.exports = {
    entry: {
        bundle: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                },
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test:/\.js$/,
                loader: "source-map-loader"
            },
            // Scss compiler
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.s?css$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                },
            }
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[name].css"
        })
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    devServer
}
