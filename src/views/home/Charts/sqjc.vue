<template>
  <ContentBox class="box2" :headName="'水气监测'">
    <section class="steam-btn">
      <div
        v-for="(item, index) in steamlist"
        :key="index"
        class="list"
        :class="{ steamBtnActive: currentSteamIndex == index }"
        @click="getCurrentSteamIndex(index)"
      >
        {{ item.name }}
      </div>
    </section>
    <section>
      <div
        v-show="currentSteamIndex == 0"
        class="left-chart"
        id="leftChart"
        ref="chart1"
      ></div>
      <div v-show="currentSteamIndex == 1" style="position: relative">
        <div class="left-chart" id="leftChart2" ref="chart2"></div>
        <div class="airQuality" style="">
          <section>
            <img src="img/icon_O3.png" alt="" />
            <div>
              <div>O3</div>
              <div>
                <span class="num">{{ airO3 }}</span
                ><span class="unit"> ug/m3</span>
              </div>
            </div>
          </section>
          <section class="icon-PM25">
            <img src="img/icon_PM2.5.png" alt="" />
            <div>
              <div>PM2.5</div>
              <div>
                <span class="num">{{ airPM }}</span
                ><span class="unit"> ug/m3</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div v-if="currentSteamIndex == 2" style="padding: 0 10px;">
        <RealTable :realTableData="realTableData"></RealTable>
      </div>
      <div v-if="currentSteamIndex == 3" style="padding: 0 10px;">
        <AirRealTable :realTableData="airRealData"></AirRealTable>
      </div>
    </section>
  </ContentBox>
</template>
<script>
import ContentBox from "../../../components/box/index";
import { mapMutations } from "vuex";
import echartsOptions from "./echartOption";
import * as echarts from "echarts";
import { RealTable, AirRealTable } from "../../../components/divTable";
import {
  // airTodayData,
  // atmosData,
  // realData,
 // waterbyData
} from "../../../../tests/data/homeData";
import { initEcharts } from "../../../utils/util";
import {
  getAirbyClassify,
  getAirShow,
  getWaterRealShow,
  getWaterbyClassify
} from "../../../api/home";
export default {
  components: {
    ContentBox,
    RealTable,
    AirRealTable
  },
  data() {
    return {
      steamlist: [
        { name: "水质类别分布" },
        { name: "大气类别分布" },
        { name: "水文实时监测" },
        { name: "空气实时监测" }
      ],
      currentSteamIndex: 0,
      airO3: 0,
      airPM: 0,
      airRealData: [],
      realTableData: [],
      intervalId: null
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.initPage();
    this.dataRefreh();
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    // 定时刷新数据函数
    getCurrentSteamIndex(index) {
      this.currentSteamIndex = index;
      this.$nextTick(() => {
        let echartDom = echarts.getInstanceByDom(this.$refs.chart1);
        let echartDom2 = echarts.getInstanceByDom(this.$refs.chart2);
        if (echartDom) {
          echartDom.resize();
          echartDom2.resize();
        }
      });

      if (index === 2) {
        this.setThematicIndex("SWJC");
      } else if (index === 3) {
        this.setThematicIndex("KQJC");
      }
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.init(); //加载数据函数
        this.initPage();
      }, 60000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    init() {
      this.getWaterReal();
      this.getAirReal();
    },
    initPage() {
      this.getWaterby();
      this.getAtmosphere();
    },
    //查询实时空气
    async getAirReal() {
      let res = null;
      // if (process.env.NODE_ENV === "test") {
      //   res = realData;
      // } else {
        res = await getWaterRealShow({
          type: 2
        });
      // }
      // console.log(res.data);
      if (res.code == 200) {
        this.airRealData = this.dealAirValue(res.data);
      }
    },
    //水质检测
    async getWaterby() {
      let res = null;
      // if (process.env.NODE_ENV === "test") {
      //   res = waterbyData;
      // } else {
        res = await getWaterbyClassify();
      // }
      if (res.code == 200) {
        initEcharts("leftChart", echartsOptions.steamOptions(res.data));
      }
    },
    dealAirValue(res) {
      let arr = res.map(i => {
        return {
          id: i.wgGatherStation.gatherStationId,
          stationName: i.wgGatherStation.shortName,
          airLevel: i.airLevel || "优",
          elevation: i.wgGatherStation.gatherStationElevation,
          PM25: this.getRealValue(i.indicatorGatherValueList, "PM2.5"),
          O3: this.getRealValue(i.indicatorGatherValueList, "臭氧"),
          condition: i.wgGatherStation.state == "0" ? "正常" : "不正常",
          lon: parseFloat(i.wgGatherStation.gatherStationLongitude),
          lat: parseFloat(i.wgGatherStation.gatherStationLatitude)
        };
      });
      return arr;
    },
    //查询实时水文
    async getWaterReal() {
      let res = null;
      // if (process.env.NODE_ENV === "test") {
      //   res = realData;
      // } else {
        res = await getWaterRealShow({
          type: 1
        });
      // }
      if (res.code == 200) {
        this.realTableData = this.dealRealValue(res.data);
      }
    },
    //处理数据
    dealRealValue(res) {
      let arr = res.map(x => {
        return {
          id: x.wgGatherStation.gatherStationId,
          stationName: x.wgGatherStation.shortName,
          waterLevel: this.getRealValue(x.indicatorGatherValueList, "水质等级"),
          cod: this.getRealValue(x.indicatorGatherValueList, "高锰酸盐指数"),
          Hn: this.getRealValue(x.indicatorGatherValueList, "PH值"),
          phosphorus: this.getRealValue(x.indicatorGatherValueList, "总磷"),
          nitrogen: this.getRealValue(x.indicatorGatherValueList, "总氮"),
          oxygen: this.getRealValue(x.indicatorGatherValueList, "溶解氧"),
          lon: parseFloat(x.wgGatherStation.gatherStationLongitude),
          lat: parseFloat(x.wgGatherStation.gatherStationLatitude)
        };
      });
      return arr;
    },
    getRealValue(arr, val) {
      let value;
      arr.forEach(item => {
        if (item.gatherIndicatorName == val) {
          value = item.avgMetaValue;
        }
      });
      return value;
    },
    // 大气监测
    async getAtmosphere() {
      let res = null;
      let airToday = null;
      // if (process.env.NODE_ENV === "test") {
      //   res = atmosData;
      //   airToday = airTodayData;
      // } else {
        res = await getAirbyClassify();
        airToday = await getAirShow({});
      // }
      if (res.code == 200) {
        //大气类别分布
        initEcharts("leftChart2", echartsOptions.atmosphereOptions(res.data));
      }
      if (airToday.code == 200) {
        //当日空气质量
        this.airO3 = airToday.data.o3;
        this.airPM = airToday.data["pm2.5"];
      }
    }
  }
};
</script>
<style scoped lang="less">
.box2 {
  .steam-btn {
    display: flex;
    justify-content: center;
    margin: 5px 0;

    .list {
      width: 92px;
      height: 28px;
      box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
      border: solid 1px #1c91ff;
      padding: 0 10px;
      line-height: 28px;
      font-size: 12px;
      font-family: SourceHanSansCN-Medium;
      color: #68a9ff;
      margin-right: 5px;
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

  .left-chart {
    height: 190px;
  }

  .airQuality {
    position: absolute;
    right: 20px;
    top: 30%;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #ffffff;
    text-align: left;

    img {
      width: 36px;
      height: 36px;
    }

    section {
      > div {
        display: inline-block;
        margin-left: 10px;

        .num {
          font-family: DINNextW1G;
          font-size: 14px;
          color: #fff32f;
        }
      }
    }

    .icon-PM25 {
      position: absolute;
      top: 150%;
    }
  }
}
#leftChart {
  margin-top: 22px;
}
#leftChart2 {
  margin-top: 12px;
}
</style>
