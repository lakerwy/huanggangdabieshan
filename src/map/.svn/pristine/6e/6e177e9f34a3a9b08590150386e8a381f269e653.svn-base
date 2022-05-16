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
    this.addImage();
  },
  methods: {
    async addImage() {
      let params = {
        type: "image",
        url: require("./../data/r1.png"),
        projection: "EPSG:3857", // 默认为map定义的坐标系
        imageExtent: [7895240.91, 1784931.04, 15002527.77, 7087262.07],
        imageOptions: {
          opacity: 0.5
        }
      };
      await this.$refs.mapCom.map.addImageLayer(params);
    }
  }
};
</script>
