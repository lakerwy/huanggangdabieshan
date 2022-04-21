/*
 * @Author: 任继民
 * @Date: 2021-03-03 10:57:40
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-06 14:03:39
 * @Description: 
 */
import * as echarts from "echarts";
export default {
  eventsOptions: {
    tooltip: {
      trigger: "axis",
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "10%",
      top: "14%",
      containLabel: true,
    },
    legend: {
      data: ["1", "2", "3"],
      right: 10,
      top: 12,
      textStyle: {
        color: "#fff",
      },
      itemWidth: 12,
      itemHeight: 10,
      // itemGap: 35
    },
    xAxis: {
      type: "category",
      data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
      axisLine: {
        lineStyle: {
          color: "white",
        },
      },
      axisLabel: {
        // interval: 0,
        // rotate: 40,
        textStyle: {
          fontFamily: "Microsoft YaHei",
        },
      },
    },

    yAxis: {
      type: "value",
      max: "1200",
      axisLine: {
        show: false,
        lineStyle: {
          color: "white",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,0.3)",
        },
      },
      axisLabel: {},
    },
    series: [ {
      name: "2",
      type: "bar",
      barWidth: "15%",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#8bd46e",
          }, {
            offset: 1,
            color: "#09bcb7",
          }]),
          barBorderRadius: 11,
        },
      },
      data: [400, 500, 500, 500, 500, 400, 400, 500, 500],
    }, {
      name: "3",
      type: "bar",
      barWidth: "15%",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#248ff7",
          }, {
            offset: 1,
            color: "#6851f1",
          }]),
          barBorderRadius: 11,
        },
      },
      data: [400, 600, 700, 700, 1000, 400, 400, 600, 700],
    }],
  },
};
