/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CssLoader = require.resolve('css-loader')
const StyleLoader = require.resolve('style-loader'); 
const Dotenv = require('dotenv-webpack');  

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: resolve(__dirname, "./src/index"),
  devtool:
    process.env.NODE_ENV === "production"
      ? "hidden-source-map"
      : "eval-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  devServer: {
    port:  8080,
    historyApiFallback: true,
    allowedHosts: "all"
  },
  output: {
    path: resolve(__dirname, "dist"), 
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [StyleLoader,
          {
          loader: CssLoader,
          options: {
            importLoaders: 1,
            modules: true, 
          },          
        },{
            loader: require.resolve('postcss-loader'),
            options: { 
                postcssOptions: {plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', 
                        ],
                        flexbox: 'no-2009',
                    }),
                    require('postcss-modules-values'),
                ],}
            },
        }, ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[contenthash][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  plugins: [ 
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "404.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};

