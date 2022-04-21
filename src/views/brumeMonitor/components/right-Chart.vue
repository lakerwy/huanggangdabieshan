<!--
 * @Author: 任继民
 * @Date: 2021-03-04 11:43:24
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-07 10:40:17
 * @Description: 右侧图表
-->
<template>
  <section class="emCommun-right">
    <section class="statistics">
      <HeadLine :titleName='"本月空气监测数据"'/>
      <section class="airChart" id="airChart"></section>   
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
      initEcharts('airChart', echartsOptions.airOptions);
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
    .airChart {
      height: 170px;
    }
    .emergencySpecies {
      height: 284px;
    }
  }
}
</style>