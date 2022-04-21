<template>
  <ContentBox
    class="box1"
    :headName="'森林防火'"
    @click.native="setThematicIndex('SLFH')"
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
</template>
<script>
import ContentBox from "../../../components/box/index";
import { mapMutations } from "vuex";
import echartsOptions from "./echartOption";
import { getWeather } from "../../../api/weather";
import {
  alarmListData,
  alarmTotalData,
  weatherData
} from "../../../../tests/data/homeData";
import { getAlarmList, getAlarmTotal } from "../../../api/home";
export default {
  components: {
    ContentBox
  },
  data() {
    return {
      weathInfo: [
        { name: "风速", ico: "img/风速-icon.png", num: "0", unit: "ms/s" },
        { name: "风向", ico: "img/风向-icon.png", num: "0", unit: "" },
        { name: "雨量", ico: "img/雨量-icon.png", num: "0", unit: "mm" },
        { name: "大气温度", ico: "img/大气温度-icon.png", num: "0", unit: "℃" }
      ],
      alarmList: {
        alarmVedio: 0,
        alarmInfrared: 0,
        alarmGuard: 0,
        alarmAll: 0,
        alarmFire: 0
      },
      intervalId: null
    };
  },
  created() {
    this.getWeathInfo();
    this.init();
  },
  mounted() {
    this.dataRefreh();
  },
  destroyed() {
    this.clear();
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.init(); //加载数据函数
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
    init() {
      this.getAlarmList();
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
    }
  }
};
</script>
<style scoped lang="less">
.box1 {
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
</style>
