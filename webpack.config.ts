const path = require("path");
const publicPath = path.join(__dirname, "public");
const entryPath = path.join(__dirname, "src/index.tsx");

module.exports = {
  mode: "development", //production
  entry: [entryPath],
  output: {
    path: publicPath,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: publicPath,
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
