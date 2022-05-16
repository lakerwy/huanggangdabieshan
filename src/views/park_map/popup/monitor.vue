<template>
  <div class="pointInfo" v-if="currentObj">
    <div class="close" @click="close"><i class="el-icon-close"></i></div>
    <div class="title">
      <img src="imgs/image_onemap/serch_super.png" alt="" style="width: 30px" />
      <b>{{ data.adress }}</b>
    </div>
    <div class="content-site" v-if="data.sitetype == 2">
      <ul>
        <li><span>测站名称：</span>{{ data.sitename }}</li>
        <li><span>x偏移：</span>{{ currentObj.xnum }}</li>
        <li><span>y偏移：</span>{{ currentObj.ynum }}</li>
        <li><span>z偏移：</span>{{ currentObj.znum }}</li>
        <li><span>设备ID：</span>{{ currentObj.deviceId }}</li>
        <li><span>数据采集时间：</span>{{ currentObj.collectTime }}</li>
      </ul>
    </div>
    <div class="content-tep" v-if="data.sitetype == 1">
      <p style="text-align:center"><span style="color:#2cab7c;">最新时间：</span>{{ filterTime(currentObj) }}</p>
      <ul>
        <li><span>空气温度(℃)：</span>{{ currentObj.temperature }}</li>
        <li><span>空气湿度(%)：</span>{{ currentObj.humidity }}</li>
        <li><span>大气压力(kPa)：</span>{{ currentObj.pressure }}</li>
        <li><span>噪声(dB)：</span>{{ currentObj.noise }}</li>
        <li><span>PM2.5(ug/m3)：</span>{{ currentObj.pmTwo }}</li>
        <li><span>PM10(ug/m3)：</span>{{ currentObj.pmTen }}</li>
        <li><span>风向：</span>{{ currentObj.windDirection }}</li>
        <li><span>风速(m/s)：</span>{{ currentObj.windSpeed }}</li>
      </ul>
      <!-- <el-table :data="arr" stripe border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
          <template #default="{ row, $index }">
          {{ row.video_type == 0 ? $index + "视频流" : "播放地址" }}
        </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table> -->

      <!-- 气象 -->
      <!-- createTime: null
        createUser: null
        dataId: "85064011"
        day: 4
        deviceId: "5"
        hour: 0 
        humidity: "89.9"
        id: 1
        isDelete: 1
        minute: 0
        month: 11
        noise: "35"
        pmTen: "500"
        pmTwo: "498"
        pressure: "90.2"
        temperature: "9.8"
        updateTime: null
        updateUser: null
        windDirection: "西南偏西"
        windSpeed: "0.5"
        year: 2021 -->
    </div>
    <p style="text-align: center">
      <button class="btn_more" @click="viewChart">历史统计</button>
    </p>
  </div>
</template>
<script>
import { getOnemapAirInfo, getOnemapLandslideInfo } from "@/api/remain";
import { defineComponent, ref, toRefs, watch, inject } from "vue";

export default defineComponent({
  props: ['selectId', "data"],
  setup(props, context) {
    const { data } = toRefs(props)
    const showHistoryPage = inject('showHistoryPage')
    const viewChart = () => {
      showHistoryPage(true, data.value.list,data.value.sitetype,data.value.adress)
      close()
    }
    const imgUrl = window.globalUrl.FTP_URL;
    const detailImg = ref('imgs/detail_img2.png')
    const img = ref('');
    const arr = ref([])
    const currentObj = ref({})
    const videourl = ref(null)
    // const AirInfo = async (id) => {
    //   let res = await getOnemapAirInfo(id);
    //   if (res.code == 0 && res.data.length > 0) {
    //     arr.value = res.data;
    //     res.data.forEach(element => {
    //       element.time = filterTime(element)
    //     });
    //     currentObj.value = res.data[res.data.length-1];
    //   }
    // }
    const filterTime = (val) => {
      const year = val.year;
      const month = val.month < 10 ? '0' + val.month : val.month;
      const day = val.day < 10 ? '0' + val.day : val.day;
      const hour = val.hour < 10 ? '0' + val.hour : val.hour;
      const minute = val.minute < 10 ? '0' + val.minute : val.minute;
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + '00';
    }
    // const LandslideInfo = async (id) => {
    //   let res = await getOnemapLandslideInfo(id);
    //   if (res.code == 0 && res.data.length > 0) {
    //     arr.value = res.data;
    //     currentObj.value = res.data[0];

    //   }
    // }
    const close = () => {
      context.emit('closePop')
    }
    watch(data, () => {
      currentObj.value={};
      currentObj.value=data.value.list.length>0?data.value.list[0]:[];
    }, { immediate: true }
    )

    return {
      viewChart,
      // LandslideInfo,
      // AirInfo,
      close,
      arr,
      img,
      videourl,
      currentObj,
      filterTime
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
  .content-site {
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
  .content-tep {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5%;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 48%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          width: 100%;
          color: #fff;
          background: #64c2a0;
          padding:3px 0;
          margin-bottom: 6px;
          
        }
      }
      li:nth-child(2n){
        margin-left: 4%;
      }
    }
  }
  .btn_more {
    text-align: right;
    font-size: 14px;
    border: 0;
    background-color: #13a36e;
    color: #fefefe;
    padding: 6px 15px;
    cursor: pointer;
  }
}
</style>