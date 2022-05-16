
<template>
  <div class="historyChart">
    <h3 style="color: #2cab7c; text-align: center">
      历史数据统计({{ title }})
    </h3>
    <div class="close" @click="closeWindow"><i class="el-icon-close"></i></div>
    <!-- <ul>
      <li v-for="item in checkArr" :key="item.key">
        <el-checkbox v-model="item.checked" @change="ArrChange">{{
          item.name
        }}</el-checkbox>
      </li>
    </ul> -->
    <div id="myChart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    data: {
      type: Array,
      default: () => { }
    },
    type: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      dataZoom: [],
      title: '',
      checkArr: [
        { name: '空气温度(℃)', key: 'temperature', data: [], checked: true },
        { name: '空气湿度(%)', key: 'humidity', data: [], checked: true },
        { name: '噪声(dB)', key: 'noise', data: [], checked: true },
        { name: 'PM10(ug/m3)', key: 'pmTen', data: [], checked: true },
        { name: 'PM2.5(ug/m3)', key: 'pmTwo', data: [], checked: true },
        { name: '大气压力(kPa)', key: 'pressure', data: [], checked: true },
        { name: '风速(m/s)', key: 'windSpeed', data: [], checked: false }
      ],
      series: [],
    };
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.dealType();
      }
    },
    //观察option的变化
    series: {
      handler() {
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById("myChart"));
          myChart.setOption({}, true);
          this.drawLine();
        })
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    closeWindow() {
      this.$parent.closeHistoryInfo();
    },
    ArrChange() {
      let arr = [];
      this.checkArr.forEach(item => {
        if (item.checked) {
          arr.push({
            name: item.name,
            type: 'line',
            data: item.data,
          })
        }
      })
      this.series = arr;
      this.$nextTick(() => {
        this.drawLine();
      })
    },
    dealType() {
      if (this.type == 2) {
        // 监测站
        this.dealMove(this.data);
      } else {
        this.dealAir(this.data);
        // 大气
      }
    },
    dealMove(array) {
      let xAxisData = [];
      let xData = [];
      let yData = [];
      let zData = [];
      array.forEach(item => {
        xAxisData.push(item.collectTime);
        xData.push(item.xnum);
        yData.push(item.ynum);
        zData.push(item.znum);
      })
      this.xAxisData = xAxisData;
      if (xAxisData.length > 10) {
        this.dataZoom = [{
          type: "slider",//slider表示有滑动块的，
          show: true,
          xAxisIndex: [0],//表示x轴折叠
          start: 60,//数据窗口范围的起始百分比,表示1%
          end: 100,//数据窗口范围的结束百分比,表示35%坐标
          height: 20,
          borderColor: '#2cab7c',
          fillerColor: "#2cab7c",
          textStyle: {
            color: "#2cab7c"
          }
        },];
      }
      this.title = this.name;
      this.series = [{
        name: 'x偏移',
        type: 'line',
        data: xData,
      },
      {
        name: 'y偏移',
        type: 'line',
        data: yData,
      },
      {
        name: 'z偏移',
        type: 'line',
        data: zData,
      }
      ];
    },
    dealAir(array) {
      let xAxisData = [];
      let temperature = [];
      let humidity = [];
      let noise = [];
      let pmTen = [];
      let pmTwo = [];
      let pressure = [];
      let windSpeed = [];
      this.title = this.name;
      for (let index = 0; index < array.length; index++) {
        const item = array[index];
        xAxisData.push(item.createTime);
        temperature.push(item.temperature * 1);
        humidity.push(item.humidity * 1);
        noise.push(item.noise * 1);
        pmTen.push(item.pmTen * 1);
        pmTwo.push(item.pmTwo * 1);
        pressure.push(item.pressure * 1);
        windSpeed.push(item.windSpeed * 1);
      }
      this.xAxisData = xAxisData;
      this.checkArr[0].data = temperature;
      this.checkArr[1].data = humidity;
      this.checkArr[2].data = noise;
      this.checkArr[3].data = pmTen;
      this.checkArr[4].data = pmTwo;
      this.checkArr[5].data = pressure;
      this.checkArr[6].data = windSpeed;
      if (xAxisData.length > 10) {
        this.dataZoom = [{
          type: "slider",//slider表示有滑动块的，
          show: true,
          xAxisIndex: [0],//表示x轴折叠
          start: 60,//数据窗口范围的起始百分比,表示1%
          end: 100,//数据窗口范围的结束百分比,表示35%坐标
          height: 20,
          borderColor: '#2cab7c',
          fillerColor: "#2cab7c",
          textStyle: {
            color: "#2cab7c"
          }
        },];
      }
      this.ArrChange();
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis'
        },
        color: ['rgb(255, 97, 105)', 'rgb(255, 145, 97)', 'rgb(255, 194, 97)', 'rgb(30, 197, 144)', 'rgb(35, 154, 229)', 'rgb(141, 96, 175)'],
        legend: {
          data: this.type == 2 ? ['x偏移', 'y偏移', 'z偏移'] : ['空气温度(℃)','空气湿度(%)','噪声(dB)','PM10(ug/m3)','PM2.5(ug/m3)','大气压力(kPa)','风速(m/s)'],
          x: 'left',
          // top: '11%',
          left: '7%',
          textStyle: {
            // color: '#68a9ff',
            fontSize: 14,
            // padding: [0, 8, 0, 8]
          }
        },
        grid: {
          top: '18%',
          left: '12%',
          right: '10%',
          bottom: '20%',
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#d1d5d9'
              }
            },
            axisLabel: {
              color: '#333',
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
            type: 'value',
            name: this.type == 2 ? '单位：mm' : '',
            axisLine: {
              lineStyle: {
                color: '#333',
                fontSize: 14
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#d1d5d9',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#333',

              },
            },
          },
        ],
        series: this.series,
        dataZoom: this.dataZoom,
      });
    },
  },

};
</script>
<style lang="less" scoped>
.historyChart {
  position: absolute;
  top: 20%;
  right: 33%;
  width: 750px;
  background-color: rgba(255, 255, 255, 0.9);
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      list-style: none;
      padding: 4px 10px;
    }
  }
}
#myChart {
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
}
</style>