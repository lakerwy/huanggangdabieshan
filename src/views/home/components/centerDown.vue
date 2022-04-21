<template>
  <div class="theme-container">
    <div class="legend boxbg" v-if="currenInfo.legend">
      <div>图例</div>
      <div class="bar"></div>
      <div class="label">
        <span>低</span>
        <span>高</span>
      </div>
    </div>
    <div class="layersManager boxbg" v-if="currenInfo.layersManager">
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
        v-for="(item, index) in data"
        :key="index"
        class="card-item"
        :class="{ active: thematicIndex == item.id }"
        @click="changeIndex(item)"
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
import emitter from "@/event";

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      layers: [],
      currenInfo: {}
    };
  },
  computed: {
    ...mapState(["thematicIndex"])
  },
  mounted() {
    this.init();
    emitter.on("showLayerManager", this.showLayerManager);
  },
  watch: {
    data() {
      this.init();
    }
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    init() {
      if (!this.data.length) {
        return;
      }

      if (!this.thematicIndex) {
        this.changeIndex(this.data[0]);
      } else {
        let item = this.data.filter(x => {
          return x.id === this.thematicIndex;
        })[0];
        if (item) {
          this.changeIndex(item);
        }
      }
    },
    changeIndex(item) {
      this.setThematicIndex(item.id);
      this.currenInfo = item;
    },
    showLayerManager(layers) {
      this.layers = layers;
    },
    changeLayerVisible(item) {
      emitter.emit("changeLayerVisible", item, "id");
    }
  }
};
</script>

<style lang="less" scoped>
.theme-container {
  width: 850px;

  ::-webkit-scrollbar {
    height: 5px;
  }
}

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
  display: flex;
  width: 100%;
  overflow: auto;
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
    vertical-align: top;
  }
}
</style>
