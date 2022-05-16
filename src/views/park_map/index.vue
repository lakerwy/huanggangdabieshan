<template>
  <div class="park-map">
    <div class="aside">
      <div class="tab">
        <span
          v-for="(item, index) in tabArr.data"
          :key="index"
          @click="changeTab(index)"
          :class="index == activeMenu ? 'tabActive' : 'tabNormal'"
        >
          {{ item.name }}
        </span>
      </div>
      <LeftTree v-show="activeMenu == 0" ref="tree" />
      <LayerManager
        v-show="activeMenu == 1"
        ref="layer"
        @initMenu="initMenu"
        :layerObj="clickLayer.data"
      />
    </div>
    <VideoMore ref="video4" :city="videoCity" />
    <RightSearch />
    <QueryComponent :show="ifshowQuery" />
    <keep-alive>
      <mapCom v-show="!isEarth" ref="map2d" class="map-container"></mapCom>
    </keep-alive>
    <keep-alive>
      <earthCom v-show="isEarth" ref="map3d" class="map-container"></earthCom>
    </keep-alive>
    <Monitorhistory
      v-show="showHistoryInfo"
      @closeWindow="closeHistoryInfo"
      :data="HistoryArr"
      :type="HistoryType"
      :name="HistoryName"
    />
    <RelicDetails
      v-show="showMoreInfo"
      @closeWindow="closeWindow"
      :selectId="selectId"
    />
    <RelicAround
      v-show="showAroundFlag"
      @closeAround="closeAround"
      :arr="showAroundArr"
    />
    <!--      <ToolBar />-->
    <div class="map-change">
      <div :class="{ active: !isEarth }">
        <img src="imgs/二维.png" title="二维" @click="setIsEarth(false)" />
      </div>
      <div :class="{ active: isEarth }">
        <img src="imgs/三维.png" title="三维" @click="setIsEarth(true)" />
      </div>
    </div>
    <div class="legend" v-if="legendUrl">
      <h3>图例</h3>
      <i class="el-icon-close" @click="setLegendUrl('')"></i>
      <img :src="legendUrl" alt="" srcset="" />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import mapCom from "./2Dmap";
import earthCom from "./3Dmap";
import {
  defineComponent,
  ref,
  provide,
  getCurrentInstance,
  reactive,
} from "vue";
import { useStore } from "vuex";
import Footer from "_com/footer/index.vue";
import VideoMore from "../Board/videoMore.vue";
import LayerManager from "./component/LeftLayer.vue";
import QueryComponent from "./component/SearchQuery";
import RightSearch from "./component/rightSearch";
import LeftTree from "./component/LeftTree.vue";
import RelicDetails from "./popup/relic-detail";
import RelicAround from "./popup/relic-around";
import Monitorhistory from "./popup/monitor-history";
import ToolBar from "./component/toolBar";
import { mapState, mapMutations, mapGetters } from "vuex";
import { getOnemapInfo } from "../../api/remain";
import * as mapHanlder from "./mapHanlder";
import getters from "../../store/getters";

export default defineComponent({
  components: {
    mapCom,
    earthCom,
    Footer,
    LayerManager,
    RightSearch,
    LeftTree,
    RelicDetails,
    RelicAround,
    VideoMore,
    ToolBar,
    Monitorhistory,
    QueryComponent,
  },
  setup() {
    const tabArr = reactive({
      data: [{ name: "综合资源" }, { name: "图层管理" }],
    });
    const store = useStore();
    const activeMenu = ref(0);
    const clickLayer = reactive({ data: {} });
    const { proxy } = getCurrentInstance();
    const changeTab = (num) => {
      activeMenu.value = num;
    };
    //监测点 历史统计
    const showHistoryInfo = ref(false);
    const HistoryArr = ref([]);
    const HistoryType = ref(null);
    const HistoryName = ref(null);
    const closeHistoryInfo = () => {
      showHistoryInfo.value = false;
    };
    const showHistoryPage = (flag, arr, type, name) => {
      HistoryType.value = type * 1;
      showHistoryInfo.value = flag;
      HistoryArr.value = arr;
      HistoryName.value = name;
    };
    provide("showHistoryPage", showHistoryPage);

    //遗迹点 查看更多
    const showMoreInfo = ref(false);
    const selectId = ref(0);
    const closeWindow = () => {
      showMoreInfo.value = false;
    };
    const updateLocation = (val, id) => {
      showMoreInfo.value = val;
      selectId.value = id;
    };
    provide("updateLocation", updateLocation);
    //遗迹点 周边
    const showAroundFlag = ref(false);
    const showAroundArr = ref([]);
    const showAround = (val, data) => {
      showAroundFlag.value = val;
      showAroundArr.value = data;
    };
    provide("showAround", showAround);
    const closeAround = () => {
      showAroundFlag.value = false;
    };
    const emitObjToLayer = (obj) => {
      clickLayer.data = obj;
    };
    const initMenu = () => {
      // if (this.$refs.menu) {
      //   this.$refs.menu.activeMenu = 0;
      // }
    };
    return {
      showMoreInfo,
      initMenu,
      tabArr,
      selectId,
      activeMenu,
      close,
      closeWindow,
      closeAround,
      changeTab,
      emitObjToLayer,
      clickLayer,
      showHistoryInfo,
      closeHistoryInfo,
      HistoryArr,
      HistoryType,
      HistoryName,
      showAroundFlag,
      showAroundArr
    };
  },
  computed: {
    ...mapState(["isEarth", "ifshowQuery", "legendUrl"]),
  },
  mounted() {
    this.setIsEarth(this.isEarth);
    this.setLegendUrl('');
  },
  methods: {
    ...mapMutations(["SET_ISEARTH", "SET_COMPONENT", "setLegendUrl"]),
    setIsEarth(val) {
      this.SET_ISEARTH(val);
      if (val) {
        this.SET_COMPONENT(this.$refs.map3d);
      } else {
        this.SET_COMPONENT(this.$refs.map2d);
      }
    },
    //大屏展示
    dealBoard(val) {
      this.$refs.video4.showVideoFlag = true;
      this.$refs.video4.videoCity = val;
      this.$refs.video4.getArr(val);
    }
  },
});
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.park-map {
  height: calc(100% - 69px);
  .map-container {
    width: 100%;
    height: 100%;
  }
  .map-change {
    z-index: 10;
    position: absolute;
    right: 35px;
    bottom: 20px;
    margin-left: 80px;
    display: inline-flex;
    align-items: center;
    background: #ffffff;
    padding-right: 10px;
    > div {
      padding: 10px 0 10px 10px;
      display: flex;
      align-items: center;
      filter: opacity(0.6);
      cursor: pointer;
      &.active {
        filter: opacity(1);
      }
    }
  }
  .footer {
    background-color: transparent;
  }
}
p {
  color: rgb(35, 154, 229);
}
.legend {
  width: 380px;
  height: 240px;
  overflow: auto;
  position: absolute;
  z-index: 11;
  bottom: 36px;
  left: 50px;
  background: #fff;
  text-align: center;
  h3 {
    margin: 10px;
  }
  img {
    width: 356px;
  }
  i{
    font-size: 24px;
    position: absolute;
    right: 8px;
    top: 8px;
    cursor: pointer;
  }
}
.aside {
  width: 353px;
  height: 548px;
  position: absolute;
  z-index: 11;
  top: 80px;
  left: 50px;
  .tab {
    position: absolute;
    left: -36px;
    writing-mode: vertical-rl;
    color: #fff;
    .tabActive {
      background: #17629c;
      padding: 8px;
      cursor: pointer;
    }
    .tabNormal {
      background: #869097;
      padding: 8px;
      cursor: pointer;
    }
    span {
      margin-bottom: 10px;
    }
  }
}
</style>
