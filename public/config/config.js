window.globalUrl = {
  HOME_API: "/api",
  VideoUrl: "/video",
  FTP_URL: "http://192.168.250.118:8088/files/",
  kkfileUrl: "http://192.168.99.127:8012/onlinePreview?url=",
  Title: "黄冈大别山世界地质公园综合管理信息平台",
};

window.global = {
  view: {
    zoom: 11,
    center: [115.472, 30.98126],
  },
  layers: [
    {
      data: [
        {
          type: "xyz",
          url:
            "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=c96efe76d453095433f941beb574e921",
          projection: "EPSG:3857",
        },
        // {
        //   type: "ArcGIS",
        //   url:
        //     "http://192.168.99.56:6080/arcgis/rest/services/DBS/行政区划/MapServer",
        // },
        // {
        //   type: "ArcGIS",
        //   url:
        //     "http://192.168.99.56:6080/arcgis/rest/services/DBS/基础图层/MapServer",
        // },
        // {
        //   type: "ArcGIS",
        //   url:
        //     "http://192.168.99.56:6080/arcgis/rest/services/DBS/地质公园景点/MapServer",
        // },
        {
          type: "xyz",
          url:
            "http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=c96efe76d453095433f941beb574e921",
          projection: "EPSG:3857",
        },
      ],
    },
    {
      isEarth: true,
      data: [
        {
          type: "xyz",
          url:
            "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=c96efe76d453095433f941beb574e921",
          projection: "EPSG:3857",
        },
        {
          type: "ArcGIS",
          url:
            "http://192.168.99.56:6080/arcgis/rest/services/DBS/行政区划/MapServer",
        },
      ],
    },
  ],
  // terrain: {
  //   url: "data/DBS_Terrain",
  // },
};
