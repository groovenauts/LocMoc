var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './assets/app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) 
      }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: "url-loader?mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'index.js', '.json'],
    modules: ["node_modules"]
  },
  devtool: 'inline-source-map',
}
