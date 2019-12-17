const path = require('path')
const root = path.resolve(__dirname)

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'nested',
                includePaths: [
                  path.join(root, 'src', 'scss')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(html|png|jpe?g|gif)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  }
}
