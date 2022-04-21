<!--
 * @Author: 任继民
 * @Date: 2021-03-04 11:43:24
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-05 14:15:19
 * @Description: 右侧图表
-->
<template>
  <section class="fireWarn-right">
    <section class="statistics">
      <HeadLine :titleName='"林火统计"'/>
      <section class="list">
        <span v-for="item in monitorlist" :key="item.key">{{item.name}}</span>
      </section> 
      <section class="statisChart" id="statisChart"></section>     
    </section>
    <section class="fire-assess">
      <HeadLine :titleName='"火灾损失评估"'/>
      <section class="loss-money">
        <div>
          <div class="words">火灾直接经济损失</div>
          <div class="num">1228.09<span> 万元</span></div>
        </div>
        <div>
          <div class="words">火灾间接经济损失</div>
          <div class="num">1011.10<span> 万元</span></div>
        </div>
      </section>
      <section class="assessChart" id="assessChart"></section>
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
      initEcharts('statisChart', echartsOptions.statisticsOptions);
      initEcharts('assessChart', echartsOptions.assessOptions);
    }
  },
}
</script>
<style lang="scss" scoped>
.fireWarn-right {
  margin: 28px 20px 0 20px;
  .statistics {
    .list {
      width: 384px;
      height: 36px;
      line-height: 36px;
      background-color: rgba($color: #68a9ff, $alpha: .12);
      display: flex;
      justify-content: space-evenly;
      margin-top: 24px;
    } 
    .statisChart {
      height: 203px;
    }
  }
  .fire-assess {
    margin-top: 42px;
    .loss-money {
      background-image: url('../../../assets/images/framebg.png');
      background-repeat: no-repeat;
      width: 422px;
      height: 92px;  
      margin-top: 28px;   
      display: flex; 
      justify-content: space-around;
      align-items: center;
      .words {
        color: #ffffff;
        margin-bottom: 16px;
        
      }
      .num {
        font-family: DINNextW1G;
        font-size: 24px;        
        font-weight: bold;
        color: #68a9ff;
        span {
          font-size: 14px;
        }
      }
    }
    .assessChart {
      height: 300px;
    }
  }
}
</style>