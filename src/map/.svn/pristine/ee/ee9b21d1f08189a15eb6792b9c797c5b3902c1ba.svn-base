<script>
/**
 * 基于GeoJSON 实现的矢量图层
 * 在数据源的基础上，增加样式功能，支持对象，数组和函数的样式设置
 */
import VectorBase from "./Base";
import DxVectorLayer, { getStyles } from "@map/js/layer/vectorLayer";
import DxVectorImageLayer from "@map/js/layer/vectorImageLayer";
import { gifStyle } from "../../js/style/gifStyle.js";

export default {
  name: "MyMapVectorJson",
  mixins: [VectorBase],
  /**
   * @property { Style| Array<Style> | function} [styles] - 样式
   * Style 结构参考 {@link import("../../js/layer/vectorLayer").Style}
   * @property { Style| Array<Style> | function} [hoverStyles] - 鼠标进过时的样式
   */
  props: {
    styles: {
      type: [Object, Array, Function],
      default: () => {
        return null;
      }
    },
    hoverStyles: {
      type: [Object, Array, Function],
      default: () => {
        return null;
      }
    },
    isVectorImage: {
      type: Boolean,
      default: false
    },
    gifUrl: {
      type: String,
      default: null
    },
    gifStyleFunction: {
      type: Function,
      default: null
    }
  },
  data() {
    return {};
  },
  watch: {
    styles() {
      this.setStyles(this.styles);
    }
  },
  methods: {
    init() {
      if (this.layer) {
        return;
      }

      // 初始化数据源
      this.initSource();

      // 初始化图层
      if (this.isVectorImage) {
        this.layer = new DxVectorImageLayer({
          source: this.source,
          styles: this.styles
        });
      } else {
        this.layer = new DxVectorLayer({
          source: this.source,
          styles: this.styles
        });
      }

      this.layer.setHoverStyles(this.hoverStyles);

      this.initLayerFinish();

      this.setGifStyle();
    },
    setGifStyle() {
      if (this.gifUrl) {
        gifStyle({
          map: this.myMap.map,
          layer: this.layer,
          gifUrl: this.gifUrl,
          styleFunction: this.gifStyleFunction
        });
      }
    },
    /**
     * 设置样式
     */
    setStyles(styles) {
      this.layer.setStyle(getStyles(styles));
    },
    /**
     * 设置鼠标经过时的样式
     */
    setHoverStyles(styles) {
      let flag = this.hoverStyles ? true : false;
      this.hoverStyles = styles;
      if (!flag) {
        this.layer.setHoverStyles(this.hoverStyles);
      }
    },
    /**
     * 设置要素样式
     */
    setFeatureStyle(feature, style) {
      if (feature) {
        style = style ? getStyles(style) : null;
        feature.setStyle(style);
        feature.ghostFeatureStyle = style;
      }
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>
