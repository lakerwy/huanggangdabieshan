<!--
 * @Author: 任继民
 * @Date: 2021-03-03 14:04:49
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-17 10:16:53
 * @Description: 右侧信息
-->
<template>
  <section class="right-info">
    <ContentBox class="box1" :headName="'周界监控'" @click.native="setThematicIndex(1)">
      <section>
        <div id="monitorChart" class="monitorChar"></div>
      </section>
      <section class="steam-btn">
        <div v-for="(item,index) in monitorlist" :key="index" class="list"
             :class="{'steamBtnActive': currentIndex ==index}"
             @click="getCurrentIndex(index)">
          {{ item.name }}
        </div>
      </section>
    </ContentBox>
    <ContentBox class="box2" :headName="'巡护管理'" @click.native="setThematicIndex(0)">
      <section class="partol-list">
        <div class="detail">
          <span>巡护线路</span>
          <span class="num">{{ lineData.total }}</span>
          <span>条</span>
        </div>
        <div class="detail">
          <span>巡护人次</span>
          <span class="num">{{ lineData.main }}</span>
          <span>人</span>
        </div>
        <div class="detail">
          <span>巡护事件</span>
          <span class="num">{{ lineData.branch }}</span>
          <span>件</span>
        </div>
      </section>
      <section class="partol-img">
        <div v-for="(item,index) in partolImgData" :key="index" :class="item.class">
          <img :src="item.isSelect?item.selectSrc:item.src"
               :title="item.title" @click="imgClick(index)">
          <div :class="{'parActiveClass': item.isSelect}">{{ item.title }}</div>
        </div>
      </section>
      <section class="steam-btn">
        <div v-for="(item,index) in monitorlist" :key="index" class="list"
             :class="{'steamBtnActive': partolIndex ==index}"
             @click="getPartolIndex(index)">
          {{ item.name }}
        </div>
      </section>
      <section class="num-detail">
        <div class="numtol">
          <ul>
            <li v-for="(item,i) in detailData" :key="i">{{ item.name }}<span>{{ item.count }}</span>条</li>
          </ul>
        </div>
      </section>
    </ContentBox>
    <ContentBox class="box3" :headName="'科普科教'">
      <section class="edulis">
        <div v-for="(item,index) in scedulist" :key="index" :class="{'sceduActive': sceduIndex == index}"
             @click="getSceduIndex(index)">
          <span class="dot"></span>
          <span>{{ item.name }}</span>
        </div>
      </section>
      <section class="carousel">
        <el-carousel :interval="4000" type="card" indicator-position="none">
          <el-carousel-item v-for="(item,index) in popularList" :key="index">
            <div class="imgBox">
              <img :src="item.cover_image" :alt="item.title" srcset="">
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
    </ContentBox>
    <!-- <HeadLine :titleName='"服务访问排行"'></HeadLine>
    <section class="sensor">
      <div id="serverAccess" class="serverAccess"></div>
    </section>  
    <HeadLine :titleName='"平台访问统计"'></HeadLine>
    <section class="sensor">
      <div id="platformAccess" class="platformAccess"></div>
    </section>
    <HeadLine :titleName='"专题综合看板"'></HeadLine>
    <section class="sensor">
      <div id="comprehensiveOptions" class="comprehensiveOptions"></div>
    </section>           -->
  </section>
</template>
<script>
import { mapMutations } from "vuex";
import ContentBox from '../../../components/box/index'
// import HeadLine from '../../../components/headLine/index';
import {initEcharts} from '../../../utils/util';
import echartsOptions from './echartOption';
import {getKpkiList, getPatrolbyCalendar, getMonitorbyCalendar} from "../../../api/home";
import {kpkjList, monitorArr, patrolData} from "../../../../tests/data/homeData";

export default {
  components: {
    // HeadLine
    ContentBox
  },
  data() {
    return {
      scedulist: [
        {name: '动物科普'},
        {name: '植物科普'},
        {name: '地质科普'},
        {name: '民俗科普'},
      ],
      popularList: [
      ],
      sceduIndex: 0,
      monitorlist: [
        {name: '当日'},
        {name: '本周'},
        {name: '本月'},
        {name: '本年'}
      ],
      currentIndex: 0,
      partolIndex: 0,
      lineData: {
        total: 0,
        main: 0,
        branch: 0,
      },
      objDetail: {},
      detailData: [],
      monitorRes: null,
      partolImgData: [
        {class: 'img1', src: "img/patrol1.png", selectSrc: "img/select1.png", title: "常规巡护", isSelect: true},
        {class: 'img2', src: "img/patrol2.png", selectSrc: "img/select2.png", title: "执法巡护", isSelect: false},
        {class: 'img3', src: "img/patrol3.png", selectSrc: "img/select3.png", title: "调查巡护", isSelect: false},
        {class: 'img4', src: "img/patrol4.png", selectSrc: "img/select4.png", title: "监测巡护", isSelect: false},
        {class: 'img5', src: "img/patrol5.png", selectSrc: "img/select5.png", title: "其他巡护", isSelect: false}
      ],
      imgIndex: 0,
      partolImgIndex: 0,
      patrolCode: ['regular', 'execute', 'monitor', 'survey', 'other'],
      classCode: ['kpkj_QG2D', 'kpkj_qBMN', 'kpkj_tY3K', 'kpkj_2gLT'],
      intervalId: null,
      timerRoll: null,
      timerPartol: null,
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initPage();
    this.dataRefreh();
    this.getTimeRoll();
  },
  destroyed() {
    this.clear();
  },
  methods: {
     ...mapMutations(["setThematicIndex"]),
    //滚动显示
    getTimeRoll() {
      if (this.timerRoll != null) {
        return;
      }
      this.timerRoll = setInterval(() => {
        this.currentIndex++;
        this.partolIndex++;
        if (this.currentIndex > this.monitorlist.length - 1) {
          this.currentIndex = 0;
        }
        if (this.partolIndex > this.monitorlist.length - 1) {
          this.partolIndex = 0;
        }
        this.getCurrentIndex(this.currentIndex);
        this.getPartolIndex(this.partolIndex);
      }, 1000*60);

      this.timerPartol = setInterval(() => {
        this.partolImgIndex++;
        if (this.partolImgIndex > this.partolImgData.length - 1) {
          this.partolImgIndex = 0;
        }
        this.imgClick(this.partolImgIndex);
      }, 1000*5);
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.initData(); //加载数据函数
        this.initPage();
      }, 60000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
      clearInterval(this.timerRoll); //清除计时器
      this.timerRoll = null; //设置为null
      clearInterval(this.timerPartol); //清除计时器
      this.timerPartol = null; //设置为null
    },
    initData() {
      this.getPatrolby(this.partolIndex);
      this.getKpkj(this.sceduIndex);
    },
    initPage() {
      this.getMonitorby(this.currentIndex);
    },
    timeStamp() {
      let stamp = echartsOptions.getTimeStamp;
      let now = stamp.getNowTime();
      let today = stamp.getToday();
      let week = stamp.getWeek();
      let month = stamp.getMonth();
      let year = stamp.getYear();
      return [
        {
          begin_time: today,
          end_time: now,
        },
        {
          begin_time: week,
          end_time: now,
        },
        {
          begin_time: month,
          end_time: now,
        },
        {
          begin_time: year,
          end_time: now,
        }
      ]
    },
    //周界监控
    async getMonitorby(index) {
      let res = null;
      let timeParams = this.timeStamp();
      if (process.env.NODE_ENV === "test") {
        res = monitorArr[index];
      } else {
        res = await getMonitorbyCalendar(timeParams[index]);
      }
      if (res.code == 200) {
        initEcharts('monitorChart', echartsOptions.monitOptions(res.data));
      }
    },

    //巡护管理
    async getPatrolby(index) {
      let res = null;
      let timeParams = this.timeStamp();
      if (process.env.NODE_ENV === "test") {
        res = patrolData[index];
      } else {
        res = await getPatrolbyCalendar(timeParams[index]);
      }
      if (res.code == 200) {
        this.lineData.total = res.data.route_total;
        this.lineData.main = res.data.patrol_man;
        this.lineData.branch = res.data.patrol_event;

        this.objDetail = res.data.patrol_detail;
        this.detailData = [];
        this.detailData = this.getPatrolLi(this.objDetail, this.imgIndex);
      }
    },
    getPatrolLi(obj, i) {
      let arr = [];
      obj[this.patrolCode[i]].forEach(o => {
        arr.push(o)
      })
      return arr;
    },
    //科普科教
    async getKpkj(index) {
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = kpkjList[index];
      } else {
        res = await getKpkiList({
          category_code: this.classCode[index],
          pageNum: 1,
          pageSize: 9,
        })
      }
      if (res.code == 200) {
        let urlData = res.data.map(item => {
          return {
            title: item.title,
            cover_image: item.cover_image,
            description: item.description,
            video_url: item.video_url,
            voice_url: item.voice_url,
          }
        })
        this.popularList = [];
        this.popularList = urlData;
      }
    },
    getCurrentIndex(index) {
      this.currentIndex = index;
      this.getMonitorby(index);
    },
    getPartolIndex(index) {
      this.partolIndex = index;
      this.getPatrolby(index);
    },
    getSceduIndex(index) {
      this.sceduIndex = index;
      this.getKpkj(index);
    },
    imgClick(i) {
      this.partolImgData[this.imgIndex].isSelect = false;
      this.imgIndex = i;
      this.partolImgData[i].isSelect = true;
      this.detailData = this.getPatrolLi(this.objDetail, this.imgIndex);
    },
  },
}
</script>
<style lang="scss" scoped>
.right-info {
  .box1 {
    height: 292px;
    position: relative;

    .steam-btn {
      position: absolute;
      top: 26%;
      right: 0;

      .list {
        width: 37px;
        height: 28px;
        box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
        border: solid 1px #1c91ff;
        padding: 0 10px;
        line-height: 28px;
        font-size: 12px;
        font-family: SourceHanSansCN-Medium;
        color: #68a9ff;
        margin-right: 15px;
        margin-top: 10px;
        cursor: pointer;
        font-size: 14px;
      }

      .list:hover, .steamBtnActive {
        box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
        border: solid 1px #68e1ff;
        color: #ffffff;
      }
    }

    .monitorChar {
      height: 253px;
      width: 80%;
      margin: 5px 10px;
    }
  }

  .box2 {
    margin-top: 10px;
    height: 370px;
    position: relative;

    .partol-list {
      display: flex;
      justify-content: center;
      align-items: center;

      .detail {
        color: #68a9ff;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding: 0 12px;

        .num {
          background: url('../../../assets/images/bg 拷贝 17.png') no-repeat;
          background-position: center;
          background-size: cover;
          display: inline-block;
          width: 52px;
          height: 52px;
          line-height: 52px;
          font-family: DINNextW1G;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }

    .partol-img {
      background-image: url('../../../assets/images/文字底座.png');
      background-repeat: no-repeat;
      background-size: 95% 95%;
      height: 190px;
      width: 300px;
      margin-left: 60px;
      margin-top: 20px;
      position: relative;

      >div {
        cursor: pointer;
        position: absolute;
        width: 49px;
        height: 49px;
        >img {
          width: 49px;
          height: 49px;
        }
        >div {
          width: 60px;
          font-size: 14px;
          font-family: SourceHanSansCN-Medium;
          color: #68a9ff;
        }
        .parActiveClass {
          color: #FFF32F;
        }
      }

      .img1 {
        top: -5px;
        left: 10px;
      }

      .img2 {
        top: -20px;
        left: 118px;
      }

      .img3 {
        top: -5px;
        right: 15px;
      }

      .img4 {
        top: 90px;
        right: 22px;
      }

      .img5 {
        top: 90px;
        left: 15px;
      }
    }

    .steam-btn {
      position: absolute;
      top: 25%;
      right: 3%;

      .list {
        width: 37px;
        height: 28px;
        box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
        border: solid 1px #1c91ff;
        padding: 0 10px;
        line-height: 28px;
        font-size: 12px;
        font-family: SourceHanSansCN-Medium;
        color: #68a9ff;
        margin-right: 15px;
        margin-top: 10px;
        cursor: pointer;
        font-size: 14px;
      }

      .list:hover, .steamBtnActive {
        box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
        border: solid 1px #68e1ff;
        color: #ffffff;
      }
    }

    .num-detail {
      background: url('../../../assets/images/矩形 14 拷贝 7.png') no-repeat;
      background-size: 100% 100%;
      width: 90%;
      height: 60px;
      margin-left: 28px;
      position: absolute;
      bottom: 5%;

      .numtol {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 99.2%;
        height: 56px;
        background: #0b2345;
        overflow: hidden;

        ul {
          margin: 0;
          padding-inline-start: 0;
          overflow-y: auto;
          width: 102%;
          height: 49px;

          li {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            padding: 0 1px;
            float: left;
            color: #68a9ff;
            list-style-type: none;
            display: inline-block;
            margin-left: 10px;

            span {
              display: inline-block;
              text-align: right;
              margin: 0 2px;
              padding: 1px;
              font-size: 17px;
              color: #FFF32F;
            }
          }
        }
      }
    }
  }

  .box3 {
    margin-top: 10px;
    height: 270px;

    .edulis {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #909199;
      font-size: 16px;
      margin-top: 5px;
      cursor: pointer;

      div {
        padding: 0 15px;

        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 6px;
          border-radius: 5px;
          background-color: #909199;
        }
      }

      .sceduActive {
        color: #68a9ff;

        .dot {
          background-color: #68a9ff;
        }
      }
    }

    .carousel {
      padding: 0 24px;
      margin-top: 15px;

      .el-carousel {

        ::v-deep.el-carousel__container {
          height: 152px;

          .el-carousel__mask {
            background-color: rgba($color: #000000, $alpha: .7);
          }

          .imgBox {
            position: relative;

            img {
              height: 152px;
            }

            .medium {
              margin: 0 auto;
              position: absolute;
              font-size: 24px;
              width: 100%;
              // height: 122px;
              // left: 10px;
              top: 40px;
            }
          }
        }
      }
    }
  }

  .serverAccess {
    height: 186px;
  }

  .platformAccess {
    height: 224px;
  }

  .comprehensiveOptions {
    height: 334px;
  }
}
</style>