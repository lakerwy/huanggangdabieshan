<template>
  <div>
    <div class="legend boxbg" v-if="showLegend">
      <div>图例</div>
      <div class="bar"></div>
      <div class="label">
        <span>低</span>
        <span>高</span>
      </div>
    </div>
    <div class="layersManager boxbg" v-if="showLayers && layers.length">
      <div v-for="(item, index) in layers" :key="index">
        <el-tooltip
          class="item"
          effect="light"
          :content="item.name"
          placement="top"
        >
          <el-checkbox
            v-model="item.checked"
            @change="changeLayerVisible(item)"
            >{{ item.name }}</el-checkbox
          >
        </el-tooltip>
      </div>
    </div>
    <div class="card">
      <div
        v-for="(item, index) in content"
        :key="index"
        class="card-item"
        :class="{ active: thematicIndex == index }"
        @click="changeIndex(index)"
      >
        <div class="title">
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="content">
          <img :src="item.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      content: [
        {
          name: "巡护管理",
          img: "img/img-1.png"
        },
        {
          name: "周界视频",
          img: "img/img-2.png"
        },
        {
          name: "森林防火",
          img: "img/img-3.png"
        },
        {
          name: "景区热力图",
          img: "img/img-4.png"
        },
        {
          name: "专题信息",
          img: "img/img-5.png"
        }
      ],
      layers: [],
    };
  },
  computed: {
    ...mapState(["thematicIndex"]),
    showLegend() {
      if (this.thematicIndex === 2 || this.thematicIndex === 3) {
        return true;
      }
      return false;
    },
    showLayers() {
      if (this.thematicIndex === 4) {
        return true;
      }
      return false;
    }
  },
  watch: {
    showLayers() {
      this.layers = [];
      this.getLayersItem();
    }
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    changeIndex(index) {
      this.setThematicIndex(index);
    },
    getLayersItem() {
      let urls = window.global.thematicUrl;
      if (Array.isArray(urls)) {
        this.layers = urls.map((x, i) => {
          if (!x.id) {
            x.id = "thematic" + i;
          }
          x.checked = true;
          return x;
        }).reverse();
      }
    },
    changeLayerVisible(item) {
      let map = this.$parent.$refs.map.map;
      let layer = map.getLayerByKey("id", item.id)[0];
      if (layer) {
        layer.setVisible(item.checked);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.legend {
  width: 120px;
  position: absolute;
  right: 0;
  top: -80px;
  padding: 5px 10px;
  font-size: 14px;
  color: #68aafd;
  text-align: left;
  .bar {
    margin: 3px 0;
    width: 100%;
    height: 15px;
    background-image: linear-gradient(
      to right,
      #00f 0%,
      #0ff 25%,
      #0f0 50%,
      #ff0 75%,
      #f00 100%
    );
  }
  .label {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.layersManager {
  position: absolute;
  right: 0;
  // top: -80px;
  bottom: 165px;
  padding: 5px 10px;
  font-size: 14px;
  text-align: left;
  .el-checkbox {
    color: #68aafd;
  }
}

.card {
  display: inline-flex;
  .card-item {
    &:not(:first-child) {
      margin-left: 20px;
    }
    .title {
      text-align: left;
      width: 154px;
      height: 26px;
      background-image: url("../../../assets/images/bg-title.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .name {
        padding-left: 5px;
        color: #ffffff;
        font-family: MicrosoftYaHei-Bold;
        font-size: 14px;
        line-height: 26px;
      }
    }
    .content {
      margin-top: 12px;
      display: flex;
      width: 138px;
      height: 104px;
      align-items: center;
      justify-content: center;
      background-image: url("../../../assets/images/bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding: 6px 8px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    &.active {
      .title {
        background-image: url("../../../assets/images/bg-title 选中.png");
        background-size: 100% 100%;
      }
      .content {
        background-image: url("../../../assets/images/bg-选中.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>

<style lang="less">
.layersManager {
  .el-checkbox__label {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align:top;
  }
}
</style>
