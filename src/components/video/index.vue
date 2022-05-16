<template>
  <div class="video-live">
    <div v-if="!playUrl" class="text">
      <span>{{ loadText }}</span>
    </div>
    <div className="VideoMixControl">
      <!-- <div className="controlBtn">
        <Icon
          type="arrow-up"
          size="small"
          className="up"
          @mousedown="controlCamera(e, 'up')"
          @mouseup="controlCamera(e, 'up')"
        />
        <div style="display: flex">
          <Icon
            type="arrow-left"
            size="small"
            className="left"
            @mousedown="controlCamera(e, 'left')"
            @mouseup="controlCamera(e, 'left')"
          />
          <div className="control"></div>
          <Icon
            type="arrow-right"
            size="small"
            className="right"
            @mousedown="controlCamera(e, 'right')"
            @mouseup="controlCamera(e, 'right')"
          />
        </div>
        <Icon
          type="arrow-down"
          size="small"
          className="down"
          @mousedown="controlCamera(e, 'down')"
          @mouseup="controlCamera(e, 'down')"
        />
      </div> -->
      <!-- <div className="controlZoomBtn">
        <Icon type="add" size="large" className="add"
        onMouseDown={(e)=>this.controlCamera('add',e)} /> <Icon type="minus"
        size="large" className="minus"
        onMouseDown={(e)=>this.controlCamera('minus',e)}/>
      </div> -->
      <!-- <img onClick="{::this.quanping}" src="{imgURL" } className="quanping" /> -->
    </div>

    <player
      v-if="videoObj.videoType == 0 && playUrl"
      class="player"
      style="height: 100%; width: 100%"
      ref="videoPlayer"
      :videoUrl="playUrl"
      :id="'easyplayer' + index"
      fluent
      autoplay
      live
    ></player>
    <div class="iframePage">
      <span
        @click="openIframe"
        v-if="videoObj.videoType == 3 && playUrl"
        class="iframeFullScreen"
      >
        <i class="el-icon-full-screen"></i>
      </span>
      <iframe
        ref="iframe1"
        v-if="videoObj.videoType == 3 && playUrl"
        :src="playUrl"
        frameborder="0"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>
  </div>
</template>

<script>
import player from "./EasyPlayer";
import { playerVideo } from "_api/tree";
export default {
  props: ["stream", "videoObj", "index"],
  components: {
    player,
  },
  data() {
    return {
      ftpUrl: window.globalUrl.FTP_URL,
      loadText: "",
      playUrl: "",
    };
  },
  watch: {
    stream(val) {
      if (val) {
        this.seeVideo();
      }
    }
  },
  created() {
    this.seeVideo();
  },
  beforeUnmount(){

  },
  methods: {
    // controlCamera(e, direction) {

    // },
    openIframe() {
      window.open(this.videoObj.url, "_blank");
    },
    async seeVideo() {
      this.loadText = "视频加载中...";
      if (this.videoObj.videoType == 0 && this.stream) {
        await playerVideo(this.stream).then((res) => {
          if (res.code == 200) {
            this.playUrl = res.data.flv;
          } else {
            this.playUrl = "";
            this.loadText = "网络错误";
          }
        });
      } else {
        this.playUrl = this.videoObj.url;
      }
    },
  },
};
</script>

<style scoped lang="less" >
.video-live {
  width: 100%;
  height: 100%;
}
.iframePage {
  width: 100%;
  height: 100%;
  position: relative;
  span {
    display: block;
  }
}
// .iframePage:hover {
//   p {
//     display: block;
//   }
// }
.iframeFullScreen {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  font-size: large;
  padding: 15px;
  cursor: pointer;
  i {
    color: white;
  }
}
.text {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 15px 8px;
  color: #a7b0b8;
  background: black;
  cursor: pointer;
  span {
    margin-top: 30%;
    display: inline-block;
  }
}
</style>
