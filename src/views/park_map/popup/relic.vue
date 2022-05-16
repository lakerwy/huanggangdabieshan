<template>
  <div class="pointInfo">
    <div class="close" @click="close"><i class="el-icon-close"></i></div>
    <div class="title">
      <img src="imgs/image_onemap/serch_relic.png" alt="" style="width: 30px" />
      <b>{{ form.name }}</b>
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
    <p style="text-align: right">
      <!-- todo hyx -->
      <!-- 52 27 -->
      <el-button  class="btn_more" :loading="aroundFlag" @click="aroundInfo">周边</el-button>
      <el-button  class="btn_more" @click="shareInfo">分享</el-button>
      <el-button  class="btn_more" @click="getMoreInfo">更多</el-button>
      <!-- <button class="btn_more" @click="aroundInfo">周边</button> -->
      <!-- <button class="btn_more" @click="shareInfo">分享</button> -->
      <!-- <button class="btn_more" @click="getMoreInfo">更多</button> -->
    </p>
    <img id="flow-img" :src="urlImg" />
  </div>
</template>
<script>
import { getEditRelics, getPoster, getAroundInfo } from "@/api/remain";
import { defineComponent, ref, toRefs, watch, inject, TrackOpTypes } from "vue";
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: ['selectId', "data", "type"],
  setup(props, context) {
    const { data } = toRefs(props)
    const { type } = toRefs(props)
    const updateLocation = inject('updateLocation')
    const showAround = inject('showAround')
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
      context.emit('closePop')
    }

    const dialogVisible = ref(true);
    const aroundFlag = ref(false);
    const urlImg = ref('');
    const aroundInfo = () => {
      let params = {
        id: data.value.id,
        type: type.value,
      };
      getAroundInfo(params).then(res => {
        aroundFlag.value = true;
        if (res.success && res.body.length > 0) {
          showAround(true, res.body)
          aroundFlag.value = false;
          close()
        } else {
          ElMessage({
            message: '暂无周边详情！',
            type: 'error'
          });
          aroundFlag.value = false;
        }
      });
    }
    const shareInfo = () => {
      let params = {
        id: data.value.id,
      };
      getPoster(params).then(res => {
        var url = window.URL.createObjectURL(new Blob([res]));
        // urlImg.value = url;
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', data.value.name + ".png")
        document.body.appendChild(link)
        link.click()
      });

      // 
    }

    watch(data, () => {
      if (data.value.id) {
        getMapInfo(data.value.id);
      }
    }, { immediate: true }
    )

    return {
      aroundFlag,
      dialogVisible,
      getMoreInfo,
      shareInfo,
      aroundInfo,
      getMapInfo,
      close,
      form,
      img,
      videourl,
      urlImg
    }
  },
})
</script>
<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.pointInfo {
  width: 374 / @vw;
  background-color: rgba(255, 255, 255, 0.9);
  padding-bottom: 1px;
  p {
    margin: 0;
  }
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
      padding: 0;
      li {
        list-style: none;
        height: 24 / @vh;
        font-size: 14 / @vw;
        margin-bottom: 2px;
        //padding: 3 / @vh 0;
        span {
          color: #2cab7c;
        }
      }
    }
    img {
      position: absolute;
      width: 155 / @vw;
      height: 112 / @vh;
      top: 3 / @vh;
      right: 27 / @vw;
    }
  }
  .btn_more {
    margin-right: 18px;
    text-align: right;
    font-size: 14px;
    border: 0;
    background-color: #13a36e;
    color: #fefefe;
    padding: 4px 12px;
    cursor: pointer;
    min-height: 23px !important;
    line-height: 23px !important;
  }
}
</style>