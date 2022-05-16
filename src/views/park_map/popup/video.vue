<template>
  <div class="videoPage">
    <div class="close" @click="close"><i class="el-icon-close"></i></div>
    <div class="title">
      <p @click="openIframe">
        <img
          src="imgs/image_onemap/serch_video.png"
          alt=""
          style="width: 30px"
        />摄像头名称：{{ data.name }}
      </p>
    </div>
    <div class="content">
      <div style="height: 240px" >
        <!-- <div v-if="!videourl" class="noVideo">
          <h3 style="margin: 0">网络错误</h3>
        </div> -->
        <videoCom
          :stream="data.stream"
          :videoObj="data"
          :index="123"
          ref="video"
        />
        <!-- <player
          v-if="data.videoType == 0 && videourl"
          class="player"
          ref="videoPlayer"
          :videoUrl="videourl"
          fluent
          autoplay
          live
        ></player>
        <iframe
          v-if="data.videoType == 3 && videourl"
          :src="videourl"
          frameborder="0"
          style="width: 400px; height: 240px"
        ></iframe> -->
      </div>
      <p style="margin-bottom: 4px">
        <b>摄像头位置:</b> <span>{{ data.adress }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import player from "./EasyPlayer";
import { defineComponent, ref, toRefs, watch, inject } from "vue";
import { playerVideo } from "_api/tree";
import  videoCom  from "@/components/video/index";

export default defineComponent({
  props: ["data"],
  components: { player,videoCom },
  setup(props, context) {
    const { data } = toRefs(props)
    const updateLocation = inject('updateLocation')
    const getMoreInfo = () => {
      updateLocation(true, data.value.id)
      close()
    }
    //获取页面信息
    const videourl = ref(null)
    const close = () => {
      
      context.emit('closePop')
    }
    const dealVideo = (data) => {
      if (data.videoType == 3) {
        videourl.value = data.url;
        //播放
      } else {
        playerVideo(data.stream).then((res) => {
          if (res.code == 200) {
            videourl.value = res.data.flv;
          } else {
            videourl.value = null;
          }
        });
      }
    }
    const openIframe = () => {
      if(data.value.videoType==3){
        window.open(data.value.url, '_blank');
      }
    }
    watch(data, () => {
      dealVideo(data.value)
    }, { immediate: true }
    )
    return {
      getMoreInfo,
      close,
      videourl,
      openIframe
    }
  },
})
</script>

<style lang="less" scoped>
.videoPage {
  width: 400px;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.9);
  .close {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
    .el-icon-close {
      font-size: 25px;
      color: black;
    }
  }
  .title {
    margin-bottom: 8px;
    p {
      color: #2cab7c;
      margin: 0;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
  .content {
    .noVideo {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      line-height: 240px;
      text-align: center;
      color: #eb0808;
    }
    .player-box {
      height: 240px;
      width: 400px;
    }
    p {
      b {
        color: #2cab7c;
        font-weight: normal;
      }
      span {
        background: rgba(246, 253, 255, 0.7);
        display: inline-block;
        vertical-align: middle;
        width: 308px;
        padding: 4px;
        text-indent: 32px;
        font-size: 1;
        box-sizing: border-box;
      }
    }
  }
}
</style>