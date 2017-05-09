
var webpack = require("webpack");
var path = require("path");
var sassVars = path.resolve('src/styles/vars.json');

module.exports = {
  entry: {
    app: path.resolve('./src/Application.jsx'),
  },
  output: {
    path: __dirname + "/",
    filename: 'bundle.[name].js'
  },
  resolve: {
    extensions: [".js", ".es6", ".jsx", "index.js", "index.jsx", ".json", "index.json", ".css", ".scss"],
    modules: ["node_modules"],
    alias: {}
  },
  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: 'false'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ "es2015", "react", "stage-0", "stage-1" ],
          plugins: [
            ["transform-runtime", {
              "polyfill": false,
              "regenerator": true
            }],
            "transform-decorators-legacy"
          ]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          // { loader: 'postcss-loader', options: {} },
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
        //loader: 'style!css!sass'
      },
      { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/gif" },
      { test: /\.svg$/, loader: "url-loader?mimetype=image/svg+xml" },
    ]
  },
  externals: {}
}
