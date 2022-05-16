<template>
  <div>
    <my-map style="width: 1500px; height: 800px">
      <MyMapVectorJson
        ref="geo"
        :dataSource="dataSource"
        gifUrl="img/1.gif"
        :gifStyleFunction="gifStyleFunction"
      >
      </MyMapVectorJson>
    </my-map>
  </div>
</template>

<script>
import MyMap from "@map/components/my-map/Map";
import MyMapVectorJson from "@map/components/my-map-vector/Json";
import { getStyles } from "@map/js/layer/vectorLayer";

export default {
  components: {
    MyMap,
    MyMapVectorJson
  },
  data() {
    return {
      dataSource: null,
      gifStyleFunction: this.styleFunction
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const count = 1000;
      const features = new Array(count);
      const e = 100;
      for (let i = 0; i < count; ++i) {
        const coordinates = [
          2 * e * Math.random() - e,
          2 * e * Math.random() - e
        ];
        features[i] = {
          id: i + 1,
          geometryType: "Point",
          coordinates: coordinates
        };
      }
      this.dataSource = {
        type: "1", // List
        data: features,
        geometryKey: "geometryType"
      };
    },
    styleFunction(style) {
      let styleFunction = (feature, resolution) => {
        let id = feature.get("id");
        if (id > 500) {
          return style;
        } else {
          return getStyles({
            circle: {
              fill: { color: "#f00" },
              radius: 5
            }
          });
        }
      };
      return styleFunction;
    }
  }
};
</script>
