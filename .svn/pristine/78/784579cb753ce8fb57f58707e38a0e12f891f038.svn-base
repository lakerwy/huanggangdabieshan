<!--
 * @Author: 任继民
 * @Date: 2021-03-03 10:03:28
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-21 13:20:17
 * @Description: 左侧信息
-->
<template>
  <section class="leftinof">
    <ContentBox
      class="box1"
      :headName="'森林防火'"
      @click.native="setThematicIndex(2)"
    >
      <section class="list">
        <div v-for="(item, index) in weathInfo" :key="index" class="list-d">
          <img :src="item.ico" alt="" />
          <section>
            <div class="name">{{ item.name }}</div>
            <div>
              <span class="num">{{ item.num }}</span
              ><span class="unit">{{ item.unit }}</span>
            </div>
          </section>
        </div>
      </section>
      <section class="linhuo warnlist">
        <div class="info">
          <section>
            <div>当日内</div>
            <div>
              <span class="num">{{ alarmList.alarmVedio }}</span
              ><span>次</span>
            </div>
          </section>
        </div>
        <div class="name">林火视频报警</div>
        <div class="bg">
          <img src="img/Stereogram.png" alt="" />
        </div>
      </section>
      <section class="hongwai warnlist">
        <div class="info">
          <section>
            <div>当日内</div>
            <div>
              <span class="num">{{ alarmList.alarmInfrared }}</span
              ><span>次</span>
            </div>
          </section>
        </div>
        <div class="name">林火红外报警</div>
        <div class="bg">
          <img src="img/Stereogram.png" alt="" />
        </div>
      </section>
      <section class="fangdao warnlist">
        <div class="info">
          <section>
            <div>当日内</div>
            <div>
              <span class="num">{{ alarmList.alarmGuard }}</span
              ><span>次</span>
            </div>
          </section>
        </div>
        <div class="name">防盗报警</div>
        <div class="bg">
          <img src="img/Stereogram.png" alt="" />
        </div>
      </section>
      <!-- 中心文字 -->
      <section class="center-text">
        <div>
          历史总报警次数<span class="num">{{ alarmList.alarmAll }}</span
          >次
        </div>
        <div>
          本年度发生火灾<span class="num">{{ alarmList.alarmFire }}</span
          >次
        </div>
      </section>
      <div class="bottom-bg"></div>
    </ContentBox>
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
    <ContentBox
      class="box3"
      :headName="'景区流量'"
      @click.native="setThematicIndex(3)"
    >
      <section class="scen-header">
        <div>
          <span>{{ currentDate }} 入区总人数</span>
        </div>
        <div class="num">
          <span class="num-num">{{ numTotal }}</span
          ><span>人</span>
        </div>
      </section>
      <section style="overflow: auto; padding: 0 10px">
        <TourTable :tableData="tableData"></TourTable>
      </section>
    </ContentBox>
    <!-- <section class="sensor">
      <div id="Sensor" class="Sensor"></div>
    </section>
    <HeadLine :titleName='"预警展示"'></HeadLine>
    <section class="sensor">
      <div id="earlyWarn" class="earlyWarn"></div>
    </section> 
    <HeadLine :titleName='"事件统计"'></HeadLine>
    <section class="sensor">
      <div id="eventslist" class="eventslist"></div>
    </section>           -->
  </section>
</template>
<script>
import { mapMutations } from "vuex";
// import HeadLine from '../../../components/headLine/index'
import ContentBox from "../../../components/box/index";
import {
  TourTable,
  RealTable,
  AirRealTable
} from "../../../components/divTable";
import { initEcharts } from "../../../utils/util";
import echartsOptions from "./echartOption";
import {
  getAirbyClassify,
  getAirShow,
  getAlarmList,
  getAlarmTotal,
  getTouristShow,
  getWaterbyClassify,
  getWaterRealShow
} from "../../../api/home";
import * as echarts from "echarts";
import {
  airTodayData,
  alarmListData,
  alarmTotalData,
  atmosData,
  realData,
  touristData,
  waterbyData,
  weatherData
} from "../../../../tests/data/homeData";
import { getWeather } from "../../../api/weather";

export default {
  components: {
    // HeadLine,
    ContentBox,
    TourTable,
    RealTable,
    AirRealTable
  },
  data() {
    return {
      weathInfo: [
        { name: "风速", ico: "img/风速-icon.png", num: "0", unit: "ms/s" },
        { name: "风向", ico: "img/风向-icon.png", num: "0", unit: "" },
        { name: "雨量", ico: "img/雨量-icon.png", num: "0", unit: "mm" },
        { name: "大气温度", ico: "img/大气温度-icon.png", num: "0", unit: "℃" }
      ],
      steamlist: [
        { name: "水质类别分布" },
        { name: "大气类别分布" },
        { name: "水文实时监测" },
        { name: "空气实时监测" }
      ],
      currentSteamIndex: 0,
      tableData: [],
      realTableData: [],
      airRealData: [],
      numTotal: 0,
      currentDate: "",
      alarmList: {
        alarmVedio: 0,
        alarmInfrared: 0,
        alarmGuard: 0,
        alarmAll: 0,
        alarmFire: 0
      },
      airO3: 0,
      airPM: 0,
      intervalId: null,
      timerWeather: null
    };
  },
  created() {
    this.getWeathInfo();
    this.initData();
  },
  mounted() {
    this.initPage();
    this.dataRefreh();
  },
  destroyed() {
    this.clear();
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    getTiemShow() {
      let date = new Date();
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      return `${month}月${day}号`;
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.initData(); //加载数据函数
        this.initPage();
      }, 60000);
      this.timerWeather = setInterval(() => {
        this.getWeathInfo();
      }, 1000 * 60 * 60);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      clearInterval(this.timerWeather); //清除计时器
      this.intervalId = null; //设置为null
      this.timerWeather = null;
    },
    initData() {
      this.getAlarmList();
      this.getWaterReal();
      this.getAirReal();
      this.getTourist();
    },
    initPage() {
      this.getWaterby();
      this.getAtmosphere();
    },
    //查询当日气象数据
    async getWeathInfo() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = weatherData;
      } else {
        // result = await getWeatherShow();
        result = await getWeather();
      }
      this.weathInfo[0].num = this.checkNumber(result.data.now.windSpeed);
      this.weathInfo[1].num = this.checkNumber(result.data.now.windDirection);
      this.weathInfo[2].num = this.checkNumber(result.data.now.precipitation);
      this.weathInfo[3].num = this.checkNumber(result.data.now.temperature);
    },
    checkNumber(str) {
      let num;
      let reg = /^[0-9]+.?[0-9]*$/;
      num = reg.test(str) ? Number(str) : str;
      return num;
    },
    getWindSpeed(num) {
      let speed = "";
      if (num == 0 || num == 360) {
        speed = "北风";
      } else if (num > 0 && num < 90) {
        speed = "东北风";
      } else if (num == 90) {
        speed = "东风";
      } else if (num > 90 && num < 180) {
        speed = "东南风";
      } else if (num == 180) {
        speed = "南风";
      } else if (num > 180 && num < 270) {
        speed = "西南风";
      } else if (num == 270) {
        speed = "西风";
      } else if (num > 270 && num < 360) {
        speed = "西北风";
      }
      return speed;
    },
    //报警
    getDataStr(temp) {
      let d = new Date(temp);
      let time =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return time;
    },
    async getAlarmList() {
      let stamp = echartsOptions.getTimeStamp;
      let startTime = stamp.getToday();
      let endTime = Math.floor(
        new Date(new Date().setHours(23, 59, 59, 0)).getTime()
      );
      let alarm = null;
      let alarmTotal = null;
      if (process.env.NODE_ENV === "test") {
        alarm = alarmListData;
        alarmTotal = alarmTotalData;
      } else {
        alarm = await getAlarmList({
          begin_time: this.getDataStr(startTime),
          end_time: this.getDataStr(endTime)
        });
        alarmTotal = await getAlarmTotal({});
      }
      if (alarm.code == 200) {
        //报警次数
        this.alarmList.alarmVedio = alarm.data.alarm_video;
        this.alarmList.alarmInfrared = alarm.data.alarm_infrared;
        this.alarmList.alarmGuard = alarm.data.alarm_guard;
      }
      if (alarmTotal.code == 200) {
        //统计报警次数
        this.alarmList.alarmAll = alarmTotal.data.total_alarm;
        this.alarmList.alarmFire = alarmTotal.data.total_fire;
      }
    },
    //水质检测
    async getWaterby() {
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = waterbyData;
      } else {
        res = await getWaterbyClassify();
      }
      if (res.code == 200) {
        initEcharts("leftChart", echartsOptions.steamOptions(res.data));
      }
    },
    // 大气监测
    async getAtmosphere() {
      let res = null;
      let airToday = null;
      if (process.env.NODE_ENV === "test") {
        res = atmosData;
        airToday = airTodayData;
      } else {
        res = await getAirbyClassify();
        airToday = await getAirShow({});
      }
      if (res.code == 200) {
        //大气类别分布
        initEcharts("leftChart2", echartsOptions.atmosphereOptions(res.data));
      }
      if (airToday.code == 200) {
        //当日空气质量
        this.airO3 = airToday.data.o3;
        this.airPM = airToday.data["pm2.5"];
      }
    },
    //实时检测
    // type=1 查询实时水文 type=2 查询实时空气质量
    // async WaterReal() {
    //   let res = await getWaterRealShow({
    //     type: 1,
    //   })
    //   console.log(res)
    // },
    //查询实时水文
    async getWaterReal() {
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = realData;
      } else {
        res = await getWaterRealShow({
          type: 1
        });
      }
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
    //查询实时空气
    async getAirReal() {
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = realData;
      } else {
        res = await getWaterRealShow({
          type: 2
        });
      }
      console.log(res.data);
      if (res.code == 200) {
        this.airRealData = this.dealAirValue(res.data);
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
    //景区流量
    async getTourist() {
      this.numTotal = 0;
      this.tableData = [];
      this.currentDate = this.getTiemShow();
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = touristData;
      } else {
        res = await getTouristShow();
      }
      if (res.code == 200 && res.data) {
        this.numTotal = res.data.total;
        this.tableData = res.data.detail;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (!row) {
        return "odd-row";
      }
      if (rowIndex % 2 == 0) {
        return "odd-row";
      } else {
        return "even-row";
      }
    },
    getCurrentSteamIndex(index) {
      this.currentSteamIndex = index;
      // if(this.currentSteamIndex == 0){
      //   // this.getWaterby();
      // } else if(this.currentSteamIndex == 1){
      //   // initEcharts('leftChart',echartsOptions.atmosphereOptions(234));
      // } else if (this.currentSteamIndex == 2){
      //   // initEcharts('leftChart',echartsOptions.eventsOptions);
      // }
      this.$nextTick(() => {
        let echartDom = echarts.getInstanceByDom(this.$refs.chart1);
        let echartDom2 = echarts.getInstanceByDom(this.$refs.chart2);
        if (echartDom) {
          echartDom.resize();
          echartDom2.resize();
        }
      });

      this.$emit("index", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.leftinof {
  .box1 {
    height: 292px;
    position: relative;

    .list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 15px;

      .equip {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #ffffff;
      }

      .list-d {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 45px;
          height: 45px;
        }
        section {
          margin-left: 8px;
          text-align: left;

          .name,
          .unit {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #ffffff;
          }

          .num {
            font-family: DINNextW1G;
            font-size: 14px;
            color: #fff32f;
          }
        }
      }
    }

    .warnlist {
      width: 118px;

      .info {
        width: 118px;
        height: 35px;
        background-image: url("../../../assets/images/框1.1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 16px;
        section {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;

          div:first-child {
            margin-right: 5px;
          }

          .num {
            color: #fff32f;
          }
        }

        section:first-child {
          padding-top: 7px;
        }
      }

      .name {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #68e1ff;
      }

      .bg {
        width: 117px;
        height: 54px;
        background-size: 100% 100%;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .center-text {
      left: 178px;
      bottom: 25px;
      position: absolute;
      color: #ffffff;
      text-align: left;
      z-index: 2;
      font-size: 16px;
      .num {
        color: #fff32f;
        padding: 0 5px;
      }
    }

    .linhuo {
      left: 20px;
      bottom: 35px;
      position: absolute;
    }

    .hongwai {
      left: 189px;
      bottom: 65px;
      position: absolute;
    }

    .fangdao {
      right: 28px;
      bottom: 35px;
      position: absolute;
    }

    .bottom-bg {
      width: 495px;
      position: absolute;
      bottom: 0;
      background-image: url("../../../assets/images/底座.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 90% 100%;
      height: 52px;
    }
  }

  .box2 {
    margin-top: 10px;
    height: 285px;

    .steam-btn {
      display: flex;
      justify-content: center;
      margin: 5px 0;

      .list {
        width: 84px;
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

  .box3 {
    margin-top: 10px;
    height: 350px;

    .scen-header {
      background: url("../../../assets/images/组 68.png") no-repeat;
      background-size: cover;
      height: 57px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      position: relative;
      font-size: 16px;

      .num {
        margin-left: 64px;

        .num-num {
          font-family: DINNextW1G;
          font-size: 36px;
          font-weight: bold;
          margin-right: 13px;
        }
      }
    }
  }

  .Sensor {
    height: 241px;
  }

  .earlyWarn {
    height: 271px;
  }

  .eventslist {
    height: 227px;
  }
}
</style>
<style>
.el-table .odd-row {
  background: #15224b !important;
  border-radius: 18px !important;
}

.el-table .even-row {
  background: transparent !important;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}
</style>
