<template>
  <div class="mapContainer">
    <my-map ref="mapCom" @ready="init">
      <div v-for="(item, name, index) in vectorDataSource" :key="index">
        <MyMapVectorJson
          :ref="name"
          :id="item.id"
          :name="item.name"
          :dataSource="item.dataSource"
          :styles="item.styles"
          :hoverStyles="item.hoverStyles"
          :zindex="item.zindex"
          :isFit="item.isFit"
          :fitOption="item.fitOption"
          @click="handleClick"
        ></MyMapVectorJson>
      </div>
    </my-map>
  </div>
</template>

<script>
import MyMap from "@map/components/my-map/Map";
import MyMapVectorJson from "@map/components/my-map-vector/Json";
import * as mapHandler from "../../park_map/mapHanlder";

export default {
  name: "mapCon",
  components: {
    MyMap,
    MyMapVectorJson,
  },
  data() {
    return {
      vectorDataSource: {},
      selectFeature: null,
    };
  },
  methods: {
    init() {
      // 行政区划
      let region = mapHandler.getRegionData();
      if (region) {
        this.vectorDataSource[region.id] = region;
      }
    },
  }
}
</script>

<style lang="less" scoped>
.mapContainer {
  width: 100%;
  height: 100%;
  border: 1px solid;
}

</style>