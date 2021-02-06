const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const config = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: { lazy: true },
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'NAME_PLACEHOLDER',
      filename: 'remoteEntry.js',
      remotes: {},
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
      exposes: {},
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
      hash: true,
    }),
  ].filter(Boolean),
  devServer: { port: PORT_PLACEHOLDER },
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:PORT_PLACEHOLDER/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

module.exports = function (env, argv) {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.plugins.push(new ReactRefreshPlugin());
    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.join(__dirname, 'src'),
      use: [
        {
          loader: 'babel-loader',
          options: { plugins: ['react-refresh/babel'] },
        },
        {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
      ].filter(Boolean),
    });
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
