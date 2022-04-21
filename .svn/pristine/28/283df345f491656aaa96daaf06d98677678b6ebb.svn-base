<!--
 * @Author: 任继民
 * @Date: 2021-03-04 11:43:17
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-05 11:01:47
 * @Description: 左侧图表
-->
<template>
  <section class="firewarn-left">
    <section class="monitor">
      <HeadLine :titleName='"林火监测"'></HeadLine> 
      <section class="list">
        <span v-for="item in monitorlist" :key="item.key">{{item.name}}</span>
      </section>
      <section class="forestFire" id="forestFire"></section>
    </section>
    <section class="warning">
      <HeadLine :titleName='"林火预警"'></HeadLine> 
      <section class="list">
        <span v-for="item in monitorlist" :key="item.key">{{item.name}}</span>
      </section>  
      <section class="warn-list">
        <div class="total-list">
          <span class="dot"></span>
          <span class="text">当前共<i> 5 </i>起林火报警</span>
        </div>
        <div class="list-content" v-for="item in 3" :key="item">
          <div class="img">
            <img src="img/img17.png" alt="" srcset="">
          </div>
          <div class="content">
            <div class="base-info">
              <img src="img/dot.png" alt="" srcset="">
              <div class="info">
                <div class="title">林火视频报警</div>
                <div class="time">2021-03-01</div>                
              </div>
            </div>
            <div class="address">大九湖管理区大九湖站点-1747米</div>
            <div class="status">处理中</div>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>        
      </section>
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
      initEcharts('forestFire', echartsOptions.lineOptions);
    }
  },
}
</script>
<style lang="scss" scoped>
.firewarn-left {
  margin: 28px 20px 0 20px;
  .monitor {
    .list {
      width: 384px;
      height: 36px;
      line-height: 36px;
      background-color: rgba($color: #68a9ff, $alpha: .12);
      display: flex;
      justify-content: space-evenly;
      margin-top: 24px;
    }
    .forestFire {
      height: 201px;
      margin-top: 30px;
    }
  }
  .warning {
    .list {
      width: 384px;
      height: 36px;
      line-height: 36px;
      background-color: rgba($color: #68a9ff, $alpha: .12);
      display: flex;
      justify-content: space-evenly;
      margin-top: 24px;
    }  
    .warn-list {
      margin-top: 21px;
      .total-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #68a9ff;     
          margin-right: 9px;     
        }
        .text {
          font-size: 14px;
          color: #68a9ff;
          i {
            font-size: 16px;
            color: #ffffff;
          }
        }
      } 
      .list-content {
        display: flex;
        justify-content: flex-start;
        padding: 20px 0;
        border-bottom: 1px solid #404861;
        .img {
          width: 105px;
          height: 74px;   
          margin-right: 16px;       
        }
        .base-info {
          display: flex;
          align-items: center;
          img {
            margin-right: 9px;
            width: 11px;
            height: 11px;            
          }
          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 242px;
            .title {
              color: #ffffff;
              font-size: 14px;
            }
            .time {
              font-size: 12px;
              color: #68a9ff;
            }
          }
        }
        .address {
          margin-top: 10px;
          margin-left: 20px;
          font-size: 14px;
          text-align: left;
        }
        .status {
          margin-top: 10px;
          margin-left: 20px;
          text-align: left;
        }        
      }
    }  
  }
}
</style>