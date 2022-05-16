<template>
  <div>
    <my-map ref="mapCom" :url="url" style="width:1500px;height:800px">
      <MyMapVectorJson ref="vector"> </MyMapVectorJson>
      <MyMapEditContextMenu
        ref="editContextMenu"
        v-if="editToolVisble && isSelect"
        :select="select"
        :layers="editLayers"
      >
      </MyMapEditContextMenu>
    </my-map>
    <button :disabled="editToolVisble" @click="startEditHandler">
      开始编辑
    </button>
    <button :disabled="!editToolVisble" @click="endEditHandler">
      结束编辑
    </button>
    <div v-if="editToolVisble">
      绘制类型：
      <select v-model="selectDrawType" @change="changeDrawType">
        <option
          v-for="(value, name, index) in drawTypes"
          :key="index"
          :value="name"
        >
          {{ value }}
        </option>
      </select>
      <div class="box" :class="{ active: isSelect }" @click="exeSelect()">
        <i
          class="fa fa-mouse-pointer"
          aria-hidden="true"
          title="点选(支持shift+鼠标左键-多选、shift+鼠标左键拖拽-框选)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import MyMap from "../../components/my-map/StaticMap.vue";
import MyMapVectorJson from "@map/components/my-map-vector/Json";
import MyMapEditContextMenu from "@map/components/my-map-edit/EditContextmenu";

import LAYER_DATA_TYPE from "@map/js/layer/layerDataType";
import { DRAW_TYPE_NAME } from "@map/js/edit/drawType";
import Draw from "@map/js/edit/drawClass";
import Select from "@map/js/edit/select";

export default {
  components: {
    MyMap,
    MyMapVectorJson,
    MyMapEditContextMenu
  },
  data() {
    return {
      url: "https://imgs.xkcd.com/comics/online_communities.png",
      editToolVisble: false,
      editLayers: [],
      drawTypes: DRAW_TYPE_NAME,
      selectEditLayer: null,
      selectDrawType: "Point",
      draw: null,
      isSelect: false,
      select: null,
      selectFeatures: []
    };
  },
  watch: {
    selectFeatures: function() {
      console.log(this.selectFeatures);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.selectEditLayer = this.$refs.vector.layer;
    },
    startEditHandler() {
      this.editToolVisble = true;
      this.draw = new Draw({
        map: this.$refs.mapCom.map,
        layer: this.selectEditLayer,
        drawType: this.selectDrawType
      });
    },
    endEditHandler() {
      this.editToolVisble = false;
      this.selectDrawType = "Point";
      if (this.draw) {
        this.draw.finish();
        this.draw.destroy();
        this.draw = null;
      }

      if (this.select) {
        this.select.destroy();
        this.select = null;
      }
    },
    changeDrawType() {
      this.clearSelect();
      if (this.draw) {
        this.draw.setDrawType(this.selectDrawType);
      }
    },
    exeSelect() {
      this.isSelect = !this.isSelect;
      this.selectFeatures = [];
      if (this.select) {
        this.select && this.select.active();
      }

      if (this.isSelect) {
        this.draw && this.draw.deActive();
        if (!this.select) {
          this.select = new Select({
            map: this.$refs.mapCom.map,
            layer: this.selectEditLayer,
            callback: features => {
              this.selectFeatures = features;
            }
          });
        }
      } else {
        this.draw && this.draw.active();
      }
    },
    clearSelect() {
      this.isSelect = false;
      if (this.select) {
        this.select.destroy();
        this.select = null;
      }
    }
  }
};
</script>
