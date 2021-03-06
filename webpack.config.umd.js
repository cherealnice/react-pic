const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  entry: [
    'core-js/library/fn/array/reduce',
    './lib/index.js',
  ],
  output: {
    libraryTarget: 'umd',
    library: 'Pic',
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: {
      root: 'React',
      amd: 'react',
      commonjs2: 'react',
      commonjs: 'react',
    },
    'react-addons-shallow-compare': {
      root: ['React', 'addons', 'shallowCompare'],
      amd: 'react-addons-shallow-compare',
      commonjs2: 'react-addons-shallow-compare',
      commonjs: 'react-addons-shallow-compare',
    },
  },
};

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }));
}

module.exports = config;
