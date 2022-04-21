<template>
  <div>
    <MyEarth
      ref="earth"
      style="width: 1500px; height: 800px"
      @select="selectEntityEvent"
    >
      <MyDataSource
        :dataSource="dataSource"
        :isFit="true"
        :styles="styles"
        :id="id"
      ></MyDataSource>
      <MyEarthPopup v-if="info" :options="popupOpt">
        <div style="background:#fff;">{{ info.name }}</div>
      </MyEarthPopup>
    </MyEarth>
    <el-button type="" @click="changeVisible">可见/不可见</el-button>
    <el-button type="" @click="goEntityById('point1')">定位1</el-button>
    <el-button type="" @click="goEntityById('point2')">定位2</el-button>
  </div>
</template>

<script>
import MyEarth from "@earth/components/my-earth/MyEarth";
import MyDataSource from "@earth/components/my-earth-vector/MyDataSource";
import MyEarthPopup from "@earth/components/my-earth-popup/MyEarthPopup";

import icon from "@earth/assets/icon-map.png";

export default {
  components: {
    MyEarth,
    MyDataSource,
    MyEarthPopup
  },
  data() {
    return {
      id: "test",
      dataSource: {
        type: "1",
        data: [
          {
            geometryType: "Point",
            coordinates: [110.7, 31.6],
            name: "测试一",
            id: "point1"
          },
          {
            geometryType: "Point",
            coordinates: [115.7, 31.6],
            name: "测试二",
            id: "point2"
          }
        ],
        geometryKey: "geometryType"
      },
      styles: {
        icon: {
          src: icon
        }
      },
      info: null,
      popupOpt: null
    };
  },
  methods: {
    changeVisible() {
      let component = this.$refs.earth;
      if (component) {
        let layer = component.getDataSourceLayer(this.id);
        layer.setVisible(!layer.getVisible());
      }
    },
    selectEntityEvent(data) {
      this.popupOpt = {
        position: data ? data.position : null
      };
      this.info = data ? data.properties : null;
    },
    goEntityById(entityId) {
      let component = this.$refs.earth;
      if (component) {
        let source = component.getDataSourceById(this.id);
        if (source) {
          let entity = source.entities.getById(entityId);
          component.flyEntity(entity);
        }
      }
    }
  }
};
</script>
