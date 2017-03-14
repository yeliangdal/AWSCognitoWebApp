module.exports =  {
  resolve: {
    extensions: ['.js', 'jsx', ''],
  },
  devtool: "cheap-eval-source-map",
  entry: ['./src/main.js'],
  output: {
    path: 'dist',
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
