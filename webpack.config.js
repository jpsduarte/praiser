var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    resolve: {    
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.tsx', '.jsx']
    },
    devtool: 'cheap-module-source-map',    
    module: {
        // rules: [
        //     { test: /\.css$/, use: 'css-loader' }
        // ],
        loaders: [
            {
                test: /\.js?/,
                //exclude: /(node_modules)/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
              {
                test: /\.css$/,
                loader: extractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: extractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },
    node: {
         fs: 'empty'
         //console: true        
     },
    target: 'web',
    plugins: [
         //new webpack.ExternalsPlugin('commonjs')
         new extractTextPlugin("app.css", { allChunks: true })
    ]//,
    //   externals:{
    //       fs:    "commonjs fs",
    //       path:  "commonjs path"
    //   }
};

module.exports = config;