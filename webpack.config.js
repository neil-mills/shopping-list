const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html'
});

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [htmlPlugin]
};