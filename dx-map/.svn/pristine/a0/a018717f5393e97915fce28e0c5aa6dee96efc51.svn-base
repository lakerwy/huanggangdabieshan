<template>
  <div>
    <my-map ref="mapCom" style="width:1500px;height:800px"></my-map>
  </div>
</template>

<script>
import MyMap from "@map/components/my-map/Map";

export default {
  components: {
    MyMap
  },
  mounted() {
    this.addGeoserverTIle();
    this.addGeoserverImage();
  },
  methods: {
    async addGeoserverImage() {
      let params = {
        type: "geoserver",
        url:
          "/geoserver/temp_data/wms",
        projection: "EPSG:4326",
        layers: "temp_data:WH_BDR_CHDS",
        crossOrigin:true, // 截图时启用
        imageOptions: { prop1: "1" }, // ol/layer/tile其他参数
        restOption: null, // WMS request parameters其他参数，用于扩展,
        id: "1" // 用于查找图层
      };
      await this.$refs.mapCom.map.addImageLayer(params);
      let layers = this.$refs.mapCom.map.getLayerByKey("id", "1");
      console.log(layers);
    },
    async addGeoserverTIle() {
      let params = {
        type: "geoserver",
        url:
          "/geoserver/gwc/service/wmts",
        projection: "EPSG:4490",
        layers: "china_data:province",
        matrixSet:"EPSG:4490",
        crossOrigin: true, // 截图时启用
        format:"image/png",
        id: "2" // 用于查找图层
      };
      await this.$refs.mapCom.map.addImageLayer(params);
      let layers = this.$refs.mapCom.map.getLayerByKey("id", "2");
      console.log(layers);
    }
  }
};
</script>