const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'client/index.js')],
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ],
  },
  devServer: {
    publicPath: '/build',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/public/'),
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true
      },
      '/api/spotify': {
        target: 'http://localhost:3000',
        // changeOrigin: true
      },
      '/login': {
        target: 'http://localhost:3000',
        // changeOrigin: true
      },
      '/settings': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}