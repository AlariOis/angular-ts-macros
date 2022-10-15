const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "PATH": JSON.stringify(process.env.Path)
    })
  ]
}
