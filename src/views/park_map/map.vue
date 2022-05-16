<template>
  <div>
    <my-map ref="mapCom" @ready="init"  @nullselect="clearSelectFeature">
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
      <MyMapPopup ref="popup">
        <PopupInfo v-if="info" :data="info" :selectId="info ? info.id : null" @close="clearSelectFeature"></PopupInfo>
      </MyMapPopup>
    </my-map>
  </div>
</template>

<script>
import MyMap from "@map/components/my-map/Map";
import MyMapVectorJson from "@map/components/my-map-vector/Json";
import MyMapPopup from "@map/components/my-map-overlay/Popup";
import PopupInfo from "./popup/index.vue";
// import * as mapHandler from "./mapHanlder";

export default {
  components: {
    MyMap,
    MyMapVectorJson,
    MyMapPopup,
    PopupInfo,
  },
  data() {
    return {
      vectorDataSource: {},
      selectFeature: null,
    };
  },
  mounted() {},
  watch: {
    selectFeature(newVal, oldVal) {
      // 样式还原
      if (oldVal) {
        let vm = oldVal._layer._vm;
        vm.setFeatureStyle(oldVal, vm.styles);
      }

      // 设置选中样式
      if (newVal) {
        let vm = newVal._layer._vm;
        vm.setFeatureStyle(newVal, vm.hoverStyles);
      }
    },
  },
  computed: {
    info() {
      // 获取详情
      if (this.selectFeature) {
        return this.selectFeature.getProperties();
      }
      return null;
    },
  },
  methods: {
    init() {
      // 行政区划
      // let region = mapHandler.getRegionData();
      // if (region) {
      //   this.vectorDataSource[region.id] = region;
      // }
    },
    getMap() {
      return this.$refs.mapCom.map;
    },
    handleClick(e, feature) {
      if (feature) {
        this.selectFeature = feature;
        this.$refs.popup.show(e.coordinate);
      }
    },
    clearSelectFeature(){
      this.selectFeature = null;
    },
  },
};
</script>
