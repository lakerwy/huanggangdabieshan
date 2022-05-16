<template>
  <div class="container">
    <div v-if="data && data.type == 2" class="pointInfo">
      <div class="close" @click="close"><i class="el-icon-close"></i></div>
      <div class="title">
        <img
          src="imgs/image_onemap/serch_relic.png"
          alt=""
          style="width: 30px"
        />
        <span>{{ form.name }}</span>
      </div>
      <div class="content">
        <ul>
          <li><span>遗迹编号：</span>{{ form.number }}</li>
          <li><span>东经：</span>{{ form.longitude }}</li>
          <li><span>北纬：</span>{{ form.latitude }}</li>
          <li><span>海拔：</span>{{ form.elevation }}</li>
          <li><span>面积：</span>{{ form.proportion }}</li>
          <li><span>行政区属：</span>{{ form.administrativeDistrict }}</li>
        </ul>
        <img :src="img" alt="" />
      </div>
      <button class="btn_more" @click="getMoreInfo">更多</button>
    </div>
    <div v-if="data && data.type == 3" class="videoPage">
      <div class="close" @click="close"><i class="el-icon-close"></i></div>
      <div class="title">
        <p>
          <img
            src="imgs/image_onemap/serch_video.png"
            alt=""
            style="width: 30px"
          />摄像头名称：{{ data.name }}
        </p>
      </div>
      <div class="content">
        <div style="height: 240px">
          <div v-if="!videourl" class="noVideo">
            <h3 style="margin: 0">网络错误</h3>
          </div>
          <player
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
            :src="videourl + '?rel=0&amp&autoplay=1'"
            frameborder="0"
          ></iframe>
        </div>
        <p style="margin-bottom:4px;">
          <b>摄像头位置:</b> <span>{{ data.position }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import player from "./EasyPlayer";
import { defineComponent, ref, toRefs, watch, inject } from "vue";
import { getEditRelics } from "../../../api/remain";
import { playerVideo } from "_api/tree";

export default defineComponent({
  props: ['selectId', "data"],
  components: { player },
  setup(props, context) {
    const { data } = toRefs(props)
    const updateLocation = inject('updateLocation')
    const getMoreInfo = () => {
      updateLocation(true, data.value.id)
      close()
    }
    //获取页面信息
    const formDemo = {
      name: '',
      number: '',
      longitude: '',
      elevation: '',
      proportion: '',
      administrativeDistrict: '',
    }
    const imgUrl = window.globalUrl.FTP_URL;
    const detailImg = ref('imgs/detail_img2.png')
    const img = ref('');
    const form = ref({})
    const videourl = ref(null)
    const getMapInfo = async (id) => {
      let res = await getEditRelics(id);
      if (res.code == 0) {
        form.value = Object.assign(formDemo, res.data);
        if (res.data.fileList) {
          img.value = imgUrl + Object.assign({}, res.data.fileList[0]).filePath
        } else {
          img.value = detailImg.value
        }
      }
    }
    const close = () => {
      context.emit('close')
    }
    const dealVideo = (data) => {
      if (data.videoType == 3) {
        videourl.value = data.url;
        //播放
      } else {
        playerVideo(data.id).then((res) => {
          if (res.code == 200) {
            videourl.value = res.data.flv;
          } else {
            videourl.value = null;
          }
        });
      }
    }
    // watchEffect(()=>{
    //   getMapInfo(selectId.value)
    // })
    watch(data, () => {
      if (data.value.type == 2) {
        getMapInfo(data.value.id)
      }
      if (data.value.type == 3) {
        dealVideo(data.value)
      }
    }, { immediate: true }
    )

    return {
      getMoreInfo,
      getMapInfo,
      close,
      form,
      img,
      videourl
    }
  },
})
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.container {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  position: absolute;
  top: 50%;
  left: 35%;
  .pointInfo {
    width: 374 / @vw;
    height: 265 / @vh;
    background-color: #ffffff;
    .close {
      position: absolute;
      right: 10 / @vw;
      top: 10 / @vh;
      cursor: pointer;
      .el-icon-close {
        font-size: 25px;
        color: #a9a9a9;
      }
    }
    .title {
      display: flex;
      align-items: center;
      width: 318 / @vw;
      height: 36 / @vh;
      padding-top: 10 / @vh;
      margin-left: 28 / @vw;
      border-bottom: 1px solid #fafafa;
      color: #2cab7c;
      img {
        margin-right: 10 / @vw;
      }
    }
    .content {
      margin-left: 28 / @vw;
      margin-top: 7 / @vh;
      position: relative;
      ul {
        li {
          height: 24 / @vh;
          font-size: 14 / @vw;
          //padding: 3 / @vh 0;
          span {
            color: #2cab7c;
          }
        }
      }
      img {
        position: absolute;
        width: 155 / @vw;
        height: 104 / @vh;
        top: 3 / @vh;
        right: 27 / @vw;
      }
    }
    .btn_more {
      margin-top: 15px;
      float: right;
      margin-right: 27px;
      border: 0;
      background-color: #13a36e;
      color: #fefefe;
      padding: 3px 12px;
      cursor: pointer;
    }
  }
}
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
      background: rgba(255,255,255,0.9);
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