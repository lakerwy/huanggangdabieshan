<!--
 * @Author: 任继民
 * @Date: 2021-03-02 16:59:42
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-04 11:41:25
 * @Description: 
-->
<template>
  <div class="opera-page" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/lib/utils/resize-event";
import { addClass, removeClass } from "element-ui/lib/utils/dom";
import { debounce } from "../utils/util";
// import Config from "../../mixins/Config";

const WRAPPER_CLASS_NAME = "my-dv-page__wrapper";
export default {
  name: "MyDvPage",
  // mixins: [Config],
  provide() {
    return {
      page: this,
    };
  },
  props: {
    lock: {
      type: Boolean,
    },
    scale: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 1920,
      validator(val) {
        return val > 0;
      },
    },
    height: {
      type: Number,
      default: 1080,
      validator(val) {
        return val > 0;
      },
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    target: {
      type: [String, HTMLElement, Function],
      default() {
        return document.body;
      },
    },
    fit: Boolean,
    fullscreen: Boolean,
  },
  data() {
    return {
      screens: [],
      screenActiveIndex: this.activeIndex,
      widthScale: 1,
      heightScale: 1,
    };
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.resize();
      },
    },
    activeIndex: {
      immediate: true,
      handler(val) {
        this.screenActiveIndex = val;
      },
    },
  },
  computed: {
    styles() {
      return this.fit
        ? {
            width: "100%",
            height: "100%",
            transform: "translateX(-50%) translateY(-50%)",
          }
        : {
            width: `${this.width}px`,
            height: `${this.height}px`,
            transform: `scaleX(${this.widthScale}) scaleY(${this.heightScale}) translateX(-50%) translateY(-50%)`,
          };
    },
  },
  methods: {
    getTarget() {
      let target;
      switch (typeof this.target) {
        case "string":
          target =
            this.target === "parent"
              ? this.$el.parentNode
              : document.querySelector(this.target);
          break;
        case "function":
          target = this.target();
          break;
        default:
          target = this.target;
          break;
      }
      return target || document.body;
    },
    resize() {
      if (!this.scale || this.fit) {
        this.widthScale = 1;
        this.heightScale = 1;
        return;
      }
      const { clientWidth, clientHeight } = this.warpper || {};
      if (!clientWidth || !clientHeight) return;
      if (this.lock) {
        this.heightScale = this.widthScale = clientWidth / this.width;
      } else {
        this.widthScale = clientWidth / this.width;
        this.heightScale = clientHeight / this.height;
      }
    },
  },
  mounted() {
    this.warpper = this.getTarget();
    addClass(this.warpper, WRAPPER_CLASS_NAME + this._uid);
    this.proxyResize = debounce(this.resize, 100);
    addResizeListener(this.warpper, this.proxyResize);
    this.resize();
  },
  beforeDestroy() {
    this.proxyResize && removeResizeListener(this.warpper, this.proxyResize);
    removeClass(this.warpper, WRAPPER_CLASS_NAME + this._uid);
  },
};
</script>

<style lang="scss">
.opera-page {
  position: absolute;
  background-image: radial-gradient(ellipse farthest-corner at center center,#173041 0,#0c1230 70%);
  transform-origin: 0 0;
  color: #b4e4ff;
  font-size: 16px;
  top: 50%;
  left: 50%;
}
</style>
