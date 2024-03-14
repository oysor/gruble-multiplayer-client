import path from 'path'
import { Configuration, EnvironmentPlugin } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import common from './webpack.common.config'

const devServer: DevServerConfiguration = {
  compress: true,
  port: 4000,
  historyApiFallback: true,
  static: {
    directory: path.join(__dirname, 'build'),
  },
}

const config: Configuration = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devServer,
  devtool: 'inline-source-map',
  plugins: [
    new EnvironmentPlugin({
      API_URL: 'https://localhost:5001/chathub',
      DEBUG: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html',
      favicon: 'src/assets/icons/favicon.png',
    }),
  ],
})

export default config
