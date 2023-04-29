const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  // main entry point
  entry: "./src/index.tsx",

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // Enable source maps for better debugging
  devtool: "source-map",

  // Resolve file extensions
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      fs: false,
      util: require.resolve("util/"),
      constants: require.resolve("constants-browserify"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      publicPath: "/",
      template: "./public/index.html",
      inject: false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],

  // Use webpack-dev-server for development
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
