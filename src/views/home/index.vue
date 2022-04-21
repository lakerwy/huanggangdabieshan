<template>
  <section class="opera-home layoutPage">
    <section class="mapData">
      <CesiumContainer v-show="isEarth"></CesiumContainer>
      <map2d  v-show="!isEarth"></map2d>
    </section>
    <div class="mapBg"></div>
    <section class="left-chart leftBg" v-if="layout.cards[0]">
      <div v-for="(item, index) in layout.cards[0].slice(0, 3)" :key="index">
        <component :is="getCardComponent(item)"></component>
      </div>
    </section>
    <section class="right-chart rightBg" v-if="layout.cards[1]">
      <div v-for="(item, index) in layout.cards[1].slice(0, 3)" :key="index">
        <component :is="getCardComponent(item)"></component>
      </div>
    </section>
    <section class="center-down">
      <CenterDown :data="themes" />
    </section>
    <section class="center-top">
      <WarnList></WarnList>
    </section>
  </section>
</template>

<script>
import Cards from "./Charts/index";
import { getThemes } from "./theme/index";

import CenterDown from "./components/centerDown";
import WarnList from "./components/warnList";
import map2d from "./map/map2d";
import CesiumContainer from "../../cesium/components/CesiumContainer";
import {mapState} from "vuex";

export default {
  components: {
    CenterDown,
    WarnList,
    map2d,
    CesiumContainer
  },
  data() {
    return {
      layout: { cards: [], themes: [] },
      themes: []
    };
  },
  created() {
    this.getLayout();
  },
  computed: {
    ...mapState(["isEarth"])
  },
  mounted() {},
  methods: {
    async getLayout() {
      if (window.global.layout) {
        let res = await fetch(window.global.layout);
        let data = await res.json();
        this.layout = data;

        if (this.layout && this.layout.themes) {
          this.themes = getThemes(this.layout.themes);
        }
      }
    },
    getCardComponent(name) {
      let component = Cards[name];
      return component;
    }
  }
};
</script>
<style lang="scss" scoped>
.opera-home {
  .left-chart,
  .right-chart {
    width: 495px;
  }
}

</style>
