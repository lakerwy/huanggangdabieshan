<template>
  <div id="gygk">
    <div class="tab">
      <span
        class="tab-item"
        :class="currentInd == ind ? 'tab-item-active' : ''"
        @click="tabItemChange(item)"
        v-for="(item, ind) in tabData"
        :key="ind"
        >{{ item.name }}</span
      >
    </div>
    <div class="content">
      <div class="content-item" v-show="currentInd == 0">
        <div class="box">
          <h4>分布格局</h4>
          <div class="box-tab">
            <span
              class="box-tab-item"
              :class="yqTabInx == ind ? 'active' : ''"
              @click="YqTabChange(item)"
              v-for="(item, ind) in boxTabData"
              :key="ind + 200"
              >{{ item.name }}</span
            >
          </div>
          <div class="box-content1">
            <div
              class="box-content-item"
              v-for="(item, inx) in boxContentData"
              :key="inx + 300"
            >
              <div class="pic">
                <el-tooltip
                  effect="dark"
                  :content="item.remark"
                  placement="bottom"
                  popper-class="board1"
                >
                  <img :src="imgUrl + item.imgurl" />
                </el-tooltip>
                <span class="pic-tag">详情</span>
              </div>
              <p>{{ item.label }}</p>
              <p class="distance" v-show="yqTabInx == 0">
                {{ item.value }} k㎡
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item" v-show="currentInd == 1">
        <div id="pieChart"></div>
        <div class="right-box">
          <div
            class="right-box-item"
            v-for="(item, i) in rightBoxData"
            :key="i + 600"
          >
            <p class="val">
              <span>{{ item.val }}</span
              >个
            </p>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="content-item" v-show="currentInd == 2">
        <div class="bg2">
          <div class="total">
            <p>
              <span>{{ rwjgTotal }}</span
              >个
            </p>
            <p>人文景观</p>
          </div>
          <div class="bg2-item">
            <div
              class="item"
              :class="
                ii == 0 ? 'item1' : ii == 1 ? 'item2' : ii == 2 ? 'item3' : ''
              "
              v-for="(item, ii) in rwjgList"
              :key="ii + 800"
            >
              <span>{{ item.value }}个</span>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item" v-show="currentInd == 3">
        <div class="box" v-for="(item, ii) in tab4List" :key="ii + 100">
          <h4>{{ item.title }}</h4>
          <div class="box-content">
            <div
              class="box-item"
              v-for="(data, iii) in item.boxList"
              :key="iii + 100"
            >
              {{ data.label }}<i>{{ data.value }}</i
              >种
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSurvey, getRelicLevel } from "@/api/board";
import echarts from "echarts";
export default {
  name: "echarts",
  data() {
    return {
      timer:'',
      currentInd: 0,
      yqTabInx: 0,
      yqTabName: "",
      boxTabData: [],
      yqgc: {},
      boxContentData: [],
      rightBoxData: [],
      rwjgTotal: 0,
      rwjgList: [],
      tabData: [
        {
          index: 0,
          name: "园区构成",
        },
        {
          index: 1,
          name: "地质遗迹",
        },
        {
          index: 2,
          name: "人文景观",
        },
        {
          index: 3,
          name: "生物多样性",
        },
      ],
      chartData: [
        {
          name: "世界级(≥ 90分)",
          value: 3,
        },
        {
          name: "国家级(89-75分)",
          value: 17,
        },
        {
          name: "省级(74-60分)",
          value: 20,
        },
        {
          name: "市级(59-45分)",
          value: 42,
        },
      ],
      // 生物多样性数据
      tab4List: [],
      imgUrl: window.globalUrl.FTP_URL,
    };
  },
  mounted() {
    this.initData();
    this.timer = setInterval(this.changeNav,10000);
  },
  beforeUnmount(){
    clearInterval(this.timer)
  },
  methods: {
    changeNav() {
      this.currentInd++;
      if (this.currentInd > 3) {
        this.currentInd = 0;
      }else if(this.currentInd ==1){
        this.list();
      }
    },
    tabItemChange(item) {
      this.currentInd = item.index;

    },
    YqTabChange(item) {
      this.yqTabInx = item.index;
      this.yqTabName = item.name;
      for (let k in this.yqgc) {
        if (k == this.yqTabName) {
          this.boxContentData = this.yqgc[k];
        }
      }
    },
    async initData() {
      let res = await getSurvey();
      if (res.success) {
        // 园区构成
        this.yqgc = res.body.yqgc;
        Object.keys(this.yqgc).forEach((item, i) => {
          this.boxTabData.push({
            index: i,
            name: item,
          });
        });
        this.YqTabChange(this.boxTabData[0]);
        // 人文景观
        let rwjg = res.body.rwjg;
        this.rwjgList = rwjg["无"];
        let total = 0;
        this.rwjgList.forEach((item) => {
          total += Number(item.value);
        });
        this.rwjgTotal = total;
        // 生物多样性
        let swdyx = res.body.swdyx;
        Object.keys(swdyx).forEach((item, i) => {
          let boxList;
          for (let k in swdyx) {
            if (item == k) {
              boxList = swdyx[k];
            }
          }
          this.tab4List.push({
            title: item,
            boxList: boxList,
          });
        });
      }
      // 地质遗迹
      let res2 = await getRelicLevel("黄冈市");
      if (res2.success) {
        let data = [];
        this.chartData.forEach((obj, index) => {
          res2.body.data.forEach((item) => {
            if (index + 1 == item.level) {
              obj.value = item.count;
            }
          });
        });
        res2.body.data.forEach((item) => {
          if (item.level != 5) {
            data.push({
              name: this.filterKey(item.level),
              val: item.count,
            });
          }
        });
        this.rightBoxData = data;
      }
    },
    async list() {
      let data = this.chartData;
      let arrName = this.getArrayValue(data, "name");
      let arrValue = this.getArrayValue(data, "value");
      let sumValue = eval(arrValue.join("+"));
      let objData = this.array2obj(data, "name");
      let optionData = await this.getData(data, sumValue);
      let options = {
        // animation: false,
        legend: {
          show: true,
          orient: "horizontal",
          bottom: "8%",
          left: "42%",
          data: arrName,
          icon: "rect",
          itemWidth: 15,
          itemHeight: 15,
          padding: [0, 5],
          itemGap: 10,
          formatter: function (name) {
            return "{title|" + name + "}";
          },
          textStyle: {
            rich: {
              title: {
                width: 100,
                fontSize: 14,
                color: "#fff",
              },
            },
          },
        },
        color: ["#ff0000", "#ff8700", "#ffc300", "#00e473"],
        grid: {
          top: "17%",
          bottom: "54%",
          left: "25%",
          containLabel: false,
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              inside: true,
              textStyle: {
                color: "#859daa",
                fontSize: 12,
              },
              show: true,
            },
            data: optionData.yAxis,
          },
        ],
        xAxis: [
          {
            show: false,
          },
        ],
        series: optionData.series,
      };
      var myChart = echarts.init(document.getElementById("pieChart"));
      myChart.setOption(options);
    },
    filterKey(key) {
      switch (key) {
        case "1":
          return "世界级";
        case "2":
          return "国家级";
        case "3":
          return "省级";
        case "4":
          return "市级";
        case "5":
          return "县级";
      }
    },
    getArrayValue(array, key) {
      var key = key || "value";
      var res = [];
      if (array) {
        array.forEach(function (t) {
          res.push(t[key]);
        });
      }
      return res;
    },

    array2obj(array, key) {
      var resObj = {};
      for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
      }
      return resObj;
    },

    getData(data, sumValue) {
      var res = {
        series: [],
        yAxis: [],
      };
      for (let i = 0; i < data.length; i++) {
        res.series.push({
          name: "地质遗迹",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [75 - i * 15 + "%", 68 - i * 15 + "%"],
          center: ["25%", "55%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: data[i].value,
              name: data[i].name,
            },
            {
              value: sumValue - data[i].value,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.series.push({
          name: "",
          type: "pie",
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [75 - i * 15 + "%", 68 - i * 15 + "%"],
          center: ["25%", "55%"],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: "#eef2f5",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
            {
              value: 2.5,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        });
        res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + "%");
      }
      return res;
    },
  },
};
</script>
<style lang="less" scoped>
#gygk {
  height: calc(100% - 37px);
  width: 100%;
  .tab {
    width: 100%;
    display: flex;
    padding: 12px 18px 5px 32px;
    box-sizing: border-box;
    .tab-item {
      flex: 1;
      line-height: 24px;
      border: 1px solid #22a0e1;
      margin-right: 18px;
      text-align: center;
      color: #22a0e1;
      font-size: 14px;
      cursor: pointer;
      &.tab-item-active {
        color: #fff;
        background: linear-gradient(0deg, #1053eb 0%, #1d83ca 100%);
        border-color: transparent;
      }
    }
  }
  .content {
    .content-item {
      position: relative;
      .box {
        background: url("../../assets/images/gygk-bg1.png") no-repeat top center;
        h4 {
          color: #1298fa;
          font-size: 16px;
          text-align: center;
          margin: 0;
          padding: 3% 0;
        }
        .box-content {
          display: flex;
          padding: 12px 30px 0;
          .box-item {
            flex: 1;
            text-align: center;
            color: #fff;
            font-size: 14px;
            i {
              color: #00a4f7;
              font-size: 24px;
              font-weight: normal;
              margin: 0 5px;
            }
          }
        }
        .box-tab {
          text-align: center;
          font-weight: bold;
          .box-tab-item {
            margin-right: 55px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              color: #00a4f7;
            }
          }
        }
        .box-content1 {
          display: flex;
          width: 80%;
          justify-content: space-between;
          margin: 3% auto;
          .box-content-item {
            margin-right: 42px;
            text-align: center;
            .pic {
              position: relative;
              width: 100px;
              height: 60px;
              margin-bottom: 6px;
              img {
                width: 100%;
                height: 100%;
              }
              .pic-tag {
                position: absolute;
                right: 5px;
                top: 5px;
                padding: 0 5px;
                background-color: orange;
                color: #fff;
                font-size: 14px;
              }
            }
            p {
              margin: 0;
              color: #fff;
              font-size: 14px;
              line-height: 18px;
              &.distance {
                color: #00a4f7;
                font-style: italic;
              }
            }
          }
        }
      }
    }
    #pieChart {
      width: 100%;
      height: 200px;
    }
    .right-box {
      position: absolute;
      left: 38%;
      top: 15%;
      display: flex;
      width: 55%;
      padding: 3px 0 8px 15px;
      background: url("../../assets/images/gygk-box.png") no-repeat top center;
      .right-box-item {
        flex: 1;
        p {
          color: #859daa;
          font-size: 16px;
          margin: 0;
          &.val {
            color: #00a4f7;
            span {
              font-size: 28px;
            }
          }
        }
      }
    }
    .bg2 {
      position: relative;
      width: 90%;
      height: 170px;
      margin-top: 15px;
      background: url("../../assets/images/gygk-bg2.png") no-repeat top center;
      background-size: contain;
      .total {
        position: absolute;
        top: 50%;
        left: 38%;
        transform: translate(-50%, -50%);
        text-align: center;
        p {
          margin: 0;
          color: #fff;
          font-size: 14px;
          span {
            font-size: 24px;
            font-weight: bold;
            font-style: italic;
            padding: 0 2px;
          }
        }
      }
      .bg2-item {
        .item {
          position: absolute;
          &.item1 {
            left: 62%;
            top: 8%;
          }
          &.item2 {
            left: 69.4%;
            top: 46.5%;
          }
          &.item3 {
            left: 60.4%;
            top: 80%;
          }
          span {
            display: inline-block;
            color: #fff;
            font-size: 14px;
            &:first-child {
              width: 40px;
              text-align: center;
            }
            &:last-child {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>