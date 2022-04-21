window.global = {
  api: "http://192.168.99.188:9090", // 大屏后台地址
  liveApi: "http://192.168.179.35:18080", // 直播视频地址
  layout: "./layout/layout.json",
  view: {
    zoom: 10,
    center: [110.45, 31.58]
    // extent: [
    //   108.4873099667816,
    //   29.838872465791724,
    //   112.44228737676109,
    //   33.18745809150329
    // ]
  },
  layers: [
    {
      name: "底图",
      icon: "",
      data: [
        {
          type: "xyz",
          url:
            "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d9160cdd3e165f779df0909d33be966d",
          projection: "EPSG:3857"
        },
        {
          type: "ArcGIS",
          url:
            "http://192.168.99.56:6080/arcgis/rest/services/SNJ/sat_and_ano_map/MapServer"
        },
        {
          type: "ArcGIS",
          url:
            "http://192.168.99.56:6080/arcgis/rest/services/SNJ/river/MapServer"
        }
      ]
    }
  ],
  fireRankRange: [0, 5], // 森林火灾等级区间
  peopleRange: [0, 5], // 景区人流量区间,
  systems: {
    巡护管理系统: "http://203.83.62.63:8008/platform",
    应急通讯指挥系统: "http://203.83.62.63:8008/platform",
    周界视频监控系统: "http://203.83.62.63:8008/platform",
    林火预警监测系统: "http://203.83.62.63:8008/platform",
    水气环境监测系统: "http://203.83.62.63:8008/platform",
    科普科教系统: "http://203.83.62.63:8008/platform",
    红外摄像头动物信息智能提取系统: "http://203.83.62.63:8008/platform",
    搜索: "http://203.83.62.63:8008/platform",
    在线资源中心: "http://203.83.62.63:8008/platform",
    基础平台: "http://203.83.62.63:8008/platform"
  },
  thematicUrl: [
    {
      type: "arcgis",
      name: "动物分布点",
      url:
        "http://192.168.99.56:6080/arcgis/rest/services/SNJ/动物分布点/MapServer"
    },
    {
      type: "arcgis",
      name: "世界地质遗迹分布点",
      url:
        "http://192.168.99.56:6080/arcgis/rest/services/SNJ/世界地质遗迹分布点/MapServer"
    }
  ],
  XHGLMapURL:[
    {
      type: "arcgis",
      name: "网巡护路线服务",
      url:
        " http://192.168.99.56:6080/arcgis/rest/services/SNJ/patrol/MapServer"
    }
  ],
  warnInterval:10000,
};

/*
 * @Descripttion: 
 * @version: 1.0.1
 * @Author: 杜晓辉
 * @Date: 2021-06-29 12:42:22
 * @LastEditors: 杜晓辉
 * @LastEditTime: 2021-08-02 15:34:01
 */

/**
 * @Description:三维配置文件包括基础图层参数配置和基本的可配置参数设置
 * @author 杜晓辉
 * @date 2021/3/18 10:33:31
 */
window.EarthBaseConfig = {
  //初始化地图中心点配置
  //神农架
  initviewpoint: [110.557547, 31.221136, 47650],
  //重庆
  //initviewpoint: [106.5443289, 29.48862215, 2765],
  //初始化地图位置矩形区域位置配置
  //神农架
  initviewRectangle: [109.9346923, 31.294555, 110.97839355, 31.8658447],
  //重庆
  //initviewRectangle: [106.5315699577,29.4858670235, 106.5411400795,29.49399948127],
  Cesiumtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNWIzMTYyZS1kMmQyLTRkOTAtYmRhZC0yZjZhOTE2YzZmYTEiLCJpZCI6MTI2NDksInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjE1NDE0ODh9.0jXPnp2IJ0RJ2gwvok4ybt0aIbekgiKRJbi-ehThGO4",
  WMTSLayerImg: [
    {
      //影像底图
      url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=7b435c61bff7f77eb49206e10d6397bd",
      layer: 'img',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 15,
      index: 0,
      show: true
    },
    // {
    //     //矢量底图
    //     url: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=7b435c61bff7f77eb49206e10d6397bd",
    //         layer: 'img',
    //         style: 'default',
    //         tileMatrixSetID: 'w',
    //         format: 'tiles',
    //         maximumLevel: 18,
    //         index:0,
    //         show: true
    // },
    {
      url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=7b435c61bff7f77eb49206e10d6397bd",
      layer: 'cia',
      style: 'default',
      tileMatrixSetID: 'w',
      //subdomains: ["t0","t1","t2","t3","t4","t5","t6","t7"],
      format: 'tiles',
      maximumLevel: 18,
      index: 1,
      show: true
    },

    {
      //url:"http://192.168.99.56:6080/arcgis/rest/services/SNJ/sat_and_ano_map/MapServer/WMTS?",
      url: "http://192.168.99.56:6080/arcgis/rest/services/SNJ/sat_and_ano_map/MapServer/WMTS/tile/1.0.0/SNJ_sat_and_ano_map/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png",
      //url:"http://192.168.179.41:6080/arcgis/rest/services/SNJ/sat_map/MapServer/WMTS/tile/1.0.0/SNJ_sat_map/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png",
      //url:"http://192.168.99.56:6080/arcgis/rest/services/SNJ/sat_map/MapServer/WMTS?",
      layer: "SNJ_sat_map",
      tilingScheme: "EPSG:3857",
      style: "default",
      tileMatrixSetID: "default028mm",
      tileMatrixLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'], // 对应2.4中的tileMatrix Identifier属性
      format: "image/png",
      minimumLevel: 10,
      maximumLevel: 18,
      // rectangle:[109.93469238281253 ,31.29263405889953,110.97839355468753 ,31.863562548378976],http://192.168.179.41:6080/arcgis/rest/services/SNJ/dem/MapServer/WMTS?
      index: 2,
      show: true,
    },
    {
      url: "http://192.168.179.41:6080/arcgis/rest/services/SNJ/%E5%9B%BD%E5%AE%B6%E5%85%AC%E5%9B%AD%E8%BE%B9%E7%95%8C%E7%BA%BF/MapServer/WMTS?",
      layer: "SNJ_国家公园边界线",
      tilingScheme: "EPSG:3857",
      style: "default",
      tileMatrixSetID: "GoogleMapsCompatible",
      format: "image/png",
      maximumLevel: 19,
      // rectangle:[109.93469238281253 ,31.29263405889953,110.97839355468753 ,31.863562548378976],
      index: 3,
      show: true,
    },
    {
      url: "http://192.168.179.41:6080/arcgis/rest/services/SNJ/%E6%9E%97%E5%8C%BA%E8%BE%B9%E7%95%8C%E7%BA%BF/MapServer/WMTS?",
      layer: "SNJ_林区边界线",
      tilingScheme: "EPSG:3857",
      style: "default",
      tileMatrixSetID: "GoogleMapsCompatible",
      format: "image/png",
      maximumLevel: 19,
      // rectangle:[109.93469238281253 ,31.29263405889953,110.97839355468753 ,31.863562548378976],
      index:4,
      show: true,
    },
  ],
  ArGISLayerImg: [
  ],
  EarthDEM: [

    /**
     * 神农架三维地形服务
     */
    {
      url: "http://127.0.0.1:8280/BigMap_Tiles",
      style: "",
      name: "BigMap_dem",
      show: true,
    }
  ],
  TilesModel: [
  ]
}





