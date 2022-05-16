<script>
import MyDataSourceBase from "./MyDataSourceBase.vue";
import { setEntityStyles } from "../../js/vector/entityStyle";
import { gifStyle } from "../../js/vector/entityGifStyle.js";

export default {
  name: "MyEarthVector",
  mixins: [MyDataSourceBase],
  props: {
    styles: {
      type: [Object, Array, Function],
      default: () => {
        return null;
      }
    },
    gifUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      localStyles: null
    };
  },
  methods: {
    /**
     * 矢量图层的初始化
     */
    init() {
      this.initSource();
      this.initLayerFinish();

      this.setStyle();
    },
    setStyle(styles) {
      this.localStyles = styles || this.styles;
      let gifUrl = this.gifUrl;
      if (this.localStyles) {
        gifUrl = null;
      }
      this.source.entities.collectionChanged.addEventListener(
        (collection, added, removed, changed) => {
          added.forEach(entity => {
            if (this.localStyles) {
              setEntityStyles(entity, this.localStyles);
            }
            if (gifUrl) {
              gifStyle({ entity, gifUrl });
            }
          });
        }
      );
    }
  }
};
</script>
