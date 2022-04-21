<template>
  <div class="table">
    <div class="header">
      <ul>
        <li class="li_1 li_center">序号</li>
        <li class="li_2 li_center">站点</li>
        <li class="li_5 li_center">大气质量</li>
        <li class="li_3">
          <div>海拔</div>
          <div>(m)</div>
        </li>
        <li class="li_4">
          <div>PM2.5</div>
          <div>(ug/l)</div>
        </li>
        <li class="li_6">
          <div>O3</div>
          <div>(ug/l)</div>
        </li>
        <li class="li_7 li_center">站点情况</li>
      </ul>
    </div>
    <div class="column">
      <vue-seamless-scroll
        :data="realTableData"
        class="seamless-warp"
        :class-option="classOption"
      >
        <ul
          v-for="(item, index) in realTableData"
          :key="index"
          :class="{ rowClass: index % 2 == 0 }"
          @click="go(item)"
        >
          <li class="li_1">{{ item.id }}</li>
          <li class="li_2">{{ item.stationName }}</li>
          <li class="li_3">{{ item.airLevel }}</li>
          <li class="li_5">{{ item.elevation }}</li>
          <li class="li_4">{{ item.PM25 }}</li>
          <li class="li_6">{{ item.O3 }}</li>
          <li class="li_7">{{ item.condition }}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import emitter from "../../event";
export default {
  props: {
    realTableData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      };
    }
  },
  methods: {
    go(item) {
      emitter.emit("positioningById", [item.lon, item.lat]);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 480px;
  height: 280px;
  overflow: hidden;
  .header {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      .li_center {
        line-height: 50px;
      }
      li {
        display: inline-block;
        font-family: DINNextW1G;
        font-size: 12px;
        font-weight: bold;
        color: #68a9ff;
        text-align: center;
        vertical-align: top;
        height: 50px;
        div:nth-child(1) {
          margin-top: 10px;
        }
        div {
          font-family: DINNextW1G;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }
  .column {
    margin: 0 auto;
    width: 480px;
    height: 150px;
    overflow-y: hidden;
    .rowClass {
      background: #15224b;
      border-radius: 15px;
    }
    ul:hover {
      background: #15224b;
      border-radius: 18px;
    }
    .seamless-warp {
      height: 174px;
      overflow: hidden;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        display: inline-block;
        font-family: DINNextW1G;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        height: 30px;
        text-align: center;
        line-height: 30px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .li_1 {
    width: 40px;
  }
  .li_2 {
    width: 70px;
  }
  .li_3 {
    width: 68px;
  }
  .li_4 {
    width: 70px;
  }
  .li_5 {
    width: 70px;
  }
  .li_6 {
    width: 70px;
  }
  .li_7 {
    width: 70px;
  }
}
</style>
