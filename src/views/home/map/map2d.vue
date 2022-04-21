<template>
  <my-map ref="map" @nullselect="clearSelectFeature">
    <MyMapVectorHeat
      v-if="heatData"
      :dataSource="heatData.data"
      :options="heatData.options"
    ></MyMapVectorHeat>
    <template v-for="(value, name, index) in dataSources">
      <MyMapVectorJson
        v-if="value"
        :key="index"
        :dataSource="value.data"
        :dataType="value.dataType"
        :styles="value.style"
        :hoverStyles="value.hoverStyle"
        :zindex="value.zindex"
        :isFit="value.isFit"
        :fitOption="value.fitOption"
        :isCluster="value.isCluster"
        @click="handleClick"
      >
      </MyMapVectorJson>
    </template>
    <MyMapPopup ref="popup" :options="popupOpts">
      <popupInfo
        v-if="selectInfo && !selectInfo.noShowPopup"
        :data="selectInfo"
        @close="closePopup"
      ></popupInfo>
    </MyMapPopup>
  </my-map>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MyMap from "@map/components/my-map/Map";
import MyMapVectorJson from "@map/components/my-map-vector/Cluster.vue";
import MyMapPopup from "@map/components/my-map-overlay/Popup";
import MyMapVectorHeat from "@map/components/my-map-vector/Heat";
import popupInfo from "../components/popupInfo.vue";

import * as handler from "./handlerEvent";
import emitter from "@/event";
import LableEntityManage from "../../../cesium/js/Entity/AddLableLayer";
import HeatmapLayerManager from "../../../cesium/js/Layer/AddHeatmapLayer";
import { fireHeatData } from "../../../../tests/data/fireHeat";
import {
  AddArcGISLayerbyURI,
  SwitchArcGISLayerbyCode
} from "../../../cesium/js/Layer/simpleArcGISLayers";
import { removeImgLayer } from "../../../cesium/js/Layer/RemoveLayerManager";
import {
  removeLayer,
  RestorationViwer
} from "../../../cesium/js/Utilities/UtilitiesFunction";

export default {
  components: {
    MyMap,
    MyMapVectorJson,
    MyMapPopup,
    MyMapVectorHeat,
    popupInfo
  },
  data() {
    return {
      dataSources: {}, // 矢量图层
      heatData: null, // 热力图
      popupOpts: { positioning: "bottom-center", offset: [0, -40] },
      selectFeature: null,
      timer: null,
      Heatmap3D: null
    };
  },
  computed: {
    ...mapState(["thematicIndex", "warnList", "isEarth"]),
    selectInfo() {
      // 获取详情
      if (this.selectFeature) {
        return this.selectFeature.getProperties();
      }
      return null;
    }
  },
  watch: {
    thematicIndex() {
      this.init();
    },
    isEarth() {
      this.init();
    },
    warnList() {
      this.showWarnOnMap();
    },
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
    }
  },
  created() {},
  mounted() {
    this.thematicEvent();
    this.showWarnOnMap();
    emitter.on("positioningById", this.positioningById);
    emitter.on("changeLayerVisible", this.changeLayerVisible);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    emitter.off("positioningById", this.positioningById);
    emitter.off("changeLayerVisible", this.changeLayerVisible);
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    init() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.clearThematic();
      this.$nextTick(() => {
        this.thematicEvent();
        if (this.thematicIndex === "SLFH" || this.thematicIndex === "JQRLT") {
          this.timer = setInterval(this.thematicEvent, 1000 * 60);
        }
      });
    },
    thematicEvent() {
      let key = this.thematicIndex;
      switch (key) {
        case "XHGL":
          this.getPatrolRoute();
          this.getPersons();
          break;
        case "ZJSP":
          this.getCamera();
          break;
        case "SLFH":
          this.getFireHeat();
          break;
        case "JQRLT":
          this.getPeopleHeatMap();
          break;
        case "SWJC":
          this.getWaterOnMap();
          break;
        case "KQJC":
          this.getGasOnMap();
          break;
        case "theme":
          this.getThematic();
          break;
        default:
          break;
      }
    },
    clearThematic() {
      this.dataSources = {};
      this.heatData = null;
      let map = this.$refs.map.map;
      if (map) {
        map.clear();
      }

      if (this.isEarth) {
        window.Scene.viewer.entities.removeById("heatmap");
        this.Heatmap3D = null;
        document.getElementById("heatmap").innerHTML = "";

        if (window.Scene.ZJSPPointsArr.length > 0) {
          removeLayer(window.Scene.viewer, window.Scene.ZJSPPointsArr);
          removeImgLayer(window.Scene.viewer);
          RestorationViwer(window.Scene.viewer);
        }
      }
    },
    async getFireHeat() {
      let result = await handler.getFireHeat();

      //result = fireHeatData;
      if (result) {
        if (this.isEarth) {
          // if (this.Heatmap3D) {
          //   this.Heatmap3D.AddHeatmap(result);
          // } else {
          let Heatmap = new HeatmapLayerManager(window.Scene.viewer);
          this.Heatmap3D = Heatmap;
          this.Heatmap3D.AddHeatmap(result, "fire_rank");
          // }
          //Heatmap.InitHatmap();
        } else {
          this.heatData = result;
        }
      }

      let townResult = await handler.getFireTownOnMap();
      if (townResult) {
        if (this.isEarth) {
          //
          let entitymanage = new LableEntityManage(window.Scene.viewer);
          entitymanage.SLFHOEarth(townResult.data);
        } else {
          this.$set(this.dataSources, "fireTown", townResult.data);
        }
      }
    },
    async getCamera() {
      let result = await handler.getCamera();
      if (result) {
        if (this.isEarth) {
          let entitymanage = new LableEntityManage(window.Scene.viewer);
          entitymanage.ZHYYManagerZJvideo(result.data);
        } else {
          this.$set(this.dataSources, "camera", result.data);
        }
      }
    },
    async getPeopleHeatMap() {
      let result = await handler.getPeopleHeatMap();
      if (result) {
        if (this.isEarth) {
          // if (this.Heatmap3D) {
          //   this.Heatmap3D.AddHeatmap(result);
          // } else {
          let Heatmap = new HeatmapLayerManager(window.Scene.viewer);
          this.Heatmap3D = Heatmap;
          this.Heatmap3D.AddHeatmap(result, "heat_val");
          // }
        } else {
          this.heatData = result;
        }
      }
    },
    async getPatrolRoute() {
      let urls = window.global.XHGLMapURL;
      let map = this.$refs.map.map;
      if (Array.isArray(urls)) {
        for (let i = 0; i < urls.length; i++) {
          const item = urls[i];
          if (!item.id) {
            item.id = "thematic" + i;
          }
          if (this.isEarth) {
            AddArcGISLayerbyURI(window.Scene.viewer, item);
          } else {
            await map.addImageLayer(item);
          }
        }
      }

      // let result = await handler.getPatrolRoute();
      // debugger;
      // if (result) {
      //   if(this.isEarth){
      //     let entitymanage  = new LableEntityManage(window.Scene.viewer);
      //     entitymanage.ZHYYManagerZJvideo(result.data);
      //   }else {
      //     this.$set(this.dataSources, "route", result.data);
      //   }
      //
      // }
    },
    async getPersons() {
      let result = await handler.getPersons();
      if (result) {
        if (this.isEarth) {
          let entitymanage = new LableEntityManage(window.Scene.viewer);
          entitymanage.ZHYYManagerZJvideo(result.data);
        } else {
          this.$set(this.dataSources, "person", result.data);
        }
      }
    },
    async getThematic() {
      let urls = window.global.thematicUrl;
      let map = this.$refs.map.map;
      let layerItems = [];
      if (Array.isArray(urls) && map) {
        for (let i = 0; i < urls.length; i++) {
          const item = urls[i];
          if (!item.id) {
            item.id = "thematic" + i;
          }
          if (this.isEarth) {
            AddArcGISLayerbyURI(window.Scene.viewer, item);
            layerItems.push({ ...item, checked: true });
          } else {
            await map.addImageLayer(item);
            layerItems.push({ ...item, checked: true });
          }
        }
      }

      emitter.emit("showLayerManager", layerItems.reverse());
    },
    changeLayerVisible(item, key = "id") {
      let map = this.$refs.map.map;
      let layer = map.getLayerByKey(key, item[key])[0];
      if (layer) {
        layer.setVisible(item.checked);
      }
    },
    handleClick(e, feature) {
      if (feature) {
        this.selectFeature = feature;
        this.$refs.popup.show(e.coordinate);

        if (this.selectFeature.getProperties().infoType === "person") {
          this.$set(this.dataSources, "record", null);
          this.routeRecordEvent();
        }
      }
    },
    clearSelectFeature() {
      // 清除
      this.selectFeature = null;
      this.$set(this.dataSources, "record", null);
    },
    closePopup() {
      this.$refs.popup.hide();
    },
    async routeRecordEvent() {
      let result = await handler.routeRecordEvent(this.selectInfo.staff_id);
      if (result) {
        this.$set(this.dataSources, "record", result.data);
      }
    },
    showWarnOnMap() {
      let result = handler.showWarnOnMap(this.warnList);
      if (result) {
        this.$set(this.dataSources, "warn", result.data);
      }
    },
    async getWaterOnMap() {
      let result = await handler.getWaterOnMap();
      if (result) {
        if (this.isEarth) {
          console.log("水汽", result.data);
          let entitymanage = new LableEntityManage(window.Scene.viewer);
          entitymanage.WaterOnEarth(result.data);
        } else {
          this.$set(this.dataSources, "water", result.data);
        }
      }
    },
    async getGasOnMap() {
      let result = await handler.getGasOnMap();
      if (result) {
        if (this.isEarth) {
          let entitymanage = new LableEntityManage(window.Scene.viewer);
          entitymanage.WaterOnEarth(result.data);
        } else {
          this.$set(this.dataSources, "gas", result.data);
        }
      }
    },
    positioningById(coordinate) {
      let map = this.$refs.map.map;
      coordinate = map.inputCoordinate(coordinate);
      let feature = map.getFeatureByCoordinate(coordinate);
      if (feature) {
        this.handleClick({ coordinate }, feature);
      }
    }
  }
};
</script>
