<template>
  <div id="container" class="box">
    <div id="CesiumContainer"></div>
    <div style="position:absolute;display:none" ref="inforef">
      <popupInfo
        v-if="selectInfo && !selectInfo.noShowPopup"
        :data="selectInfo"
        @close="closePopup"
      ></popupInfo>
    </div>
    <div id="heatmap" style="width:1000px;height:600px"></div>
    <div
      id="profileChart"
      style="
        width: 900px;
        height: 400px;
        position: absolute;
        bottom: 10%;
        left: 600px;
        display: none;
      "
    ></div>
    <!--div id="sectionChars" class="infoview sectionChars">
      <div id="echartsView1" style="width: 100%; height: 100%"></div>
    </div-->
    <div
      class="toolsbar main_toolsbar"
      id="coordinateDisplay"
      style="
        position: absolute;
        bottom: 0;
        left: 10px;
        background: transparent !important;
        line-height: 30px;
        filter: alpha(opacity=30);
        color: #ddd;
        font-family: MicrosoftTaHei;
        font-size: 14px;
      "
    >
      <label id="coordinate_location">
        经度:{{ this.MousePosition.lon }}°， 纬度:{{
          this.MousePosition.lat
        }}°， 视角海拔高度:{{ this.MousePosition.height }}米，
      </label>
      <!--            <label id="coordinate_height"></label> 航向角 {{heading}}°&#12288;|&#12288; 俯仰角 {{pitch}}°&#12288;|&#12288; 滚转角 {{roll}}°&#12288;|&#12288;-->
      <label id="coordinate_cameraheight">
        航向角 {{ this.MousePosition.heading }}°， 俯仰角
        {{ this.MousePosition.pitch }}°，滚转角
        {{ this.MousePosition.roll }}</label
      >
    </div>
  </div>
</template>
<script>
import "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";
//import Cesium from "cesium/Cesium";
//import widget from "cesium/Widgets/widgets.css";
import "../assets/Cesiumstyle.css";
import { AddWMTSLayers } from "../js/Layer/wmtsLayers";
import { AddTerrainLayers } from "../js/Layer/TerrainLayer";
import ViewerBase from "../js/Scene/ViewerBase";
import LoadJsonManager from "../js/Layer/JsonLayerManager";
import HeatmapLayerManager from "../js/Layer/AddHeatmapLayer";
import PickEntityManager from "../js/PickHandler/PickEntityAttWindow";
import popupInfo from "../../views/home/components/popupInfo"; //../components/popupInfo.vue
import { FlytoEntity } from "../js/Utilities/UtilitiesFunction";
import * as handler from "../../views/home/map/handlerEvent";
import LableEntityManage from "../js/Entity/AddLableLayer";
import { getEntityPropertiesAndPosition } from "../js/entity.js";

export default {
  name: "CesiumMap",
  components: {
    popupInfo
  },
  props: {},
  data() {
    return {
      viewer: null,
      MousePosition: {
        lon: 0,
        lat: 0,
        height: 0,
        heading: 0,
        pitch: 0,
        roll: 0
      },
      px_position: null,
      selectEntity: null,
      CurpickEntity: null,
      selectInfo: null
    };
  },
  watch: {},
  computed: {
    // selectInfo() {
    //   // 获取详情
    //   if (this.CurpickEntity) {
    //     return this.CurpickEntity;
    //   }
    //   return null;
    // }
  },

  created() {},
  mounted() {
    this.Init3Dviewer();
    // if (this.viewer) {
    //   this.InitSceneData(this.viewer);
    //   //this.loadJson(this.viewer);
    // }
  },
  methods: {
    /**
     * 初始化三维视图
     * @constructor
     */
    Init3Dviewer() {
      window.Scene = {};
      window.Scene._handler = null;
      window.Scene.PointDataArr = [];
      window.Scene.MultiTypePointsArr = [];
      window.Scene.ZJSPPointsArr = [];
      window.Scene._DrawLineetityArr = [];
      /**
       * 设置home建的位置
       */
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
        60.0,
        60.0,
        160,
        9.0
      );

      let clock = new Cesium.Clock({
        startTime: Cesium.JulianDate.fromIso8601("2019-12-25"),
        currentTime: Cesium.JulianDate.fromIso8601("2021-08-10"),
        stopTime: Cesium.JulianDate.fromIso8601("2030-12-26"),
        clockRange: Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
        clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
        multiplier: 40, // how much time to advance each tick
        shouldAnimate: true // Animation on by default
      });
      //Cesium.Ion.defaultAccessToken  = window.EarthBaseConfig.Cesiumtoken;
      //Cesium.Ion.defaultServer = '';
      let mapbox = new Cesium.MapboxImageryProvider({
        mapId: "mapbox.satellite",
        show: false,
        accessToken:
          "pk.eyJ1IjoiZGVuZ3plbmdqaWFuIiwiYSI6ImNqbGhnbWo1ZjFpOHEzd3V2Ynk1OG5vZHgifQ.16zy39I-tbQv3K6UnRk8Cw"
      });
      this.viewer = new Cesium.Viewer("CesiumContainer", {
        //allowDataSourcesToSuspendAnimation: true,
        homeButton: true,
        animation: true, //是否显示动画控件
        baseLayerPicker: false, //是否显示图层选择控件
        geocoder: false, //是否显示地名查找控件
        timeline: true, //是否显示时间线控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: false, //是否显示点击要素之后显示的信息
        sceneModePicker: true, //是否显示3D/2D选择器
        vrButton: false, //双屏模式,默认不显示false
        fullscreenButton: false,
        CreditsDisplay: true,
        selectionIndicator: false,
        readonlysceneModePicker: true,
        selectedEntity: true,
        shadows: false,
        //clockViewModel: new Cesium.ClockViewModel(clock),
        //creditContainer: document.createElement("DIV"),
        //imageryProvider: null,
        imageryProvider: false,
        //terrainProvider : globe_terrainProvider,
        sceneMode: Cesium.SceneMode.SCENE3D // Cesium.SceneMode.SCENE2D Cesium.SceneMode.COLUMBUS_VIEW
      });
      this.viewer.extend(Cesium.viewerCesiumInspectorMixin);
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      /**
       * 地形深度测试 开启或者关闭
       */
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      /**
       * 关闭fxaa  最新的cesium已经将fxaa移到PostProcessStageCollection
       */
      this.viewer.scene.fxaa = false;
      /**
       *cesium的label的清晰度
       */
      this.viewer.scene.postProcessStages.fxaa.enabled = false;
      /**
       * 隐藏Cesium动画控制控件
       */
      this.viewer.animation.container.style.visibility = "hidden";
      /**
       * 隐藏Cesium时间线控制控件
       */
      this.viewer.timeline.container.style.visibility = "hidden";
      /**
       * 隐藏版本信息用CSS控制
       * @type {string}
       */
      this.viewer.scene.postProcessStages.fxaa.enabled = false;
      var options = {};
      // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
      // options.defaultResetView = Cesium.Rectangle.fromDegrees(
      //   60.0,
      //   60.0,
      //   160,
      //   8.0
      // );
      //亮度设置
      var stages = this.viewer.scene.postProcessStages;
      this.viewer.scene.brightness =
        this.viewer.scene.brightness ||
        stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
      this.viewer.scene.brightness.enabled = true;
      this.viewer.scene.brightness.uniforms.brightness = Number(1.1);
      this.viewer.scene.fxaa = false;
      this.viewer.scene.globe.maximumScreenSpaceError = 4 / 3;

      // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
      options.enableCompass = true;
      // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
      options.enableZoomControls = true;
      // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
      options.enableDistanceLegend = true;
      // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
      options.enableCompassOuterRing = true;
      // console.log(CesiumNavigation);
      // CesiumNavigation(this.viewer, options);
      if (this.viewer) {
        window.Scene.viewer = this.viewer;
        let viewbase = new ViewerBase(this.viewer);
        viewbase.getCurMousePosition(this.callbackUPDataPosition);
        Cesium.Camera.DEFAULT_OFFSET = new Cesium.HeadingPitchRange(
          -20,
          -45,
          0
        );
        //Cesium.Camera.DEFAULT_VIEW_FACTOR = 2;
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle.fromDegrees(
          109.9346923,
          31.292634,
          110.9783935,
          31.863562
        );
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

        // viewbase.activeFlytoViwer(
        //   window.EarthBaseConfig.initviewpoint,
        //   -20,
        //   -60,
        //   0
        // );
        // let lable = new  LableEntityManage(window.Scene.viewer);
        // lable.AddLabeentity(null);
        //this.viewer.scene.globe.enableLighting = true;
        // var utc = Cesium.JulianDate.fromDate(new Date("2021/08/10 09:40:00"));//UTC
        // this.viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(utc,8,new Cesium.JulianDate());//北京时间=UTC+8=GMT+8
        this.viewer.camera.setView({
          destination: new Cesium.Cartesian3(
            -1966386.6600895405,
            5242492.19311227,
            3270708.5233220723
          ), // -1966386.6600895405, 5242492.19311227,3270708.5233220723
          orientation: {
            heading: 6.189050778847438, // east, default value is 0.0 (north) //6.189050778847438
            pitch: -0.7778268233321644, // default value (looking down)//-0.7778268233321644
            roll: 0.0005462445771966529 // default value //0.0005462445771966529
          }
        });
      }

      this.viewer.selectedEntityChanged.addEventListener(entity => {
        let result = getEntityPropertiesAndPosition(entity);
        if (!result) {
          this.closePopup();
          return;
        }

        this.selectInfo = result.properties;
        this.px_position = result.position;
        this.Callbackwgs84ToWindowCoordinates();

        if (this.selectInfo.infoType === "person") {
          this.routeRecordEvent(this.selectInfo.staff_id);
        }
      }, true);
      this.viewer.clock.onTick.addEventListener(
        this.Callbackwgs84ToWindowCoordinates.bind(this)
      );

      this.InitSceneData(this.viewer);
      return this.viewer;
    },
    async InitSceneData(viewer) {
      await AddWMTSLayers(viewer);
      //await AddArcGISLayers(viewer);
      await AddTerrainLayers(viewer, true);
      window.Scene.viewer.imageryLayers._layers[
        window.Scene.viewer.imageryLayers._layers.length - 1
      ].show = false;
      // let pickManager = new PickEntityManager(window.Scene.viewer);
      // pickManager.PickOpenAtt(
      //   this.callbackhandle,
      //   this.Callbackwgs84ToWindowCoordinates
      // );
      // let  Heatmap = new  HeatmapLayerManager(viewer);
      // Heatmap.AddHeatmap(viewer);
      //addxht();
    },
    loadJson(viewer) {
      let jsonlayer = new LoadJsonManager(viewer);
      if (jsonlayer) {
        let res = [
          {
            url: "./JsonFile/linqu_lineDL.json",
            serviceName: "神农行政区域",
            style: "#F8F8FF",
            width: 4
          }
        ];
        if (res != null && res.length > 0) {
          res.forEach(value => {
            // console.log("foreach");
            // console.log(value);
            //jsonlayer.AddJsonLayer(value);
          });
        }
      }
      // flyRotate(viewer);
    },
    closePopup() {
      this.selectInfo = null;
      this.px_position = null;
      this.$refs.inforef.style.display = "none";
    },
    async routeRecordEvent(staff_id) {
      let result = await handler.routeRecordEvent(staff_id);
      if (result) {
        let entitymanage = new LableEntityManage(window.Scene.viewer);
        entitymanage.PersonOnEarth(result.data);
      }
    },
    callbackhandle(pickEntity) {
      debugger;
      if (pickEntity != null && pickEntity.id != undefined) {
        if (this.$refs.inforef && this.$refs.inforef.$el.style) {
          this.$refs.inforef.$el.style.display = "block";
        }

        let curpickobj = pickEntity.id.properties;
        if (curpickobj) {
          for (let key in curpickobj) {
            if (curpickobj.hasOwnProperty(key)) {
              if (curpickobj[key]._value) {
                curpickobj[key] = curpickobj[key]._value;
              }
            }
          }
        }
        let obj = curpickobj;

        if (obj.infoType === "person") {
          //this.$set(this.dataSources, "record", null);
          this.routeRecordEvent(obj.staff_id);
        }

        this.selectInfo = obj;
        if (obj) {
          this.CurpickEntity = obj;
          FlytoEntity(
            this.viewer,
            obj.coordinates[0],
            obj.coordinates[1],
            80000
          );
        } else {
          this.selectInfo = null;
          if (this.$refs.inforef && this.$refs.inforef.$el.style) {
            this.$refs.inforef.$el.style.display = "none";
          }
        }
      } else {
        this.selectInfo = null;
        if (this.$refs.inforef && this.$refs.inforef.$el.style) {
          this.$refs.inforef.$el.style.display = "none";
        }
      }
    },
    Callbackwgs84ToWindowCoordinates() {
      if (this.px_position && this.$refs.inforef) {
        let position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          this.viewer.scene,
          this.px_position
        );
        this.$refs.inforef.style.display = "unset";
        this.$refs.inforef.style.left = position.x - 120 + "px";
        this.$refs.inforef.style.top = position.y + 15 + "px";
      }
    },
    callbackUPDataPosition(lon, lat, height, heading, pitch, roll) {
      this.MousePosition.lon = lon;
      this.MousePosition.lat = lat;
      this.MousePosition.height = height;
      this.MousePosition.heading = heading;
      this.MousePosition.pitch = pitch;
      this.MousePosition.roll = roll;
    }
  }
};
</script>
<style>
.box {
  width: 100%;
  height: 100%;
  position: relative;
}

#CesiumContainer {
  height: 100%;
  width: 100%;
}

.trackPopUp {
  display: none;
  /*color: rgb(255, 255, 255);*/
  /*height: 50px;*/
}

#trackPopUpContent {
  position: absolute;
}

#popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  text-align: center;
  font: 25px/25px Tahoma, Verdana, sans-serif;
  color: rgba(255, 56, 56, 1);
  text-decoration: none;
  font-weight: bold;
  background-color: rgba(206, 42, 36, 0);
  /*background: transparent;*/
}

#popup-content-wrapper {
  margin: 0px;
  max-height: 300px;
  overflow-y: auto;

  padding: 1px;
  text-align: left;
  border-radius: 12px;
  background-color: rgba(20, 21, 21, 0.5);
  border: 1.8px solid rgb(0, 165, 242);

  /*background-image: url('../assets/image/bgs.png');*/
}

.Cesium-popup-content div {
  text-align: center;
}

.Cesium-popup-content div {
  font-size: 18px;
}

.Cesium-popup-content table {
  margin-top: 15px;
}

.Cesium-popup-content table thead {
  background-color: #3e2d2d;
  color: #000000;
  text-align: left;
  vertical-align: bottom;
}

.Cesium-popup-content table tr {
  height: 25px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  padding: 0px;
  margin: 0px;
}

td,
th {
  padding: 0;
}

.pure-table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 0px solid #cbcbcb;
}

.pure-table caption {
  color: #000;
  font: italic 85%/1 arial, sans-serif;
  padding: 1em 0;
  text-align: center;
}

.pure-table td,
.pure-table th {
  border-left: 1px solid #cbcbcb;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  padding: 0.5em 1em;
}

.pure-table thead {
  background-color: rgba(27, 147, 212, 0.6);
  border: 1px solid rgb(0, 165, 242);
  color: #000;
  text-align: left;
  vertical-align: bottom;
}

.pure-table td {
  background-color: transparent;
}

.pure-table-horizontal td,
.pure-table-horizontal th {
  border-width: 0 0 0px 0;
  border-bottom: 0px solid #cbcbcb;
}

.pure-table-horizontal tbody > tr:last-child > td {
  border-bottom-width: 0;
}

.sectionChars {
  position: absolute;
  top: auto;
  width: 90%;
  height: 200px;
  bottom: 10px;
  left: 5%;
  top: auto;
  bottom: 25px;
  display: none;
}

#heatmap {
  width: 500px;
  height: 500px;
}

/*#echartsView1 {
    background-color: rgba(36, 191, 101, 0.5);
  }*/

/*@import url('~@cesium/src/assets/Cesiumstyle.css');*/
</style>
