<!--
 * @Author: 任继民
 * @Date: 2021-03-08 09:42:31
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-17 10:01:44
 * @Description: 左侧图表
-->
<template>
  <section class="perimter-left">
    <section class="camera-type">
      <HeadLine :titleName='"摄像头类型"'/>
      <section class="cameraChart" id="cameraChart"></section>
    </section>
    <section class="video-monitor">
      <HeadLine :titleName='"视频监控"'>
        <div>2021-03-01 08:29</div>
      </HeadLine>
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
import HeadLine from '../../../components/headLine/index';
import { initEcharts } from '../../../utils/util';
import echartsOptions from './echartOption';
export default {
  components: {
    HeadLine
  },
  data() {
    return {
      
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      initEcharts('cameraChart',echartsOptions.cameraOptions);
    }
  },
}
</script>
<style lang="scss" scoped>
.perimter-left {
  .camera-type {
    .cameraChart {
      height: 202px;
    }
  }
  .video-monitor {
    margin-top: 65px;
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