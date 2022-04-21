<template>
  <ContentBox
    class="box2"
    :headName="'巡护管理'"
    @click.native="setThematicIndex('XHGL')"
  >
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
      <div
        v-for="(item, index) in partolImgData"
        :key="index"
        :class="item.class"
      >
        <el-popover placement="left" trigger="click" popper-class="xh-popper">
          <section class="num-detail">
            <div class="numtol">
              <ul>
                <li v-for="(item, i) in detailData" :key="i">
                  {{ item.name }}<span>{{ item.count }}</span
                  >条
                </li>
              </ul>
            </div>
          </section>
          <img
            :src="item.isSelect ? item.selectSrc : item.src"
            :title="item.title"
            slot="reference"
            @click="imgClick(index)"
          />
        </el-popover>

        <div :class="{ parActiveClass: item.isSelect }">{{ item.title }}</div>
      </div>
    </section>
    <section class="steam-btn">
      <div
        v-for="(item, index) in monitorlist"
        :key="index"
        class="list"
        :class="{ steamBtnActive: partolIndex == index }"
        @click="getPartolIndex(index)"
      >
        {{ item.name }}
      </div>
    </section>
  </ContentBox>
</template>
<script>
import { mapMutations } from "vuex";
import ContentBox from "../../../components/box/index";
import { getPatrolbyCalendar } from "../../../api/home";
import { patrolData } from "../../../../tests/data/homeData";
import echartsOptions from "./echartOption";
export default {
  components: {
    // HeadLine
    ContentBox
  },
  data() {
    return {
      lineData: {
        total: 0,
        main: 0,
        branch: 0
      },
      imgIndex: 0,
      partolIndex: 0,
      detailData: [],
      monitorlist: [
        { name: "当日" },
        { name: "本周" },
        { name: "本月" },
        { name: "本年" }
      ],
      patrolCode: ["regular", "execute", "monitor", "survey", "other"],
      partolImgData: [
        {
          class: "img1",
          src: "img/patrol1.png",
          selectSrc: "img/select1.png",
          title: "常规巡护",
          isSelect: true
        },
        {
          class: "img2",
          src: "img/patrol2.png",
          selectSrc: "img/select2.png",
          title: "执法巡护",
          isSelect: false
        },
        {
          class: "img3",
          src: "img/patrol3.png",
          selectSrc: "img/select3.png",
          title: "调查巡护",
          isSelect: false
        },
        {
          class: "img4",
          src: "img/patrol4.png",
          selectSrc: "img/select4.png",
          title: "监测巡护",
          isSelect: false
        },
        {
          class: "img5",
          src: "img/patrol5.png",
          selectSrc: "img/select5.png",
          title: "其他巡护",
          isSelect: false
        }
      ]
    };
  },
  created() {
    this.getPatrolby(this.partolIndex);
    setInterval(() => {
      this.getPatrolby(this.partolIndex);
    }, 1000 * 60);
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    getPatrolLi(obj, i) {
      let arr = [];
      obj[this.patrolCode[i]].forEach(o => {
        arr.push(o);
      });
      return arr;
    },
    getPartolIndex(index) {
      this.partolIndex = index;
      this.getPatrolby(index);
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
          end_time: now
        },
        {
          begin_time: week,
          end_time: now
        },
        {
          begin_time: month,
          end_time: now
        },
        {
          begin_time: year,
          end_time: now
        }
      ];
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
    imgClick(i) {
      this.partolImgData[this.imgIndex].isSelect = false;
      this.imgIndex = i;
      this.partolImgData[i].isSelect = true;
      this.detailData = this.getPatrolLi(this.objDetail, this.imgIndex);
    }
  }
};
</script>
<style lang="less" scoped>
.box2 {
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
        background: url("../../../assets/images/bg 拷贝 17.png") no-repeat;
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
    background-image: url("../../../assets/images/文字底座.png");
    background-repeat: no-repeat;
    background-size: 95% 95%;
    height: 190px;
    width: 300px;
    margin-left: 60px;
    margin-top: 20px;
    position: relative;

    > div {
      cursor: pointer;
      position: absolute;
      width: 49px;
      height: 49px;
      > img {
        width: 49px;
        height: 49px;
      }
      > div {
        width: 60px;
        font-size: 14px;
        font-family: SourceHanSansCN-Medium;
        color: #68a9ff;
      }
      .parActiveClass {
        color: #fff32f;
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

    .list:hover,
    .steamBtnActive {
      box-shadow: inset 2px 0px 8px 0px rgba(50, 111, 166, 0.8);
      border: solid 1px #68e1ff;
      color: #ffffff;
    }
  }
}
</style>

<style lang="less">
.xh-popper {
  border: solid 1px #68a9ff;
  box-shadow: 0px 1px 19px #68a9ff inset;
  background: rgba(0, 0, 0, 0.5) !important;
  min-width: 150px;
  padding: 5px;
  color: #fff;
  font-size: 14px;
  border-radius: 0;
  .num-detail {
    min-height: 50px;
    max-height: 200px;
    overflow: auto;
    ul {
      margin: 0;
      li {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        padding: 0 1px;

        span {
          display: inline-block;
          text-align: right;
          margin: 0 2px;
          padding: 1px;
          font-size: 17px;
          color: #fff32f;
        }
      }
    }
  }
}
</style>
