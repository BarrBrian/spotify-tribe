const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js',
  },
  mode: NODE_ENV,
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
    publicPath: '/build/',
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}