<template>
  <div>
    <div class="mask-container" v-if="showWarn && warnInfo">
      <i class="el-icon-circle-close close" title="关闭" @click="close"></i>
      <div class="mask">
        <div class="major-container">
          <div class="major-header">
            <img src="img/icon-预警.png" />
            <span>预警信息</span>
          </div>
          <div class="major-content">
            <div>
              <span class="out">{{ warnInfo.locate_desc }}</span> 于{{
                warnInfo.begin_time | dateFormate
              }}发生 <span class="out">火灾</span>， 经度{{
                warnInfo.lon
              }}，纬度{{ warnInfo.lat }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <audio ref="audio" src="video/huozaijingbaosheng.mp3" :muted="true">
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { fireWarnData } from "../../../tests/data/warn";
import { getFireWarnRequest } from "../../api/thematic";

export default {
  data() {
    return {
      warnInfo: null,
      showWarn: false,
      timer: null,
    };
  },
  filters: {
    dateFormate(value) {
      if (value) {
        let date = new Date(value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
      return null;
    },
  },
  mounted() {
    if (process.env.NODE_ENV === "test") {
      setTimeout(() => {
        this.getData();
      }, 1000 * 30);
    } else {
      this.getData();
    }
    let warnInterval = window.global.warnInterval || 1000 * 10;
    this.timer = setInterval(this.getData, warnInterval);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    ...mapMutations(["setWarnList"]),
    async getData() {
      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = fireWarnData;
      } else {
        result = await getFireWarnRequest();
      }

      if (
        result.code == 200 &&
        Array.isArray(result.data) &&
        result.data.length
      ) {

        // this.setWarnList(result.data);

        // 弹出报警
        let newWarn = result.data[result.data.length - 1];

        this.setWarnList([newWarn]);

        if (this.warnInfo && this.warnInfo.fire_id === newWarn.fire_id) {
          return;
        }

        this.warnInfo = newWarn;
        this.showWarn = true;

        // 播放报警声
        let audio = this.$refs.audio;
        if (audio) {
          audio.muted = false;
          audio.loop = true;
          audio.currentTime = 0;
          audio.play();
        }
      }
    },
    close() {
      this.showWarn = false;
      let audio = this.$refs.audio;
      audio && audio.pause();
    },
  },
};
</script>

<style lang="less" scoped>
.mask-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  background-color: rgba(12, 18, 48, 0.6);
  background-image: url("../../assets/images/外圆.png");
  background-size: 100% 100%;
  .close {
    color: #f00;
    font-size: 72px;
    position: absolute;
    top: 100px;
    right: 100px;
    cursor: pointer;
  }
  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .major-container {
      width: 838px;
      height: 492px;
      background-image: url("../../assets/images/外框.png");
      background-size: 100% 100%;
      .major-header {
        font-size: 90px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 52px;
        letter-spacing: 11px;
        color: #f30808;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        margin-top: -50px;
        > img {
          width: 114px;
          height: 103px;
          background-size: 100% 100%;
          margin-right: 10px;
        }
      }
      .major-content {
        font-size: 32px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 72px;
        letter-spacing: 0px;
        color: #ffffff;
        height: 400px;
        width: 100%;
        display: flex;
        align-items: center;
        > div {
          margin: 0 20px;
          .out {
            color: #f00;
          }
        }
      }
    }
  }
}
</style>
