<!--
 * @Author: 任继民
 * @Date: 2021-03-02 14:50:57
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-12 13:11:29
 * @Description: 头部组件
-->
<template>
  <section class="opera-header">
    <header>
      <div>综合运营展示系统</div>
    </header>
    <section class="left-nav">
      <img class="img" :src="weatherIcon" alt="" />
      <div class="curr-day">
        <div>{{ weekday }}</div>
        <div>{{ currentDate }}</div>
      </div>
      <div class="curr-time">{{ currentTime }}</div>
      <div class="map-change">
        <div :class="{'active':!isEarth}" @click="setIsEarth(false)">
          <img src="img/icon_二维.png" />
          <span>二维</span>
        </div>
        <div>|</div>
        <div :class="{'active':isEarth}" @click="setIsEarth(true)">
          <img src="img/icon_三维.png" />
          <span>三维</span>
        </div>
      </div>
    </section>
    <section class="right-nav">
      <div v-for="item in rightNav" :key="item.key" @click="changePath(item)">
        <img v-if="item.ico" class="img" :src="item.ico" alt="" />
        <span>{{ item.name }}</span>
      </div>
      <section class="ststem-list boxbg" v-show="showSytstem">
        <div
          v-for="(item, index) in systems"
          :key="index"
          @click="goNewPage(item)"
        >
          {{ item.name }}
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { getWeather } from "../../api/weather";
import { toggleFullScreen } from "@map/js/tool/baseTool";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      leftNav: [
        { name: "巡护管理", key: "1", path: "/patrol" },
        { name: "防火预警", key: "2", path: "/fireWarning" },
        { name: "周界监控", key: "3", path: "/perimeter" },
        { name: "应急通讯", key: "4", path: "/emergencyCommunication" }
      ],
      rightNav: [
        // { name: "上传", key: "5", ico: "img/上传.png", path: "/brumeMonitor" },
        { name: "搜索", key: "6", ico: "img/icon_搜索.png", path: "" },
        { name: "在线资源中心", key: "7", ico: "img/资源201.png", path: "" },
        { name: "应用系统", key: "8", ico: "img/应用系统.png", path: "" },
        { name: "基础平台", key: "9", ico: "img/icon_基础平台.png", path: "" },
        { name: "全屏", key: "10", ico: "", path: "" }
      ],
      systems: [
        { name: "巡护管理系统", path: "" },
        { name: "应急通讯指挥系统", path: "" },
        { name: "周界视频监控系统", path: "" },
        { name: "林火预警监测系统", path: "" },
        { name: "水气环境监测系统", path: "" },
        { name: "科普科教系统", path: "" },
        { name: "红外摄像头动物信息智能提取系统", path: "" }
      ],
      weekday: "星期日",
      currentDate: "0000/00/00",
      currentTime: "00:00:00",
      timer: null,
      timer1: null,
      showSytstem: false,
      weatherIcon: "img/w1.png"
    };
  },
  created() {
    let links = window.global.systems;
    if (!links) {
      return;
    }
    this.systems.forEach(x => {
      x.path = links[x.name];
    });

    this.rightNav.forEach(x => {
      x.path = links[x.name];
    });
  },
  computed: {
    ...mapState(["isEarth"])
  },
  mounted() {
    this.getDate();
    this.getWeather();
    this.timer = setInterval(this.getDate, 1000);
    this.timer1 = setInterval(this.getWeather, 1000 * 60 * 60);
    document.body.addEventListener(
      "click",
      () => {
        this.showSytstem = false;
      },
      true
    );
  },
  methods: {
    ...mapMutations(["setIsEarth"]),
    getDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date
        .getDate()
        .toString()
        .padStart(2, "0");
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      let week = weeks[date.getDay()];
      let hour = date
        .getHours()
        .toString()
        .padStart(2, "0");
      let minute = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let second = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      this.weekday = week;
      this.currentDate = `${year}/${month}/${day}`;
      this.currentTime = `${hour}:${minute}:${second}`;

      // 早6 晚18 调一次天气接口
      if ((hour == "06" || hour == "18") && minute == "00" && second == "00") {
        this.getWeather();
      }
    },
    async getWeather() {
      let result = await getWeather();
      if (!result.data) {
        return;
      }
      let today = result.data.daily[0];
      let hour = new Date().getHours();
      let code = hour > 6 && hour < 18 ? today.dayCode : today.nightCode;
      this.weatherIcon = `https://weather.cma.cn/static/img/w/icon/w${code}.png`;
    },
    changePath(item) {
      let key = item.key;
      switch (key) {
        case "5":
        case "6":
        case "7":
        case "9":
          // this.$router.push(item.path);
          this.goNewPage(item);
          break;
        case "8":
          this.showSytstem = !this.showSytstem;
          break;
        case "10":
          toggleFullScreen();
          break;
        default:
          break;
      }
    },
    goNewPage(item) {
      window.open(item.path, "_blank");
    }
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.timer1) {
      clearInterval(this.timer1);
      this.timer1 = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.opera-header {
  position: relative;
  header {
    background-image: url("../../assets/images/top.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    height: 92px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      /* height: 34px; */
      font-family: SourceHanSansCN-Medium;
      font-size: 36px;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .left-nav,
  .right-nav {
    position: absolute;
    top: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #68aaff;
      cursor: pointer;
    }
    /* div:hover {
      color: #ffffff;
    } */
  }
  .left-nav {
    left: 20px;
    color: #68a9ff;
    .img {
      width: 45px;
      height: 45px;
      background-size: 100% 100%;
    }
    .curr-day {
      margin-left: 14px;
      text-align: left;
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
    }
    .curr-time {
      margin-left: 15px;
      font-family: SourceHanSansCN-Regular;
      font-size: 30px;
    }
    .map-change {
      margin-left: 80px;
      display: inline-flex;
      align-items: center;
      > div {
        margin: 0 5px;
        display: flex;
        align-items: center;
        filter: opacity(0.6);
        &.active {
          filter: opacity(1);
        }
        > span {
          margin-left: 10px;
        }
      }
    }
  }
  .right-nav {
    right: 22px;
    top: 62px;
    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 15px;
      .img {
        margin-right: 10px;
        width: 18px;
        height: 18px;
        background-size: 100% 100%;
      }
    }
  }

  .ststem-list {
    position: absolute;
    right: 20px;
    z-index: 11111;
    background: #142059;
    color: #68aaff;
    text-align: left;
    padding: 5px 20px;
    top: 30px;
    > div {
      padding: 5px 0;
      cursor: pointer;
      &:not(:first-child) {
        border-top: 1px solid rgba(104, 170, 255, 0.5);
      }
    }
  }
}
</style>
