<template>
  <div class="page">
    <div id="dzzh"></div>
    <div class="block">
      <el-date-picker
        class="date"
        v-model="value1"
        type="date"
        placeholder="选择日期"
        popper-class="mydatestyle"
        @change="changeDate"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import { getLandslideData } from "@/api/board";
import echarts from "echarts";
export default {
  name: "echarts",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value1: new Date(),
      xAxisData: [],
      dataZoom: [],
      series: [],
    };
  },
  mounted() {
    this.changeDate();
  },
  watch: {
    series: {
      handler() {
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById("dzzh"));
          myChart.setOption({}, true);
          this.drawLine();
        });
      },
      deep: true, //对象内部属性的监听，关键。
    },
  },
  created() {
    window.addEventListener("resize", () => {
      let erd = elementResizeDetectorMaker();
      if (!!document.getElementById("dzzh")) {
        erd.listenTo(document.getElementById("dzzh"), (element) => {
          this.$nextTick(() => {
            echarts.init(document.getElementById("dzzh")).resize();
          });
        });
      }
    });
  },
  methods: {
    changeDate(val) {
      this.loadData(this.transDate(val));
    },
    transDate(val) {
      var date = null;
      if (val) {
        date = new Date(val);
      } else {
        date = new Date();
      }
      var year = date.getFullYear();
      var month =
        date.getMonth() > 9 ? date.getMonth() + 1 : "0" + date.getMonth() + 1;
      var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      var time = year + "-" + month + "-" + day;
      return time;
    },
    loadData(time) {
      getLandslideData({ time: time }).then((res) => {
        if (res.success && res.body.length) {
          let xAxisData = [];
          let xData = [];
          let yData = [];
          let zData = [];
          res.body.forEach((item) => {
            xAxisData.push(
              item.collectTime.substring(0, item.collectTime.length - 3)
            );
            xData.push(item.xnum);
            yData.push(item.ynum);
            zData.push(item.znum);
          });
          this.xAxisData = xAxisData;
          if (xAxisData.length > 20) {
            this.dataZoom = [
              {
                type: "slider", //slider表示有滑动块的，
                show: true,
                xAxisIndex: [0], //表示x轴折叠
                start: 60, //数据窗口范围的起始百分比,表示1%
                end: 100, //数据窗口范围的结束百分比,表示35%坐标
                height: 10,
                bottom: "5%",
                borderColor: "#2cab7c",
                fillerColor: "#2cab7c",
                textStyle: {
                  color: "transparent",
                },
              },
            ];
          }
          this.series = [
            {
              name: "x偏移",
              type: "line",
              data: xData,
            },
            {
              name: "y偏移",
              type: "line",
              data: yData,
            },
            {
              name: "z偏移",
              type: "line",
              data: zData,
            },
          ];
        }
      });
    },
    drawLine() {
      var options = {
        tooltip: {
          trigger: "axis",
        },
        color: ["#57fdc4", "#facd89", "#11c7f5"],
        grid: {
          top: "18%",
          left: "10%",
          right: "10%",
          bottom: "20%",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#425b78",
              },
            },
            axisLabel: {
              color: "#b9bec6",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: this.xAxisData,
          },
        ],

        yAxis: [
          {
            type: "value",
            name: "单位：mm",
            nameTextStyle: {
              color: "#b9bec6",
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: "#425b78",
                fontSize: 14,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#587485",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#b9bec6",
              },
            },
          },
        ],
        series: this.series,
        dataZoom: this.dataZoom,
      };
      var myChart = echarts.init(document.getElementById("dzzh"));
      myChart.setOption(options);
    },
  },
};
</script>

<style lang="less" scoped>
// @import "./dateSelect.less";
.page {
  height: calc(100% - 37px);
  width: 100%;
  position: relative;
  #dzzh {
    height: 100%;
    width: 100%;
  }
  .block {
    position: absolute;
    top: 1%;
    right: 5%;
  }
}
/deep/.el-input {
  width: 96px;
  > span {
    display: none;
  }
}
/deep/.el-input__inner {
  color: #fff;
  background-color: #061a2e;
  border: 1px solid #0f70a1;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
}
</style>