<template>
  <div>
    <MyEarth ref="earth" @select="selectEntityEvent">
      <MyDataSource
        :dataSource="dataSource"
        :isFit="true"
        :styles="styles"
        :id="id"
      ></MyDataSource>
      <MyEarthPopup v-if="info" :options="popupOpt">
        <PopupInfo
          :data="info"
          :selectId="info ? info.id : null"
          @close="clearSelectFeature"
        ></PopupInfo>
      </MyEarthPopup>
    </MyEarth>
  </div>
</template>

<script>
import MyEarth from "@earth/components/my-earth/MyEarth";
import MyDataSource from "@earth/components/my-earth-vector/MyDataSource";
import MyEarthPopup from "@earth/components/my-earth-popup/MyEarthPopup";
import PopupInfo from "./component/popupInfo";

export default {
  components: {
    MyEarth,
    MyDataSource,
    MyEarthPopup,
    PopupInfo,
  },
  data() {
    return {
      id: "test",
      dataSource: {},
      selectFeature: null,
      styles: {
        icon: {
          src: "imgs/img/icon_mark.png",
        },
      },
      info: null,
      popupOpt: null,
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
        position: data ? data.position : null,
      };
      this.info = data ? data.properties : null;
    },
    clearSelectFeature() {
      this.info = null;
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
    },
  },
};
</script>
