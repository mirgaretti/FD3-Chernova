const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = { 
    entry: "./App.js",
    output: { 
        path: path.resolve(__dirname), 
        filename: "bundle.js" 
    }, 
    devtool: 'source-map',
    module: { 
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }            
        ]
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname), 
        },
        historyApiFallback: true,
    },
};
