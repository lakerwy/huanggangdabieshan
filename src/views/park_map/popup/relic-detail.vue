<template>
<div class="detail" v-if="reloadValue">
  <div class="close" @click="closeWindow"><i class="el-icon-close"></i></div>
  <div class="top">
    <img src="imgs/image_onemap/icon_detail.png" alt="">
    <b>{{ form.name }}</b>
  </div>
  <div class="content">
    <section class="section1">
      <div class="imgBox">
        <el-carousel indicator-position="outside" arrow="never">
          <el-carousel-item v-for="item in imgs" :key="item">
            <img :src="item" alt="" class="carouselImg">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="topinfo">
        <ul>
          <li>
            <span>东经：</span>{{ form.longitude }}
            <span>北纬：</span>{{ form.latitude }}
          </li>
          <li>
            <span>行政区属：</span>{{ form.administrativeDistrict }}
          </li>
          <li>
            <span>地理位置：</span>{{ form.position }}
          </li>
          <li>
            <span>交通状况：</span>{{ form.trafficCondition }}
          </li>
          <li>
            <span>遗迹景观类型：</span>{{ form.landscapeTypes }}
          </li>
        </ul>
      </div>
    </section>
    <section class="section2">
      <ul>
        <li>
          <div class="title">
            <img src="imgs/image_onemap/icon_diam.png" alt="">
            <span>地质遗迹景观描述与特征参数：</span>
          </div>
          <div class="txt">
            <p>
              {{ form.description }}
            </p>
          </div>
        </li>
        <li>
          <div class="title">
            <img src="imgs/image_onemap/icon_diam.png" alt="">
            <span>成因分析：</span>
          </div>
          <div class="txt">
            <p>
              {{ form.cause }}
            </p>
          </div>
        </li>
      </ul>
    </section>
    <section class="section3">
      <div>
        <img src="imgs/image_onemap/icon_circu.png" alt="">
        <span>其他景观：</span>
        {{ form.otherLandscape }}
      </div>
      <div>
        <img src="imgs/image_onemap/icon_circu.png" alt="">
        <span>环境与保护现状：</span>
        {{ form.currentSituation }}
      </div>
      <div>
        <img src="imgs/image_onemap/icon_circu.png" alt="">
        <span>开发现状：</span>
        {{ form.developmentSituation }}
      </div>
      <div>
        <img src="imgs/image_onemap/icon_circu.png" alt="">
        <span>保护措施：</span>
        {{ form.protection }}
      </div>
      <div>
        <img src="imgs/image_onemap/icon_circu.png" alt="">
        <span>级别：</span>
        {{ form.level }}
      </div>
    </section>
  </div>
</div>
</template>

<script>
import {defineComponent, reactive, ref, onMounted, unref, watch, nextTick, toRefs, onBeforeMount,} from "vue";
import {getDictType, getEditRelics} from "../../../api/remain";
export default defineComponent({
  props: ['selectId'],
  setup(props,context){
    const closeWindow = ()=>{
      context.emit('closeWindow')
    }
    //获取字典
    const landscapeOptions = ref([]);
    const levelOptions = ref([])
    const getDict = async ()=>{
      let res = await getDictType("landscape_type");
      if(res.code == 0){
        landscapeOptions.value = res.data
      }
      let result = await getDictType("relic_level");
      if(result.code == 0){
        levelOptions.value = result.data
      }
    }
    onBeforeMount(
        getDict
    )
    const getOptionsType = (arr,type)=>{
      let value = ''
      arr.forEach(item => {
        if(item.value == type){
          value = (item.label);
        }
      })
      return value
    }
    //获取页面信息
    const { selectId } = toRefs(props);
    const formDemo = {
      name: '中天',
      number: '',
      longitude: '',
      elevation: '',
      proportion: '',
      administrativeDistrict: '',
    }
    const form = ref(Object.assign({},formDemo))
    const imgUrl = window.globalUrl.FTP_URL;
    const detailImg = ref('imgs/detail_img2.png')
    const imgs = ref([]);
    const getMoreInfo = async (id)=>{
      let res = await getEditRelics(id);
      if(res.code == 0 && res.data){
        form.value = Object.assign(formDemo,res.data);
        form.value.landscapeTypes = getOptionsType(landscapeOptions.value,res.data.landscapeTypes)
        form.value.level = getOptionsType(levelOptions.value,res.data.level)
        imgs.value.length = 0;
        if(res.data.fileList){
          res.data.fileList.forEach(item=>{
            imgs.value.push(imgUrl+item.filePath)
          })
        }else{
          imgs.value.push(detailImg.value)
        }
      }
      reload()
    }

    const reloadValue = ref(true);
    //刷新
    const reload = ()=>{
      reloadValue.value = false;
      nextTick(()=>{
        reloadValue.value = true;
      })
    }

    watch(selectId, (newVal, oldVal) => {
          getMoreInfo(selectId.value)
        },
    )

    return {
      closeWindow,
      reloadValue,
      form,
      imgs
    }
  }
})
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.detail {
  position: absolute;
  top: 161 / @vh;
  right: 33%;
  width: 660 / @vw;
  height: 786 / @vh;
  background-color: rgba(255,255,255,0.9);
  .close {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
    .el-icon-close {
      font-size: 25px;
      color: #A9A9A9;
    }
  }
  .top {
    display: flex;
    align-items: center;
    width: 607 / @vw;
    height: 40 / @vh;
    padding: 10px;
    margin-left: 28 / @vw;
    border-bottom: 1px solid #DADADA;
    color: #2CAB7C;
    img {
      margin-right: 10 / @vw;
    }
  }
  .content {
    margin-left: 32 / @vw;
    margin-top: 8px;
    width: 593 / @vw;
    height: 688 / @vh;
    .section1 {
      display: flex;
      align-items: center;
    }
    .imgBox {
      width: 254 / @vw;
      height: 168 / @vh;
      /deep/ .el-carousel__indicators--outside {
        position: relative;
        bottom: 7 / @vh;
        left: 16 / @vw;
      }
      /deep/ .el-carousel__container {
        height: 168 / @vh;
      }
      /deep/ .el-carousel__button {
        width: 18 / @vw;
      }
      /deep/ .is-active .el-carousel__button{
        background-color: #12A36E;
      }
      .carouselImg {
        width: 254 / @vw;
        height: 167 / @vh;
      }
    }
    .topinfo {
      margin-left: 21 / @vw;
      font-size: 14 / @vw;
      li:nth-child(1) {
        span:nth-child(2) {
          margin-left: 30 / @vw;
        }
      }
      li {
        padding: 5 / @vh 0;
        color: #616164;
        span {
          color: #2CAB7C;
        }
      }
    }
    .section2 {
      font-size: 14 / @vw;
      margin-top: 20 / @vh;
      li {
        margin-top: 16 / @vh;
        .title {
          span  {
            margin-left: 7 / @vw;
            color: #2CAB7C;
          }
        }
        .txt {
          margin-top: 12 / @vh;
          width: 594 / @vw;
          height: 114 / @vh;
          background-color: rgba(246, 253, 255,0.7);
          p {
            font-size: 14 / @vh;
            padding: 15 / @vw 18 / @vh;
            line-height: 200%;
            color: #616164;
          }
        }
      }
    }
    .section3 {
      margin-top: 15 / @vh;
      font-size: 14 / @vh;
      >div {
        color: #616164;
        display: inline-block;
        vertical-align: top;
        width: 280 / @vw;
        line-height: 30 /@vh;
        height: 60 / @vh;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        span {
          margin-left: 7 / @vw;
          color: #2CAB7C;
        }
        .msg {
          display: inline-block;
      }
      }
    }
  }
}
</style>