let path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  // 选项...
  parallel:false,
  lintOnSave: "warning",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".js", ".vue", ".less"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@map": path.resolve(__dirname, "./src/map"),
        "@earth": path.resolve(__dirname, "./src/earth"),
        _com: path.resolve(__dirname, "./src/components"),
        _api: path.resolve(__dirname, "./src/api"),
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "node_modules/cesium/Build/Cesium/Workers", to: "Cesium/Workers" },
          {
            from: "node_modules/cesium/Build/Cesium/ThirdParty",
            to: "Cesium/ThirdParty",
          },
          { from: "node_modules/cesium/Build/Cesium/Assets", to: "Cesium/Assets" },
          { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Cesium/Widgets" },
        ],
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify(""),
      }),
    ],
    module: {
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve('@open-wc/webpack-import-meta-loader'),
        },
      ],
      // unknownContextRegExp: /^.\/.*$/
    },
  },
  // configureWebpack: (config) => {
  //   Object.assign(config, {
  //     // 开发生产共同配置
  //     resolve: {
  //       extensions: [".ts", ".js", ".vue", ".less"],
  //       alias: {
  //         "@": path.resolve(__dirname, "./src"),
  //         "@map": path.resolve(__dirname, "./src/map"),
  //         "@earth": path.resolve(__dirname, "./src/earth"),
  //         _com: path.resolve(__dirname, "./src/components"),
  //         _api: path.resolve(__dirname, "./src/api"),
  //       },
  //     },
  //   });
  // },
  publicPath: "./", //空字符串 ('') 或是相对路径 ('./')
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.99.127:9999",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/video": {
        target: "http://192.168.99.127:18080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/video": "",
        },
      },
      // 
    },
  },
};
