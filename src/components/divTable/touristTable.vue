<template>
  <div class="table">
    <div class="header">
      <ul>
        <li class="li_1">景区名称</li>
        <li class="li_2">所处范围</li>
        <li class="li_3">日极限容量</li>
        <li class="li_4">日最佳容量</li>
        <li class="li_5">实时入区人数</li>
      </ul>
    </div>
    <div class="column">
      <vue-seamless-scroll
        :data="tableData"
        class="seamless-warp"
        :class-option="classOption"
      >
        <ul
          v-for="(item, index) in tableData"
          :key="index"
          :class="{ rowClass: index % 2 == 0 }"
        >
          <li class="li_1">{{ item.name }}</li>
          <li class="li_2">{{ item.place }}</li>
          <li class="li_3">{{ item.max_capacity }}</li>
          <li class="li_4">{{ item.best_capacity }}</li>
          <li class="li_5" :style="activeClass(item)">
            {{ item.real_tourist }}
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    activeClass(item) {
      if (item.real_tourist > item.max_capacity) {
        return "color: red";
      } else if (
        item.real_tourist < item.max_capacity &&
        item.real_tourist > item.best_capacity
      ) {
        return "color: #fff32f";
      }
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        display: inline-block;
        font-family: DINNextW1G;
        font-size: 15px;
        font-weight: bold;
        color: #68a9ff;
        padding: 10px 0;
        text-align: center;
      }
    }
  }
  .column {
    .rowClass {
      background: #15224b;
      border-radius: 18px;
    }
    .seamless-warp {
      height: auto;
      overflow: hidden;
    }
    ul:hover {
      background: #15224b;
      border-radius: 18px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        display: inline-block;
        font-family: DINNextW1G;
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        padding: 10px 0;
        text-align: center;
        line-height: 30px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .li_1 {
    width: 70px;
    height: 30px;
  }
  .li_2 {
    width: 120px;
    height: 30px;
  }
  .li_3 {
    width: 85px;
    height: 30px;
  }
  .li_4 {
    width: 95px;
    height: 30px;
  }
  .li_5 {
    width: 90px;
    height: 30px;
  }
}
</style>
