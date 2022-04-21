<template>
  <ContentBox
    class="box1"
    :headName="'周界监控'"
    @click.native="setThematicIndex('ZJSP')"
  >
    <section>
      <div id="monitorChart" class="monitorChar"></div>
    </section>
    <section class="steam-btn">
      <div
        v-for="(item, index) in monitorlist"
        :key="index"
        class="list"
        :class="{ steamBtnActive: currentIndex == index }"
        @click="getCurrentIndex(index)"
      >
        {{ item.name }}
      </div>
    </section>
  </ContentBox>
</template>
<script>
import ContentBox from "../../../components/box/index";
import { getMonitorbyCalendar } from "../../../api/home";
import { mapMutations } from "vuex";
import { initEcharts } from "../../../utils/util";
import echartsOptions from "./echartOption";
import { monitorArr } from "../../../../tests/data/homeData";

export default {
  components: {
    ContentBox
  },
  data() {
    return {
      timerPartol: null,
      // partolIndex:0,
      currentIndex: 0,
      monitorlist: [
        { name: "当日" },
        { name: "本周" },
        { name: "本月" },
        { name: "本年" }
      ]
    };
  },
  destroyed() {
    this.clear();
  },
  mounted() {
    this.initPage();
    this.getTimeRoll();
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    getCurrentIndex(index) {
      this.currentIndex = index;
      this.getMonitorby(index);
    },
    initPage() {
      this.getMonitorby(this.currentIndex);
    },
    //周界监控
    async getMonitorby(index) {
      let res = null;
      let timeParams = this.timeStamp();
      if (process.env.NODE_ENV === "test") {
        res = monitorArr[index];
      } else {
        res = await getMonitorbyCalendar(timeParams[index]);
      }
      if (res.code == 200) {
        initEcharts("monitorChart", echartsOptions.monitOptions(res.data.list));
      }
    },
    timeStamp() {
      let stamp = echartsOptions.getTimeStamp;
      let now = stamp.getNowTime();
      let today = stamp.getToday();
      let week = stamp.getWeek();
      let month = stamp.getMonth();
      let year = stamp.getYear();
      return [
        {
          beginTime: today,
          endTime: now
        },
        {
          beginTime: week,
          endTime: now
        },
        {
          beginTime: month,
          endTime: now
        },
        {
          beginTime: year,
          endTime: now
        }
      ];
    },
    getTimeRoll() {
      if (this.timerRoll != null) {
        return;
      }
      this.timerRoll = setInterval(() => {
        this.currentIndex++;
        // this.partolIndex++;
        if (this.currentIndex > this.monitorlist.length - 1) {
          this.currentIndex = 0;
        }
        // if (this.partolIndex > this.monitorlist.length - 1) {
        //   this.partolIndex = 0;
        // }
        this.getCurrentIndex(this.currentIndex);
        // this.getPartolIndex(this.partolIndex);
      }, 1000 * 60);
    },
    // getPartolIndex(index) {
    //   this.partolIndex = index;
    // },
    clear() {
      clearInterval(this.timerPartol); //清除计时器
      this.timerPartol = null; //设置为null
    }
  }
};
</script>
<style scoped lang="less">
.box1 {
  position: relative;

  .steam-btn {
    position: absolute;
    top: 26%;
    right: 0;

    .list {
      width: 37px;
      height: 28px;
      box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
      border: solid 1px #1c91ff;
      padding: 0 10px;
      line-height: 28px;
      font-size: 12px;
      font-family: SourceHanSansCN-Medium;
      color: #68a9ff;
      margin-right: 15px;
      margin-top: 10px;
      cursor: pointer;
      font-size: 14px;
    }

    .list:hover,
    .steamBtnActive {
      box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
      border: solid 1px #68e1ff;
      color: #ffffff;
    }
  }

  .monitorChar {
    height: 253px;
    width: 80%;
    margin: 20px 10px;
  }
}
</style>
