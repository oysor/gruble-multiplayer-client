import path from 'path'
import webpack, { EnvironmentPlugin } from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import common from './webpack.common.config'

const config: webpack.Configuration = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '',
    clean: true,
  },
  plugins: [
    new EnvironmentPlugin({
      API_URL: 'https://multiplayerapi.azurewebsites.net/chathub',
      DEBUG: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/icons/favicon.png',
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
  ],
})

export default config
