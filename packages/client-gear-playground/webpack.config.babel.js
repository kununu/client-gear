/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  entry: 'index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          fix: true,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'sasslint-loader',
        enforce: 'pre',
        options: {
          configFile: '../../.sass-lint.yml',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!nukleus)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|main\.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  autoprefixer,
                ];
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /nukleus\/dist\/.+\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
        ],
      },
      // if you want to test the distribution, just uncomment the lines below
      /* {
        test: /kununu-footer\/dist\/index.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
        ],
      },
      {
        test: /kununu-header\/dist\/index.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
        ],
      },
      {
        test: /kununu-logo\/dist\/index.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
        ],
      },
      {
        test: /kununu-overlay\/dist\/index.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
        ],
      }, */
      {
        test: /\.css$/,
        include: /node_modules\/(?!nukleus\/dist)/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /main\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  autoprefixer,
                ];
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
};
