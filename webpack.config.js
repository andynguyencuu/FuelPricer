const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: ['babel-polyfill', path.resolve('fuelpricer/frontend/src/index.js')],
    output: {
        // options related to how webpack emits results

        // where compiled files go
        path: path.resolve(__dirname, "fuelpricer/frontend/static/frontend/public/"),

        // 127.0.0.1/static/frontend/public/ where files are served from
        publicPath: "/fuelpricer/frontend/static/frontend/public/",
        filename: 'main.js',  // the same one we import in index.html
    },

    devServer: {
        contentBase: '/fuelpricer/frontend/templates/',
        // publicPath: "fuelpricer/frontend/static/frontend/public/",
        inline: true,
        hot: true,
        watchContentBase: true
    },
    externals: [
        {"react-native": true,}
],
module: {
    // configuration regarding modules
    rules: [
        {
                // regex test for js and jsx files
                test: /\.(js|jsx)?$/,
                // don't look in the node_modules/ folder
                exclude: /node_modules/,
                // for matching files, use the babel-loader
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-react", "@babel/preset-env"]}
                },
            },
            {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },


        ],
    },
};