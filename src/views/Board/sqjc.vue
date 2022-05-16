<template>
  <div class="sqjc">
    <div class="header">
      <ul>
        <li class="li_1 li_center">序号</li>
        <li class="li_2 li_center">日期</li>
        <li class="li_3 li_center">站名/库名</li>
        <li class="li_4 li_center">水位(m)</li>
        <li class="li_5 li_center">蓄水量(m³)</li>
      </ul>
    </div>
    <div class="colunm">
      <vue-seamless-scroll
        :data="realTableData"
        class="seamless-warp"
        :class-option="classOption"
      >
        <ul v-for="(item, index) in realTableData" :key="index">
          <li class="li_1">{{ item.id }}</li>
          <li class="li_2">{{ item.recordTime }}</li>
          <li class="li_3">{{ item.reservoir }}</li>
          <li class="li_4">{{ item.reservoirLevel }}</li>
          <li class="li_5">{{ item.storeWater }}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script >
import { getWater } from "_api/board";

export default {
  data() {
    return {
      realTableData: [],
    };
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
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      };
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getWater(this.params).then((res) => {
        this.realTableData = [];
        if (res.success == true) {
          this.realTableData = res.body;
        } else {
          this.realTableData = [];
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.sqjc {
  height: calc(100% - 37px);
  width: 100%;
  .header {
    width: 100%;
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      list-style: none;
      .li_center {
        line-height: 30px;
      }
      li {
        display: inline-block;
        font-family: DINNextW1G;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        vertical-align: top;
        height: 30px;
        background-color: #14418c;
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
  .colunm {
    // margin: 0 auto;
    width: 98%;
    height: calc(100% - 37px);
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
      height: 100%;
      overflow: hidden;
    }
    ul:nth-child(odd) {
      background-color: transparent;
    }
    ul:nth-child(even) {
      background-color: #06325a;
    }
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        display: inline;
        font-family: DINNextW1G;
        font-size: 14px;
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
    width: 14%;
  }
  .li_2 {
    width: 21%;
  }
  .li_3 {
    width: 21%;
  }
  .li_4 {
    width: 21%;
  }
  .li_5 {
    width: 21%;
  }
}
</style>