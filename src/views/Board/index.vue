<template>
  <div id="board">
    <div class="boardTitle">
      <div id="Time">
        <div class="curr-day">
          <div>{{ weekday }}</div>
          <div style="font-size: 14px">{{ currentDate }}</div>
        </div>
        <div class="curr-time">{{ currentTime }}</div>
      </div>
      <div class="title">地质公园综合可视化展示系统</div>
    </div>
    <div class="board-center">
      <BoardCenter />
    </div>
    <div class="board-positon" style="left: 20px">
      <div>
        <h3>公园概览</h3>
        <GYGK class="chart_bg" />
      </div>
      <div>
        <h3>气象监测</h3>
        <QXJC class="chart_bg" />
      </div>
      <div class="citys">
        <h3>视频监测</h3>
        <img
          src="../../assets/images/board-video4.png"
          alt=""
          srcset=""
          title="多屏展示"
          @click="showVideo4"
        />
        <el-select @on-change="getCity(value)" v-model="videoCity">
          <el-option
            v-for="(item,ind) in citys"
            :key="ind"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <Video class="chart_bg" :city="videoCity" />
      </div>
    </div>
    <div class="board-positon" style="right: 20px">
      <div>
        <h3>水情监测</h3>
        <SQJC class="chart_bg" />
      </div>
      <div>
        <h3>地质灾害监测</h3>
        <DZZH class="chart_bg" />
      </div>
      <div>
        <h3>噪音监测</h3>
        <ZYJC class="chart_bg" />
      </div>
    </div>
    <VideoMore ref="video4" :city="videoCity" />
  </div>
</template>

<script>
import GYGK from "./gygk.vue";
import QXJC from "./qxjc";
import DZZH from "./dzzh.vue";
import Video from "./video.vue";
import SQJC from "./sqjc.vue";
import ZYJC from "./zyjc.vue";
import VideoMore from "./videoMore.vue";
import BoardCenter from "./centerMap.vue";
import { getVideoRegion } from "@/api/board";

export default {
  components: {
    GYGK,
    QXJC,
    DZZH,
    Video,
    SQJC,
    ZYJC,
    BoardCenter,
    VideoMore
  },
  data() {
    return {
      weekday: "星期日",
      currentDate: "0000/00/00",
      currentTime: "00:00:00",
      timer: null,
      timer1: null,
      showSytstem: false,
      videoCity: '',
      citys: [],
      showVideo:false
    };
  },
  mounted() {
    this.getDate();
    this.initVideoRegion();
    this.timer = setInterval(this.getDate, 1000);
    this.timer1 = setInterval(this.getWeather, 1000 * 60 * 60);
  },
  created() { },
  methods: {
    initVideoRegion() {
      getVideoRegion().then((res) => {
        if(res.body.length && res.success){
          this.citys=res.body
          this.videoCity=res.body[0];
        }
      });
    },
    showVideo4() {
      this.$refs.video4.showVideoFlag = true;
      this.$refs.video4.videoCity=this.videoCity;
      this.$refs.video4.getArr(this.videoCity);
    },
    getCity(val){
      this.videoCity=val;
    },
    getDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let week = weeks[date.getDay()];
      let hour = date.getHours().toString().padStart(2, "0");
      let minute = date.getMinutes().toString().padStart(2, "0");
      let second = date.getSeconds().toString().padStart(2, "0");
      this.weekday = week;
      this.currentDate = `${year}/${month}/${day}`;
      this.currentTime = `${hour}:${minute}:${second}`;
    },
  },
  // beforeDestroy() {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //     this.timer = null;
  //   }
  //   if (this.timer1) {
  //     clearInterval(this.timer1);
  //     this.timer1 = null;
  //   }
  // },
};
</script>


<style scoped lang="less" >
.boardTitle {
  width: 100%;
  height: 92px;
  background: url("../../assets/images/board-title.png") no-repeat 76px 12px;
  #Time {
    position: absolute;
    top: 24px;
    left: 20px;
    color: #68cbff;
  }
}
.title {
  font-size: 36px;
  font-weight: bold;
  color: #64bdff;
  position: absolute;
  top: 22px;
  left: 38%;
  font-family: "SourceHanSansCN";
}
#board {
  height: 100%;
  width: 100%;
  background: url("../../assets/images/mapMask.png") no-repeat;
  background-size: 100% 100%;
}
.curr-day {
  margin-left: 14px;
  text-align: left;
  font-size: 12px;
  float: left;
}
.curr-time {
  margin-left: 15px;
  font-size: 30px;
  float: left;
}
#Time {
  color: #68cbff;
}
.chart_bg {
  background: url("../../assets/images/chart_bg.png") no-repeat;
  background-size: 100% 100%;
}
.board-positon {
  position: absolute;
  width: 26%;
  min-width: 490px;
  top: 76px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 92px);
  justify-content: space-between;
  > div {
    height: 33%;
  }
}
h3 {
  text-indent: 44px;
  background: url("../../assets/images/chart-icon.png") no-repeat 12px 9px;
  font-size: 17px;
  color: #68cbff;
  margin: 0;
  height: 37px;
  line-height: 37px;
}
.board-center {
  width: 45%;
  min-width: 860px;
  height: calc(100% - 120px);
  margin: 0 auto;
}
.citys {
  position: relative;
  img {
    position: absolute;
    top: 7px;
    right: 12px;
    width: 24px;
    cursor: pointer;
  }
  .el-select {
    position: absolute;
    top: 2%;
    right: 48px;
    /deep/.el-input {
      width: 100px;
      .el-input__suffix {
        top: -5px;
      }
    }
    /deep/.el-input__inner {
      color: #fff;
      background-color: #061a2e;
      border: 1px solid #0f70a1;
      height: 28px;
      line-height: 28px;
      padding-right: 26px;
      padding-left: 10px;
    }
  }
}
</style>