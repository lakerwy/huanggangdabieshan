<template>
  <div id="QXJC">
    <div class="tab">
      <span class="tab-item" :class="currentInd==ind?'tab-item-active':''" @click="tabChange(item)" v-for="(item,ind) in tabList" :key="ind+100">{{item.name}}</span>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item,i) in contentList" :key="i">
        <img :src="item.img">
        <div>
          <p>{{item.title}}</p>
          <p><span>{{item.value}}</span> {{item.unit}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWaterTypes,getWaterData } from "@/api/board";
import echarts from "echarts";
export default {
  name: "echarts",
  data() {
    return {
      currentInd: 0,
      tabList: [],
      contentList: []
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(){
      let params = {
        type: 1
      }
      let res = await getWaterTypes(params)
      if (res.success) {
        let list = res.body;
        list.forEach((item,i) => {
          // 只取前三个数据
          if (i < 3) {
            this.tabList.push({
              index: i,
              name: item.name,
              siteId: item.siteId
            })
          }  
        })
        this.tabChange(this.tabList[0])
      }
    },
    async tabChange(item) {
      this.currentInd = item.index
      let params = {
        siteId: item.siteId
      }
      this.contentList = []
      let res = await getWaterData(params)
      if (res.success) {
        let data = res.body;
        if(data.temperature) {
          this.contentList.push({
            title: '大气温度',
            value: data.temperature,
            unit: '℃',
            img: require('../../assets/images/qxjc-icon1.png')
          })
        }
        if(data.humidity) {
          this.contentList.push({
            title: '湿度',
            value: data.humidity,
            unit: '%',
            img: require('../../assets/images/qxjc-icon2.png')
          })
        }
        if(data.pressure) {
          this.contentList.push({
            title: '大气压力',
            value: data.pressure,
            unit: 'Pa',
            img: require('../../assets/images/qxjc-icon3.png')
          })
        }
        if(data.noise) {
          this.contentList.push({
            title: '噪声',
            value: data.noise,
            unit: 'dB',
            img: require('../../assets/images/qxjc-icon4.png')
          })
        }
        if(data.pmTwo) {
          this.contentList.push({
            title: 'PM 2.5',
            value: data.pmTwo,
            unit: 'μg/m³',
            img: require('../../assets/images/qxjc-icon5.png')
          })
        }
        if(data.pmTen) {
          this.contentList.push({
            title: 'PM 10',
            value: data.pmTen,
            unit: 'μg/m³',
            img: require('../../assets/images/qxjc-icon6.png')
          })
        }
        if(data.windSpeed) {
          this.contentList.push({
            title: '风速',
            value: data.windSpeed,
            unit: 'ms/s',
            img: require('../../assets/images/qxjc-icon7.png')
          })
        }
        if(data.windDirection) {
          this.contentList.push({
            title: '风向',
            value: data.windDirection,
            img: require('../../assets/images/qxjc-icon8.png')
          })
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#QXJC{
  height: calc(100% - 37px);
  width: 100%;
  .tab{
    width: 100%;
    display: flex;
    align-content: flex-start;
    padding: 15px 25px;
    box-sizing: border-box;
    .tab-item{
      // flex: 1;
      width: 140px;
      height: 32px;
      background: url('../../assets/images/qxjc-tab0.png') no-repeat top center;
      background-size: cover;
      color: #22a0e1;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      &.tab-item-active{
        color: #fff;
        background-image: url('../../assets/images/qxjc-tab1.png');
      }
    }
  }
  .content{
    width: 100%;
    padding: 20px 0 0 18px;
    box-sizing: border-box;
    .content-item{
      float: left;
      width: 25%;
      display: flex;
      margin-bottom: 35px;
      img{
        flex: 0 0 45px;
        width: 45px;
        height: 45px;
      }
      div{
        margin-left: 8px;
        flex: 1;
        p{
          color: #fff;
          font-size: 14px;
          margin: 0;
          line-height: 24px;
          span{
            color: #fff32f;
          }
        }
      }

    }
  }
}
</style>
