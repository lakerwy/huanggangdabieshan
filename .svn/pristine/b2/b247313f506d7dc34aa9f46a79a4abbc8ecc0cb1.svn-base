<!--
 * @Author: 任继民
 * @Date: 2021-03-03 16:26:14
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-06 14:00:29
 * @Description: 右侧图表
-->
<template>
  <section class="right-Chart">
    <section class="events">
      <HeadLine :titleName='"巡护事件统计"'></HeadLine>  
      <section id="patrolEvents" class="patrolEvents"></section>
    </section>
    <section class="warnInfo">
      <HeadLine :titleName='"报警信息"'></HeadLine> 
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address">
        </el-table-column>
      </el-table>      
    </section>
    <section class="patrolInfo">
      <HeadLine :titleName='"巡护任务"'></HeadLine> 
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address">
        </el-table-column>
      </el-table>         
    </section>
  </section>
</template>
<script>
import HeadLine from '../../../components/headLine/index';
import { initEcharts } from '../../../utils/util';
import echartsOptions from './echartOption';
export default {
  components: {
    HeadLine
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区'
      }]      
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      initEcharts('patrolEvents',echartsOptions.eventsOptions);
    }
  },
}
</script>
<style lang="scss" scoped>
.right-Chart {
  .events {
    .patrolEvents {
      height: 237px;
    }
  }
  .warnInfo {
    margin-top: 27px;
    .el-table {
      margin-top: 24px;
    }
  }
  .patrolInfo {
    margin-top: 28px;
    .el-table {
      margin-top: 23px;
    }    
  }
}
</style>