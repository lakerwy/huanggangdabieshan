<template>
  <section class="opera-home layoutPage">
    <section class="mapData">
      <my-map ref="map" @nullselect="clearSelectFeature">
        <MyMapVectorHeat
          v-if="heatDataSource"
          :dataSource="heatDataSource"
          :options="heatMapOptions"
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
    </section>
    <div class="mapBg"></div>
    <section class="left-chart leftBg">
      <LeftInfo @index="steamEvent" />
    </section>
    <section class="right-chart rightBg">
      <RightInfo />
    </section>
    <section class="center-down">
      <CenterDown @index="thematicEvent" />
    </section>
    <section class="ceter-top">
      <WarnList></WarnList>
    </section>
  </section>
</template>

<script>
import LeftInfo from "./components/leftInfo";
import RightInfo from "./components/rightInfo";
import CenterDown from "./components/centerDown";
import WarnList from "./components/warnList";
import MyMap from "@map/components/my-map/Map";
import MyMapVectorJson from "@map/components/my-map-vector/Json";
import MyMapPopup from "@map/components/my-map-overlay/Popup";
import MyMapVectorHeat from "@map/components/my-map-vector/Heat";
import popupInfo from "./components/popupInfo";

import camera from "../../assets/images/camera.png";
import cameraHover from "../../assets/images/camera-hover.png";
import recordIcon from "../../assets/images/icon_巡护事件.png";
import recordHoverIcon from "../../assets/images/icon_巡护事件_高亮.png";
import recordStartIcon from "../../assets/images/标记_2.png";
import recordEndIcon from "../../assets/images/标记_1.png";
import fireIcon from "../../assets/images/火苗icon.png";
import personIcon from "../../assets/images/person.png";
import personHoverIcon from "../../assets/images/person-active.png";
import waterIcon from "../../assets/images/icon-水.png";
import waterHoverIcon from "../../assets/images/icon-水-选中.png";
import gasIcon from "../../assets/images/icon-气.png";
import gasHoverIcon from "../../assets/images/icon-气-选中.png";

import {
  getFireHeatMapRequest,
  getCameraRequest,
  getPeopleHeatMapRequest,
  getPatrolRouteRequest,
  getPersonsRequest,
  getPatrolRecordRequest
} from "../../api/thematic";
import { getWaterRealShow } from "../../api/home";
import { mapState,mapMutations } from "vuex";

import {
  fireHeatData,
  peopleHeatData,
  videoPointData,
  routesData,
  routeRecordData,
  personsData
} from "../../../tests/data/fireHeat";

import emitter from "../../event";

export default {
  components: {
    LeftInfo,
    RightInfo,
    CenterDown,
    WarnList,
    MyMap,
    MyMapVectorJson,
    MyMapPopup,
    MyMapVectorHeat,
    popupInfo
  },
  data() {
    return {
      dataSources: {}, // 矢量图层
      heatDataSource: null, // 热力图图层
      heatMapOptions: null, // 热力图图层选项
      popupOpts: { positioning: "bottom-center", offset: [0, -40] },
      selectFeature: null,
      timer: null,
      waterStations: null, // 水站
      gasStations: null // 气站
    };
  },
  computed: {
    ...mapState(["thematicIndex", "warnList"]),
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
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.clearThematic();
      this.$nextTick(() => {
        this.thematicEvent();
        if (this.thematicIndex === 2 || this.thematicIndex === 3) {
          this.timer = setInterval(this.thematicEvent, 1000 * 60);
        }
      });
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
    this.getWaterAndGasStation();
    emitter.on("positioningById", this.positioningById);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    emitter.off("positioningById", this.positioningById);
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    async getWaterAndGasStation() {
      let params = {
        type: 1
      };
      let res = await getWaterRealShow(params);
      if (res.code === 200 && Array.isArray(res.data)) {
        let list = res.data.map(x => {
          return x.wgGatherStation;
        });
        this.waterStations = list.map(x => {
          return {
            ...x,
            infoType: "water",
            geometryType: "Point",
            coordinates: [
              parseFloat(x.gatherStationLongitude),
              parseFloat(x.gatherStationLatitude)
            ]
          };
        });
      }

      let params1 = {
        type: 2
      };
      let res1 = await getWaterRealShow(params1);
      if (res1.code === 200 && Array.isArray(res1.data)) {
        let list1 = res1.data.map(x => {
          return x.wgGatherStation;
        });
        this.gasStations = list1.map(x => {
          return {
            ...x,
            infoType: "gas",
            geometryType: "Point",
            coordinates: [
              parseFloat(x.gatherStationLongitude),
              parseFloat(x.gatherStationLatitude)
            ]
          };
        });
      }
    },
    steamEvent(index) {
      this.setThematicIndex(null);
      this.clearThematic();
      this.$nextTick(() => {
        if (index === 2) {
          this.getWaterOnMap();
        } else if (index === 3) {
          this.getGasOnMap();
        }
      });
    },
    thematicEvent() {
      let key = this.thematicIndex;
      switch (key) {
        case 0:
          this.getPatrolRoute();
          this.getPersons();
          break;
        case 1:
          this.getCamera();
          break;
        case 2:
          this.getFireHeat();
          break;
        case 3:
          this.getPeopleHeatMap();
          break;
        case 4:
          this.getThematic();
          break;
        default:
          break;
      }
    },
    clearThematic() {
      this.dataSources = {};
      this.heatDataSource = null;
      let map = this.$refs.map.map;
      if (map) {
        map.clear();
      }
    },
    async getFireHeat() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = fireHeatData;
      } else {
        result = await getFireHeatMapRequest();
      }

      if (result.code == 200) {
        let data = result.data.map(x => {
          return {
            ...x,
            geometryType: "Point",
            coordinates: [parseFloat(x.lon), parseFloat(x.lat)]
          };
        });
        this.heatDataSource = {
          type: "1",
          data: data,
          geometryKey: "geometryType"
        };

        let range =
          window.global && window.global.fireRankRange
            ? window.global.fireRankRange
            : [0, 5];
        this.heatMapOptions = {
          radius: 15,
          blur: 20,
          weight: feature => {
            let value = feature.get("fire_rank");
            let weight = (value - range[0]) / (range[1] - range[0]);
            if (weight > 1) {
              weight = 1;
            }
            if (weight < 0) {
              weight = 0;
            }
            return weight;
          }
        };
      }
    },
    async getCamera() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = videoPointData;
      } else {
        result = await getCameraRequest();
      }
      if (result.code == 200) {
        let data = result.data.map(x => {
          return {
            ...x,
            geometryType: "Point",
            coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
            infoType: "camera"
          };
        });
        let dataSource = {
          data: {
            type: "1",
            data: data,
            geometryKey: "geometryType"
          },
          style: {
            icon: {
              src: camera
            }
          },
          hoverStyle: {
            icon: {
              src: cameraHover
            }
          }
        };
        this.$set(this.dataSources, "camera", dataSource);
      }
    },
    async getPeopleHeatMap() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = peopleHeatData;
      } else {
        result = await getPeopleHeatMapRequest();
      }

      if (result.code == 200) {
        let data = result.data.map(x => {
          return {
            ...x,
            geometryType: "Point",
            coordinates: [parseFloat(x.lon), parseFloat(x.lat)]
          };
        });
        this.heatDataSource = {
          type: "1",
          data: data,
          geometryKey: "geometryType"
        };

        let range =
          window.global && window.global.peopleRange
            ? window.global.peopleRange
            : [0, 1000];
        this.heatMapOptions = {
          radius: 15,
          blur: 20,
          weight: feature => {
            let value = feature.get("heat_val");
            let weight = (value - range[0]) / (range[1] - range[0]);
            if (weight > 1) {
              weight = 1;
            }
            if (weight < 0) {
              weight = 0;
            }
            return weight;
          }
        };
      }
    },
    async getPatrolRoute() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = routesData;
      } else {
        result = await getPatrolRouteRequest();
      }
      if (result.code == 200) {
        let data = result.data.map(x => {
          let obj = {
            ...x,
            infoType: "route",
            noShowPopup: true
          };
          return obj;
        });
        let dataSource = {
          data: {
            type: "1",
            data: data,
            geometryKey: "geometry"
          },
          dataType: "wkt",
          style: {
            stroke: {
              color: "#ffff88",
              width: 4
            },
            circle: {
              fill: {
                color: "#ffff88"
              },
              radius: 4
            }
          },
          hoverStyle: [
            {
              circle: {
                fill: {
                  color: "#6ff4f6"
                },
                radius: 4
              }
            },
            {
              stroke: {
                color: "#6ff4f6",
                width: 4,
                lineDash: [10, 20]
              }
            },
            {
              stroke: {
                color: "rgba(111,244,246,0.3)",
                width: 10
              }
            }
          ]
        };
        this.$set(this.dataSources, "route", dataSource);
      }
    },
    async getPersons() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = personsData;
      } else {
        result = await getPersonsRequest();
      }
      if (result.code == 200) {
        let data = result.data.map(x => {
          return {
            ...x,
            geometryType: "Point",
            coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
            infoType: "person"
          };
        });
        let dataSource = {
          data: {
            type: "1",
            data: data,
            geometryKey: "geometryType"
          },
          style: {
            icon: {
              src: personIcon
            }
          },
          hoverStyle: {
            icon: {
              src: personHoverIcon
            }
          }
        };
        this.$set(this.dataSources, "person", dataSource);
      }
    },
    async getThematic() {
      let urls = window.global.thematicUrl;
      let map = this.$refs.map.map;
      if (Array.isArray(urls) && map) {
        for (let i = 0; i < urls.length; i++) {
          const item = urls[i];
          if (!item.id) {
            item.id = "thematic" + i;
          }
          await map.addImageLayer(item);
        }
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
      let result = null;

      if (process.env.NODE_ENV === "test") {
        result = routeRecordData(this.selectInfo.staff_id);
      } else {
        let params = {
          staff_id: this.selectInfo.staff_id
        };
        result = await getPatrolRecordRequest(params);
      }
      console.log(result);
      if (result.code == 200 && result.data) {
        let data = result.data.record_list.map(x => {
          return {
            ...x,
            geometryType: "Point",
            coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
            infoType: "record"
          };
        });

        // let geometry = this.selectFeature.outGeometry;
        // let startPoint = geometry.getFirstCoordinate();
        // let endPoint = geometry.getLastCoordinate();
        // data.push({
        //   geometryType: "Point",
        //   coordinates: startPoint,
        //   infoType: "record-start",
        //   noShowPopup: true
        // });
        // data.push({
        //   geometryType: "Point",
        //   coordinates: endPoint,
        //   infoType: "record-end",
        //   noShowPopup: true
        // });

        let dataSource = {
          data: {
            type: "1",
            data: data,
            geometryKey: "geometryType"
          },
          style: feature => {
            let infoType = feature.get("infoType");
            if (infoType === "record") {
              return {
                icon: {
                  src: recordIcon,
                  offsetOrigin: "bottom-left"
                }
              };
            } else if (infoType === "record-start") {
              return {
                icon: {
                  src: recordStartIcon
                }
              };
            } else if (infoType === "record-end") {
              return {
                icon: {
                  src: recordEndIcon
                }
              };
            }
          },
          hoverStyle: feature => {
            let infoType = feature.get("infoType");
            if (infoType === "record") {
              return {
                icon: {
                  src: recordHoverIcon,
                  offsetOrigin: "bottom-left"
                }
              };
            } else if (infoType === "record-start") {
              return {
                icon: {
                  src: recordStartIcon
                }
              };
            } else if (infoType === "record-end") {
              return {
                icon: {
                  src: recordEndIcon
                }
              };
            }
          },
          isFit: true,
          fitOption: {
            maxZoom: 13
          }
        };
        this.$set(this.dataSources, "record", dataSource);
      }
    },
    showWarnOnMap() {
      if (!Array.isArray(this.warnList)) {
        this.warnDataSource = null;
        return;
      }

      let data = this.warnList.map(x => {
        return {
          ...x,
          geometryType: "Point",
          coordinates: [parseFloat(x.lon), parseFloat(x.lat)],
          infoType: "warn"
        };
      });

      let dataSource = {
        data: {
          type: "1",
          data: data,
          geometryKey: "geometryType"
        },
        style: {
          icon: {
            src: fireIcon
          }
        }
      };
      this.$set(this.dataSources, "warn", dataSource);
    },
    getWaterOnMap() {
      if (this.waterStations) {
        console.log(this.waterStations);
        let dataSource = {
          data: {
            type: "1",
            data: this.waterStations,
            geometryKey: "geometryType"
          },
          zindex: 99901,
          style: {
            icon: {
              src: waterIcon
            }
          },
          hoverStyle: {
            icon: {
              src: waterHoverIcon
            }
          }
        };
        this.$set(this.dataSources, "water", dataSource);
      }
    },
    getGasOnMap() {
      if (this.gasStations) {
        let dataSource = {
          data: {
            type: "1",
            data: this.gasStations,
            geometryKey: "geometryType"
          },
          style: {
            icon: {
              src: gasIcon
            }
          },
          hoverStyle: {
            icon: {
              src: gasHoverIcon
            }
          }
        };
        this.$set(this.dataSources, "gas", dataSource);
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
<style lang="scss" scoped>
.opera-home {
  .left-chart,
  .right-chart {
    width: 495px;
  }
}

.ceter-top {
  position: absolute;
  top: 5px;
  left: 535px;
  z-index: 2;
}
</style>
