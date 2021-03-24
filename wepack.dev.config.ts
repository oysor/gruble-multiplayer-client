import path from 'path'
import webpack, { EnvironmentPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import common from './webpack.common.config'

const config: webpack.Configuration = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new EnvironmentPlugin({
      // API_URL: "https://localhost:5001/chathub",
      API_URL: 'https://multiplayerapi.azurewebsites.net/chathub',
      DEBUG: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html',
    }),
  ],
})

export default config
