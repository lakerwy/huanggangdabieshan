<!--
 * @Author: 任继民
 * @Date: 2021-03-04 11:43:17
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-06 15:00:05
 * @Description: 左侧图表
-->
<template>
  <section class="emCommun-left">
    <section class="font-equ">
      <HeadLine :titleName='"前端设备"'></HeadLine> 
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          label="巡护范围"
          prop="address">
        </el-table-column>
      </el-table> 
    </section>
    <section class="warning">
      <HeadLine :titleName='"应急事件统计"'></HeadLine> 
      <section id="emergencyEvent" class="emergencyEvent"></section>
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
    }
  },
}
</script>
<style lang="scss" scoped>
.emCommun-left {
  margin: 28px 20px 0 20px;
  .font-equ {
    .el-table {
      margin-top: 23px;
    }
  }
  .warning {
    margin-top: 52px;
    .emergencyEvent {
      height: 208px;
    }
  }
}
</style>