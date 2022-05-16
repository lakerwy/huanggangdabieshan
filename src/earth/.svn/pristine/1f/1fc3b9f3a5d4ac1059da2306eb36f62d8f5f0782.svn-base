<template>
  <div>
    <MyEarth ref="earth" style="width: 1500px; height: 800px"></MyEarth>
    <el-button @click="measureEvent('line')">测距</el-button>
    <el-button @click="measureEvent('line', true)">测距（贴地）</el-button>
    <el-button @click="measureEvent('area')">测面</el-button>
    <el-button @click="measureEvent('area', true)">测面（贴地）</el-button>
    <el-button @click="measureEvent('height')">测高</el-button>
    <el-button @click="measureEvent('clear')">清除</el-button>
  </div>
</template>
<script>
import MyEarth from "@earth/components/my-earth/MyEarth";
import Measure from "../../js/tool/measure";
export default {
  components: {
    MyEarth
  },
  data() {
    return {
      measure: null
    };
  },
  methods: {
    measureEvent(type, clampToGround) {
      if (!this.measure) {
        this.measure = new Measure({
          viewer: this.$refs.earth.viewer
        });
      }

      switch (type) {
        case "line":
          this.measure.drawLine({ clampToGround: clampToGround });
          return;
        case "area":
          this.measure.drawArea({ clampToGround: clampToGround });
          return;
        case "height":
          this.measure.drawTriangles();
          return;
        case "clear":
          this.measure.clear();
          return;
        default:
          return;
      }
    }
  }
};
</script>
