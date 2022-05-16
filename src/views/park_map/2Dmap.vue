<template>
  <div>
    <my-map ref="mapCom" @ready="init" @nullselect="clearSelectFeature">
      <MyMapQuerySpatial ref="spatial"></MyMapQuerySpatial>
      <div v-for="(item, name, index) in vectorDataSource" :key="index">
        <MyMapVectorJson
          :ref="name"
          :id="item.id"
          :name="item.name"
          :dataSource="item.dataSource"
          :dataType="item.dataType"
          :styles="item.styles"
          :hoverStyles="item.hoverStyles"
          :zindex="item.zindex"
          :isFit="item.isFit"
          :fitOption="item.fitOption"
          @click="handleClick"
        ></MyMapVectorJson>
      </div>
      <MyMapPopup ref="popup">
        <Popup :infodata="info" @close="clearSelectFeature" />
      </MyMapPopup>
    </my-map>
  </div>
</template>

<script>
import MyMap from "@map/components/my-map/Map";
import MyMapVectorJson from "@map/components/my-map-vector/Json";
import MyMapQuerySpatial from "@map/components/query/geospatial";
import MyMapPopup from "@map/components/my-map-overlay/Popup";
import Popup from "./popup/index";
import Track from "@map/js/animation/track";

export default {
  components: {
    MyMap,
    MyMapVectorJson,
    MyMapPopup,
    Popup,
    MyMapQuerySpatial,
  },
  data() {
    return {
      vectorDataSource: {},
      selectFeature: null,
    };
  },
  mounted() { },
  watch: {
    selectFeature(newVal, oldVal) {
      //样式还原
      if (oldVal) {
        let vm = oldVal._layer._vm;
        vm.setFeatureStyle(oldVal, vm.styles);
      }
      //设置选中样式
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
  beforeUnmount() { },
  methods: {
    // 定位到要素
    goFeature(feature) {
      if (feature) {
        let geometry = feature.getGeometry();
        this.getMap()
          .getView()
          .fit(geometry, { maxZoom: 17, padding: [200, 200, 200, 200] });
      }
    },
    addJsonData({ code, data, name, popTypes, ready }) {
      if (!Array.isArray(data)) {
        return;
      }
      let list = data.map((x) => {
        return {
          ...x,
          // dialogType: popTypes,
        };
      });
      let item = {
        id: code,
        name: name,
        dataSource: {
          type: "1", // List
          data: list,
          geometryKey: "geometryType",
        },
        styles: {
          stroke: {
            width: 5,
            color: "#33d6e3",
          },
        },
        isFit: true,
        fitOption: { padding: [200, 200, 200, 200] },
        isCluster: false,
        ready: ready,
      };
      // this.$set(this.vectorDataSource, code, item);
      this.vectorDataSource[code] = item;
    },
    clearTrack() {
      if (this.track) {
        debugger;
        this.track.destroy();
        this.track = null;
      }
    },
    showTrack(params) {
      this.clearTrack();
      if (!this.$refs[params.code]) {
        return;
      }
      let feature = this.$refs[params.code].source.getFeatureById(params.id);
      if (!feature) {
        return;
      }
      this.track = new Track({
        map: this.$refs.mapCom.map,
        feature: feature,
        showStartAndEnd: true,
        speed: 2,
        moveStyle: {
          icon: {
            src: params.icons,
            scale: 0.15
          },
          // circle: {
          //   radius: 7,
          //   fill: { color: "black" },
          //   stroke: {
          //     color: "white",
          //     width: 2,
          //   },
          // },
        },
        callback: (data) => {
          if (data && data.percent === 1) {
            // 弹出框
            // this.$refs.popup.show(this.track.getLastCoordinate());
            // this.selectFeature = feature;
          }
        },
      });
      this.track && this.track.start();
    },
    addJsonLayer({ code, name, data, typeKey, icons, hoverIcons, scale = 1 }) {
      if (!Array.isArray(data) || !data.length) {
        return;
      }

      let params = {
        id: code,
        name: name,
        dataSource: {
          type: "1",
          data: data,
          geometryKey: "geometryType",
        },
        isFit: true,
        fitOption: {
          padding: [100, 50, 100, 50],
        },
        styles: (feature) => {
          let styles = [
            {
              fill: { color: "rgba(255,0,0,0.5)" },
              stroke: {
                width: 5,
                color: "#f00",
              },
            },
          ];
          if (typeKey && icons) {
            let type = feature.get(typeKey);
            if (type) {
              let src = icons[type] || icons["default"];
              if (src) {
                styles.push({
                  icon: {
                    src: src,
                    scale: scale,
                  },
                });
              }
            }
          } else {
            styles.push({
              icon: {
                src: icons,
                scale: scale,
              },
            });
          }
          let text = feature.get("name");
          if (text) {
            styles.push({
              text: {
                textAlign: "center",
                textBaseline: "middle",
                font: "normal 14px 微软雅黑",
                text: text,
                fill: { color: "#fff" },
                padding: [2, 5, 2, 5],
                backgroundFill: {
                  color: "rgba(19,163,110,0.8)",
                },
                placement: "line",
                offsetX: 0,
                offsetY: 36,
              },
            });
          }
          return styles;
        },
        hoverStyles: (feature) => {
          let styles = [
            {
              fill: { color: "rgba(255,0,0,1)" },
              stroke: {
                width: 5,
                color: "#f00",
              },
            },
          ];
          if (typeKey && hoverIcons) {
            let type = feature.get(typeKey);
            if (type) {
              let src = hoverIcons[type] || hoverIcons["default"];
              if (src) {
                styles.push({
                  icon: {
                    src: src,
                    scale: scale,
                  },
                });
              }
            }
          } else {
            styles.push({
              icon: {
                src: hoverIcons,
                scale: scale,
              },
            });
          }
          let text = feature.get("name");
          if (text) {
            styles.push({
              text: {
                textAlign: "center",
                textBaseline: "middle",
                font: "normal 14px 微软雅黑",
                text: text,
                fill: { color: "#fff" },
                padding: [2, 5, 2, 5],
                backgroundFill: {
                  color: "rgba(243,181,26,0.8)",
                },
                placement: "line",
                offsetX: 0,
                offsetY: 36,
              },
            });
          }
          return styles;
        },
      };
      this.vectorDataSource[code] = params;
    },
    deleteVectorLayer(code) {
      if (this.vectorDataSource && this.vectorDataSource[code]) {
        // this.$delete(this.vectorDataSource, code);
        delete this.vectorDataSource[code];
      }
    },
    // wms 服务上图 根据url上图
    async addUrlLayer(params) {
      if (!params.url) {
        return;
      }
      // 添加图层
      await this.$refs.mapCom.map.addImageLayer(params);
    },
    // 删除图层
    deleteLayer(code) {
      let map = this.$refs.mapCom.map;
      let layers = map.getLayerByKey("id", code);
      if (Array.isArray(layers) && layers.length > 0) {
        let layer = layers[0];
        map.removeLayer(layer);
      }
    },
    // 定位
    goCoordinate(coordinate, zoom) {
      if (coordinate && this.$refs.mapCom) {
        this.$refs.mapCom.map.home({ center: coordinate, zoom });
      }
    },
    // 图层可见
    setLayerVisible(code, bool) {
      let layers = this.$refs.mapCom.map.getLayerByKey("id", code);
      if (Array.isArray(layers) && layers.length > 0) {
        let layer = layers[0];
        if (bool != null) {
          layer.setVisible(bool);
        } else {
          layer.setVisible(!layer.getVisible());
        }
      }
    },
    //根据index value获取图层
    async getLayer(params) {
      await this.$refs.mapCom.map.getLayerByKey(params);
    },
    getProjection() {
      return this.$refs.mapCom.map.getView().getProjection();
    },
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
        this.$refs.popup.show(e.coordinate);
        this.selectFeature = feature;
        this.getMap()
          .getView()
          .setCenter(e.coordinate);
      }
    },
    showPop(coordinates) {
      if (coordinates) {
        this.$refs.popup.show(coordinates);
      }
    },
    clearSelectFeature() {
      this.$refs.popup.hide();
      this.selectFeature = null;
    },
    // 图层上移
    upLayer(code) {
      let map = this.$refs.mapCom.map;
      let index = map.getLayerIndexByKey("id", code);
      map.swapLayerByIndex(index, index + 1);
    },
    // 图层下移
    downLayer(code) {
      let map = this.$refs.mapCom.map;
      let index = map.getLayerIndexByKey("id", code);
      map.swapLayerByIndex(index, index - 1);
    },
    // 图层移动
    swapLayer(oldIndex, newIndex) {
      let map = this.$refs.mapCom.map;
      // +1 排除底图
      map.swapLayerByIndex(oldIndex + 1, newIndex + 1);
    },
    showFeatureInfoByCoordinate(coordiante, data) {
      let map = this.getMap();
      let coordinates = map.inputCoordinate(coordiante);

      let feature = map.getFeatureByCoordinate(coordinates, "id", data.id);
      if (!feature) {
        return;
      }
      this.selectFeature = feature;
      // 视图居中
      map.getView().fit(feature.getGeometry(), {
        maxZoom: 16,
        duration: 3000,
        callback: () => {
          // 弹窗
          this.showPop(coordinates);
        },
      });
    },
  },
};
</script>
