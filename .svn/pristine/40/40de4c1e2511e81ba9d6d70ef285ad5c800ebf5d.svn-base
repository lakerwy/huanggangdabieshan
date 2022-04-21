<!--
 * @Author: 任继民
 * @Date: 2021-03-04 11:43:24
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-14 10:09:37
 * @Description: 右侧图表
-->
<template>
  <section class="emCommun-right">
    <section class="statistics">
      <HeadLine :titleName='"统计信息"'/>
      <section class="total-title"><span>指挥人员</span></section>
      <section class="statisChart" id="statisChart"></section>   
      <section class="total-title"><span>应急物种</span></section>  
      <section class="emergencySpecies" id="emergencySpecies"></section>   
      <section class="total-title"><span>应急车辆</span></section>  
      <section class="emCar">
        <section v-for="item in 4" :key="item" class="list">
          <div class="text">
            <span class="num">10</span>
            <span class="unit">辆</span>
          </div>
          <div class="name">应急分队{{item}}</div>
          <div class="img">
            <img src="img/Stereogram.png" alt="">
          </div>
        </section>
      </section>
      <!-- <section class="emergencySpecies" id="emergencySpecies"></section>          -->
    </section>
  </section>
</template>
<script>
import HeadLine from '../../../components/headLine/index'
import { initEcharts } from '../../../utils/util';
import echartsOptions from './echartOption';
export default {
  components: {
    HeadLine
  },
  data() {
    return {
      monitorlist:[
        { name: '热点', type: '', key: '1' },
        { name: '火灾', type: '', key: '2' },
        { name: '专业消防', type: '', key: '3' },
        { name: '乡镇应急', type: '', key: '4' },
        { name: '物质储备', type: '', key: '4' },
        { name: '危险设备', type: '', key: '4' },               
      ]      
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      initEcharts('statisChart', echartsOptions.staticInfoOptions);
      initEcharts('emergencySpecies', echartsOptions.lineOptions);
    }
  },
}
</script>
<style lang="scss" scoped>
.emCommun-right {
  margin: 28px 20px 0 20px;
  .statistics {
    .total-title {
      width: 371px;
      height: 36px;
      line-height: 36px;
      background-color: rgba($color: #68a9ff, $alpha: .12);  
      margin-top: 25px;
      font-size: 14px;
      color: #ffffff;  
      text-align: left;
      span {
        padding-left: 17px;
      }        
    }    
    .statisChart {
      height: 203px;
    }
    .emergencySpecies {
      height: 284px;
    }
    .emCar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .list {
        .text {
          margin-top: 41px;
          .num {
            color: #ffffff;
            font-family: DINNextW1G;
            font-size: 24px;            
          }
          .unit {
            font-size: 14px;
            color: #ffffff;
          }
        }
        .name {
          margin-top: 10px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #68a9ff;          
        }
        .img {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>