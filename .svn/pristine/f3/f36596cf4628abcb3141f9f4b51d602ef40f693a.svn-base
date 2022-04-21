/*
 * @Author: 任继民
 * @Date: 2021-03-02 15:50:31
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-12 12:33:02
 * @Description:
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  outputDir: "forest_display_web",
  publicPath: "./",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  devServer: {
    //port: 8099,
    proxy: {
      "/api": {
        target: "http://192.168.99.210:9999",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  configureWebpack: {
    output: {
      sourcePrefix: " "
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        "@map": path.resolve(__dirname, "dx-map/map"),
        "@": path.resolve(__dirname, "src"),
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" }
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Assets"), to: "Assets" }
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" }
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, "ThirdParty/Workers"),
          to: "ThirdParty/Workers"
        }
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./")
      })
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px", //需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 1060, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitPrecision: 5, //单位转换后保留的精度
            propList: [
              //能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", //字体使用的视口单位
            selectorBlackList: [], //需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, //设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, //媒体查询里的单位是否需要转换单位
            replace: true, //是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/ //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      }
    }
  }
};
