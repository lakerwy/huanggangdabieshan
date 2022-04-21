<template>
  <div class="container" v-if="list && list.length">
    <img class="warn-icon" src="img/icon-预警轮播.png" />
    <div class="warn-list">
      <vue-seamless-scroll :data="list" :class-option="defaultOption">
        <div v-for="(item, index) in list" :key="index" class="warn-item ">
          <div>
            【{{ item.eventTypeName }}】 {{ item.startTime | dateFormate }}
          </div>
          <div class="content">{{ item.resName }}</div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import { warnData } from "../../../../tests/data/warn";
import { getCameraWarnRequest } from "../../../api/thematic";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      list: [],
      timer: null
    };
  },
  filters: {
    dateFormate(value) {
      if (value) {
        return value.substr(11, 8).replace("T", " ");
      }
      return null;
    }
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  mounted() {
    this.getWarnDate();
    this.timer = setInterval(this.getWarnDate, 1000 * 60);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    async getWarnDate() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = warnData;
      } else {
        result = await getCameraWarnRequest();
      }

      if (result.code == 200) {
        this.list = result.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  border: solid 1px #ef2626;
  color: #fff;
  display: inline-flex;
  font-size: 14px;
  text-align: left;
  padding: 2px;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  .warn-icon {
    width: 25px;
    height: 22px;
  }

  .warn-list {
    height: 40px;
    overflow: hidden;
    .warn-item {
      display: flex;
      margin: 2px 0;
      .content {
        margin-left: 5px;
        color: #ef2626;
        font-weight: bold;
        width: 630px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
