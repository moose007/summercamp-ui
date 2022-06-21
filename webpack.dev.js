const path = require('path');
const webpack = require('webpack')
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development'),
        'API_URL': JSON.stringify('http://localhost:8080'),
        'CONSOLE_BASE_URL': JSON.stringify('http://localhost:9000'),
      }
    })
  ],
  devServer: {
    contentBase: "./dist",
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    open: true,

    proxy: {
      "/api": {
        "changeOrigin": true,
        "cookieDomainRewrite": "localhost",
        "target": "http://localhost:8080",
          onProxyReq: proxyReq => {
            // Browers may send Origin headers even with same-origin
            // requests. To prevent CORS issues, we have to change
            // the Origin to match the target URL.
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', "http://localhost:8080");
            }
          }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/base.css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css'),
          path.resolve(__dirname, 'node_modules/mapbox-gl/dist/mapbox-gl.css'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css')
        ],
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});
