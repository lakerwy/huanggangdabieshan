<template>
  <div>
    <MyEarth ref="earth" @select="selectEntityEvent">
      <div v-for="(item, name, index) in vectorDataSource" :key="index">
        <MyDataSource
          :ref="name"
          :id="item.id"
          :name="item.name"
          :dataSource="item.dataSource"
          :styles="item.styles"
          :isFit="true"
        ></MyDataSource>
      </div>
      <MyEarthPopup v-if="info" :options="popupOpt">
        <PopupInfo :infodata="info" @close="clearSelectFeature"></PopupInfo>
      </MyEarthPopup>
    </MyEarth>
  </div>
</template>

<script>
import MyEarth from "@earth/components/my-earth/MyEarth";
import MyDataSource from "@earth/components/my-earth-vector/MyDataSource";
import MyEarthPopup from "@earth/components/my-earth-popup/MyEarthPopup";
import PopupInfo from "./popup/index.vue";

let layersMap = new Map();
// window.Scene.viewer ==> this.$refs.earth.viewer

export default {
  components: {
    MyEarth,
    MyDataSource,
    MyEarthPopup,
    PopupInfo,
  },
  data() {
    return {
      vectorDataSource: {},
      selectFeature: null,
      info: null,
      popupOpt: null,
    };
  },
  methods: {
    setLayerVisible(code, bool) {
      let layer = layersMap.get(code);
      if (layer) {
        if (bool != null) {
          layer.show = bool;
        } else {
          layer.show = !layer.show;
        }
      }
    },
    // 图层上移
    upLayer(code) {
      let layer = layersMap.get(code);
      let viewer = this.$refs.earth.viewer;
      if (layer && viewer) {
        viewer.imageryLayers.raise(layer);
      }
    },
    // 图层下移
    downLayer(code) {
      let layer = layersMap.get(code);
      let viewer = this.$refs.earth.viewer;
      if (layer && viewer) {
        viewer.imageryLayers.lower(layer);
      }
    },
    // 删除图层
    deleteLayer(code) {
      let layer = layersMap.get(code);
      let viewer = this.$refs.earth.viewer;
      if (layer && viewer) {
        viewer.imageryLayers.remove(layer);
        layersMap.delete(code);
      }
    },
    swapLayer(oldCode, newCode) {
      let layer1 = layersMap.get(oldCode);
      let layer2 = layersMap.get(newCode);
      let viewer = this.$refs.earth.viewer;
      if (!viewer || !layer1 || !layer2) {
        return;
      }

      viewer.imageryLayers.remove(layer1, false);
      let index2 = viewer.imageryLayers.indexOf(layer2);
      viewer.imageryLayers.add(layer1, index2 + 1);
    },
    selectEntityEvent(data) {
      this.popupOpt = {
        position: data ? data.position : null,
      };
      this.info = data ? data.properties : null;
    },
    clearSelectFeature() {
      this.info = null;
      let earth = this.$refs.earth;
      if (earth) {
        earth.viewer.selectedEntity = null;
      }
    },
    goEntityById(id, entityId) {
      let component = this.$refs.earth;
      if (component) {
        let source = component.getDataSourceById(id);
        if (source) {
          let entity = source.entities.getById(entityId);
          component.flyEntity(entity);
        }
      }
    },
    addJsonLayer({ code, name, data, typeKey, icons, scale = 1 }) {
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
        styles: (entity, properties) => {
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
            let type = properties[typeKey];
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
          let text = properties["name"];
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
      };
      this.vectorDataSource[code] = params;
    },
    // wms 服务上图 根据url上图
    async addUrlLayer(params) {
      // 添加图层
      let layer = await this.$refs.earth.viewer.addImageLayer(params, true);
      layersMap.set(params.id, layer);
    },
    deleteVectorLayer(code) {
      if (this.vectorDataSource && this.vectorDataSource[code]) {
        // this.$delete(this.vectorDataSource, code);
        delete this.vectorDataSource[code];
      }
    },
    showTrack(params) {
      this.clearTrack();
      this.playTrack(window.Scene.viewer, params.code, params.id);
    },
    clearTrack() {
      this.destoryTrack(window.Scene.viewer);
    },
    destoryTrack(viewer) {
      viewer.trackedEntity = undefined;
      viewer.clock.shouldAnimate = false;

      viewer.entities.removeById("track-move");
      viewer.entities.removeById("track-start");
      viewer.entities.removeById("track-end");
    },
    playTrack(viewer, code, id) {
      let dataSource = viewer.dataSources.getByName(code)[0];
      if (!dataSource) {
        return;
      }

      let entity = dataSource.entities.getById(id);
      if (!entity || !entity.polyline || !entity.polyline.positions) {
        return;
      }
      let coordinates = entity.polyline.positions._value;

      const timeStepInSeconds = 30;
      const totalSeconds = timeStepInSeconds * (coordinates.length - 1);
      const start = Cesium.JulianDate.now();
      const stop = Cesium.JulianDate.addSeconds(
        start,
        totalSeconds,
        new Cesium.JulianDate()
      );
      viewer.clock.startTime = start.clone();
      viewer.clock.stopTime = stop.clone();
      viewer.clock.currentTime = start.clone();
      // Speed up the playback speed 50x.
      viewer.clock.multiplier = 50;
      // Start playing the scene.
      viewer.clock.shouldAnimate = true;

      const positionProperty = new Cesium.SampledPositionProperty();

      for (let i = 0; i < coordinates.length; i++) {
        const time = Cesium.JulianDate.addSeconds(
          start,
          i * timeStepInSeconds,
          new Cesium.JulianDate()
        );
        positionProperty.addSample(time, coordinates[i]);
      }

      let moveEntity = new Cesium.Entity({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]),
        position: positionProperty,
        id: "track-move",
        orientation: new Cesium.VelocityOrientationProperty(positionProperty),
        point: {
          pixelSize: 10, //点的大小
          heightReference: 1, // HeightReference.CLAMP_TO_GROUND
          color: Cesium.Color.fromCssColorString("#000"), //颜色
          outlineColor: Cesium.Color.fromCssColorString("#fff"), //边框颜色
          outlineWidth: 2, //边框宽度
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
      let startPoint = Cesium.Cartographic.fromCartesian(coordinates[0]);
      let startEntity = new Cesium.Entity({
        id: "track-start",
        position: Cesium.Cartesian3.fromRadians(
          startPoint.longitude,
          startPoint.latitude,
          1
        ),
        billboard: new Cesium.BillboardGraphics({
          image: require("../../assets/images/crack1.png"),
          heightReference: 1, // HeightReference.CLAMP_TO_GROUND
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          scale: 0.2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }),
      });
      let endPoint = Cesium.Cartographic.fromCartesian(
        coordinates[coordinates.length - 1]
      );
      let endEntity = new Cesium.Entity({
        id: "track-end",
        position: Cesium.Cartesian3.fromRadians(
          endPoint.longitude,
          endPoint.latitude,
          1
        ),
        billboard: new Cesium.BillboardGraphics({
          image: require("../../assets/images/crack2.png"),
          heightReference: 1, // HeightReference.CLAMP_TO_GROUND
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          scale: 0.2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }),
      });
      viewer.entities.add(moveEntity);
      viewer.entities.add(startEntity);
      viewer.entities.add(endEntity);

      viewer.trackedEntity = moveEntity;
    }
  },
};
</script>
