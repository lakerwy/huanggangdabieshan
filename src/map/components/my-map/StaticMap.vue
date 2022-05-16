<template>
  <div :class="classes" style="width:100%;height:100%;">
    <slot></slot>
  </div>
</template>

<script>
import DxStaticMap from "../../js/staticMap";

export default {
  name: "MyMap",
  provide: function() {
    return {
      myMap: this
    };
  },
  props: {
    url: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: 1024
    },
    height: {
      type: Number,
      default: 968
    }
  },
  data() {
    return {
      map: null
    };
  },
  computed: {
    classes: function() {
      return {
        "my-map": true
      };
    }
  },
  mounted() {
    this.mapReady();
  },
  methods: {
    init() {
      if (this.pmap) {
        this.map = this.pmap;
        this.map.setTarget(this.$el);
        return;
      }
      this.map = new DxStaticMap({
        target: this.$el,
        url: this.url,
        width: this.width,
        height: this.height
      });

      /**
       * 地图初始化完成时触发
       */
      this.$emit("ready", this.map);
    },
    /**
     * 地图初始化完成回调
     * @param callback
     */
    mapReady(callback) {
      if (!this.map) {
        this.init();
      }

      callback && callback(this.map, this);
    }
  }
};
</script>

<style lang="less">
@import "../../style/map.less";
</style>
