<!--
 * @Author: 任继民
 * @Date: 2021-03-03 16:26:06
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-06 14:02:57
 * @Description: 左侧图表
-->
<template>
  <section class="patrol-left">
    <section class="patrol-info">
      <HeadLine :titleName='"巡护信息"'></HeadLine>  
      <section class="info-content">
        <section class="total-title"><span>巡护总里程</span></section>
        <section class="mileage">
          <div class="textShow numbg" v-for="(item, index) in totalNum" :key="index">{{item}}</div>
          <div class="unit">km</div>
        </section>
        <section class="total-title"><span>今日巡护总里程统计</span></section>
        <section class="patrol-num">
          <section class="info-list" v-for="item in infoList" :key="item.key">
            <div class="info-img"><img :src="item.ico" alt="" srcset=""></div>
            <div class="info-text">
              <div>{{item.name}}</div>
              <div class="num"><span>{{item.num}}</span><i>{{item.unit}}</i></div>
            </div>
          </section>
        </section>
      </section>          
    </section> 
    <section class="user-table">
      <HeadLine :titleName='"巡护人员信息"'></HeadLine> 
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
  </section>
</template>
<script>
import HeadLine from '../../../components/headLine/index'
export default {
  components: {
    HeadLine
  },
  data() {
    return {
      totalNum: '12.063'.split(''),
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
      infoList: [
        { name: '巡护总人数', ico: 'img/总次数.png', num: '121', unit: '次', key: '1' },
        { name: '今日巡护人数', ico: 'img/总人数.png', num: '10', unit: '次', key: '2' },
        { name: '巡护次数总数', ico: 'img/巡护次数.png', num: '288', unit: '次', key: '3' },
        { name: '今日巡护次数', ico: 'img/巡护人数.png', num: '15', unit: '次', key: '4' },
        { name: '拍摄图片数量', ico: 'img/拍摄图片.png', num: '280', unit: '张', key: '5' },
        { name: '拍摄视频数量', ico: 'img/拍摄视频.png', num: '66', unit: '个', key: '6' },
      ]
    }
  },
}
</script>
<style lang="scss" scope>
.patrol-left {
  .patrol-info {
    .info-content {
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
      .mileage {
        width: 371px;
        margin-top: 19px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .numbg {
          background-image: url('../../../assets/images/numbg.png');
          background-repeat: no-repeat;
          width: 38px;
          height: 52px;
          line-height: 52px;
          color: #ffffff;
          font-size: 32px;
          font-family: DINNextW1G;
          margin-left: 17px;
        }
        .unit {
          color: #68a9ff;
          font-size: 16px;
          margin-left: 25px;
        }
      }
      .patrol-num {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;  
        padding-top: 12px;      
        width: 371px;
        .info-list {
          width: 50%;
          padding: 12px 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .info-img {
            margin-left: 26px;
              width: 36px;
              height: 36px;            
            img {
              width: 36px;
              height: 36px;
            }
          }
          .info-text {
            text-align: left;
            margin-left: 16px;
            color: #68a9ff;
            .num {
              margin-top: 15px;
              span {
                color: #ffffff;
                font-size: 20px;
              }
              i {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
  .user-table {
    margin-top: 44px;
    .el-table {
      margin-top: 29px;
    }
  }
}
</style>