/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: 'index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      __dirname,
      path.resolve(__dirname),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../kununu-footer/node_modules'),
      path.resolve(__dirname, '../kununu-header/node_modules'),
      path.resolve(__dirname, '../kununu-logo/node_modules'),
    ],
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   query: {
      //     fix: true,
      //   },
      // },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loader: 'sasslint-loader',
      //   enforce: 'pre',
      //   options: {
      //     configFile: '../../.sass-lint.yml',
      //   },
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!nukleus)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|main\.scss/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              context: path.resolve(__dirname, 'context'),
              localIdentName: '[path][name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              options: {
                plugins () {
                  return [
                    autoprefixer,
                  ];
                },
              },
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              context: path.resolve(__dirname, 'context'),
              localIdentName: '[path][name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins () {
                return [
                  autoprefixer,
                ];
              },
            },
          },
        ],
      },
      {
        test: /main\.scss$/,
        exclude: /node_modules/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins () {
                return [
                  autoprefixer,
                ];
              },
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
};
