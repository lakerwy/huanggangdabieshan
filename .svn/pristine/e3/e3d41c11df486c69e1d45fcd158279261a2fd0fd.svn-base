<!--
 * @Author: 任继民
 * @Date: 2021-03-04 11:43:17
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-07 10:43:26
 * @Description: 左侧图表
-->
<template>
  <section class="emCommun-left">
    <section class="font-equ">
      <HeadLine :titleName='"本月数据"'></HeadLine> 
      <section class="curr-data">
        <section class="data-list" v-for="item in 6" :key="item">
          <div class="num">156000</div>
          <div class="unit">监测站点（个）</div>
        </section>
      </section>
    </section>
    <section class="warning">
      <HeadLine :titleName='"本月各站点环境因子监测指标统计"'></HeadLine> 
      <section id="emergencyEvent" class="emergencyEvent"></section>
    </section>   
    <section class="water">
      <HeadLine :titleName='"水质监测数据"'></HeadLine> 
      <section id="waterOptions" class="waterOptions"></section>
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
      tableData: [{
        age: '35',
        name: '王二狗',
        address: '上海市普'
      }, {
        age: '45',
        name: '王二蛋',
        address: '上海市普'
      }, {
        age: '33',
        name: '王小虎',
        address: '上海市普陀区'
      }],      
      monitorlist:[
        { name: '无人机监测', type: '', key: '1' },
        { name: '林火监测', type: '', key: '2' },
        { name: '林火红外监测', type: '', key: '3' },
        { name: '气象站监测', type: '', key: '4' },
      ]
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      initEcharts('emergencyEvent', echartsOptions.emergencyOptions);
      initEcharts('waterOptions', echartsOptions.waterOptions);
    }
  },
}
</script>
<style lang="scss" scoped>
.emCommun-left {
  margin: 28px 20px 0 20px;
  .font-equ {
    .curr-data {
      margin-top: 18px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .data-list {
        background-image: url('../../../assets/images/框.png');
        width: 180px;
        height: 75px;   
        margin-bottom: 16px;
        .num {
          font-family: DINNextW1G;
          font-size: 21px;   
          font-weight: bold;
          height: 21px;    
          margin: 15px 0 12px 0;
          background-image:-webkit-linear-gradient(bottom,#0776bc,#3fa9e2,#5b96bc);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;          
        }
        .unit {
          color: #727c90;
        }
      }
    }
  }
  .warning {
    margin-top: 35px;
    .emergencyEvent {
      height: 235px; 
    }
  }
  .water {
    .waterOptions {
      height: 166px;
    }
  }
}
</style>