<template>
  <div>
    <MyEarth
      ref="earth"
      style="width: 1500px; height: 800px"
      @ready="showFlyLine"
    ></MyEarth>
  </div>
</template>

<script>
import MyEarth from "@earth/components/my-earth/MyEarth";
import { addFlyLine } from "../../js/animation/flyCurve.js";
import { getRadarEntity } from "../../js/model/RadarEntity";
import { getCircleRippleEntity } from "../../js/model/CircleRippleEntity.js";
import { getCylinderEntity } from "../../js/model/CylinderEntity";
import { getIconEntity } from "../../js/model/IconEntity.js";

export default {
  components: {
    MyEarth
  },
  methods: {
    showFlyLine() {
      let viewer = this.$refs.earth.getViewer();
      if (viewer) {
        let start = [100, 30];
        let end = [101, 30.2];

        let entity = addFlyLine({
          entities: viewer.entities,
          start,
          end,
          height: 50000,
          color: "rgba(208,242,24,1)"
        });
        viewer.zoomTo(entity);

        // getCylinderEntity({
        //   entities: viewer.entities,
        //   lon: end[0],
        //   lat: end[1],
        //   height: 10200,
        //   length: 10000,
        //   isRotate: false,
        //   topRadius: 4000,
        //   bottomRadius: 0,
        //   fillColor: "rgba(208,242,24,0.5)",
        //   strokeColor: "rgba(208,242,24,1)",
        //   strokeWidth: 2
        // });

        getIconEntity({
          entities: viewer.entities,
          lon: end[0],
          lat: end[1],
          height: 200,
          src: require("../../assets/icon-map.png")
        });

        getCircleRippleEntity({
          entities: viewer.entities,
          lon: end[0],
          lat: end[1],
          radius: 4000,
          height: 100,
          deviationR: 100,
          color: "rgba(208,242,24,0.5)"
        });

        getRadarEntity({
          entities: viewer.entities,
          lon: start[0],
          lat: start[1],
          radius: 10000,
          height: 100,
          color: "rgba(64,224,208,1)"
        });
      }
    }
  }
};
</script>
