/*
 * @Author: 任继民
 * @Date: 2021-03-03 10:57:40
 * @LastEditors: 任继民
 * @LastEditTime: 2021-04-06 16:32:19
 * @Description: 
 */
import * as echarts from "echarts";
// const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
// const hexToRgba = (hex, opacity) => {
//   let rgbaColor = "";
//   let reg = /^#[\da-f]{6}$/i;
//   if (reg.test(hex)) {
//     rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${
//       parseInt(
//         "0x" + hex.slice(3, 5),
//       )
//     },${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
//   }
//   return rgbaColor;
// };
export default {
  emergencyOptions: {
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c}",
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "0%",
      right: "10%",
      top: "15%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      //坐标轴
      axisLine: {
        lineStyle: {
          color: "#3eb2e8",
        },
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      //坐标轴
      axisLine: {
        show: false,
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
      //分格线
      splitLine: {
        lineStyle: {
          color: "#4784e8",
        },
      },
    },
    series: [{
      name: "a",
      tooltip: {
        show: false,
      },
      type: "bar",
      barWidth: 16,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: "#005559", // 0% 处的颜色
          }, // {
          //   offset: 0.6,
          //   color: "#005559 ", // 60% 处的颜色
          // },
          {
            offset: 1,
            color: "#01f0ff", // 100% 处的颜色
          }], false),
        },
      },
      data: [220, 182, 191, 234, 290, 330, 310],
      barGap: 0,
    }, {
      type: "bar",
      barWidth: 5,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: "#005559", // 0% 处的颜色
          }, // {
          //   offset: 0.6,
          //   color: "#005559", // 60% 处的颜色
          // },
          {
            offset: 1,
            color: "#01f0ff", // 100% 处的颜色
          }], false),
        },
      },
      barGap: 0,
      data: [238, 200, 209, 248, 308, 348, 328],
    }, {
      name: "b",
      tooltip: {
        show: false,
      },
      type: "pictorialBar",
      itemStyle: {
        borderWidth: 1,
        borderColor: "#005559",
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: "#005559", // 0% 处的颜色
          }, // {
          //   offset: 0.6,
          //   color: "#005559", // 60% 处的颜色
          // },
          {
            offset: 1,
            color: "#01f0ff", // 100% 处的颜色
          }], false),
        },
      },
      symbol: "path://M 0,0 l 120,0 l -30,60 l -120,0 z",
      symbolSize: ["20", "8"],
      symbolOffset: ["0", "-8"],
      //symbolRotate: -5,
      symbolPosition: "end",
      data: [220, 182, 191, 234, 290, 330, 310],
      z: 3,
    }],
  },
  staticInfoOptions: {
    grid: {
      left: "0%",
      right: "10%",
      top: "15%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      textStyle: {
        fontSize: "16",
      },
    },
    legend: {
      show: true,
      x: "center",
      y: "1%",
      itemWidth: 45,
      itemHeight: 18,
      textStyle: {
        color: "#fff",
        fontSize: "16",
      },
    },
    xAxis: [
      {
        type: "category",
        name: "",
        nameTextStyle: {
          fontSize: "16",
          color: "#ffffff",
          lineHeight: 90,
        },
        axisLabel: {
          color: "#ffffff",
          fontSize: "16",
          margin: 30,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#406A92",
            width: 3,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#195384",
          },
        },
        data: ["应急分队1", "应急分队2", "应急分队3", "应急分队4"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "",
        nameTextStyle: {
          fontSize: "16",
          color: "#ffffff",
        },
        nameGap: 30,
        axisLabel: {
          show: false,
          formatter: "{value}",
          margin: 20,
          textStyle: {
            color: "#ffffff",
            fontSize: "16",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#406A92",
            width: 3,
          },
        },
        splitArea: {
          show: false,
          areaStyle: {
            color: ["rgba(128,160,176,.1)", "rgba(250,250,250,0)"],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#406A92",
          },
        },
      },
    ],
    series: [
      {
        "name": "",
        type: "pictorialBar",
        symbolSize: [36, 18],
        symbolOffset: [0, -10],
        symbolPosition: "end",
        z: 12,
        tooltip: {
          show: false,
        },
        "label": {
          "normal": {
            "show": true,
            "position": "top",
            fontSize: "16",
            color: "#fff",
          },
        },
        color: "#5a9cf3",
        data: [40, 29, 32, 20],
      },
      {
        name: "",
        type: "pictorialBar",
        tooltip: {
          show: false,
        },
        symbolSize: [60, 30],
        symbolOffset: [0, 15],
        z: 10,
        itemStyle: {
          normal: {
            color: "transparent",
            borderColor: "#5a9cf3",
            borderType: "solid",
            borderWidth: 3,
          },
        },
        data: [40, 29, 32, 20],
      },
      {
        name: "",
        type: "pictorialBar",
        tooltip: {
          show: false,
        },
        symbolSize: [70, 40],
        symbolOffset: [0, 20],
        z: 10,
        itemStyle: {
          normal: {
            color: "transparent",
            borderColor: "#5a9cf3",
            borderType: "solid",
            borderWidth: 4,
          },
        },
        data: [40, 29, 32, 20],
      },
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [36, 18],
        tooltip: {
          show: false,
        },
        symbolOffset: [0, 10],
        z: 12,
        "color": "#5a9cf3",
        "data": [40, 29, 32, 20],
      },
      {
        type: "bar",
        barWidth: "36",
        barGap: "10%",
        barCateGoryGap: "10%",
        itemStyle: {
          normal: {
            color: "#5a9cf3",
            opacity: .8,
          },
        },
        data: [40, 29, 32, 20],
      },
    ],
  },
  lineOptions: {
    grid: {
      left: "0%",
      right: "10%",
      top: "15%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    legend: {
      show: true,
      x: "center",
      y: "35",
      icon: "stack",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#1bb4f6",
      },
      data: ["已采纳", "已发布", "浏览量"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: "#30eee9",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#397cbc",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#195384",
          },
        },
        data: [
          "2020-02-25 16:22:41",
          "2020-02-25 16:23:11",
          "2020-02-25 16:23:41",
          "2020-02-25 16:24:11",
          "2020-02-25 16:24:41",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        // name : '信息量',
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#2ad1d2",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#27b4c2",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#11366e",
          },
        },
      },
    ],
    series: [
      {
        name: "已采纳",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#0092f6",
            lineStyle: {
              color: "#0092f6",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: "rgba(7,44,90,0.3)",
              }, {
                offset: 1,
                color: "rgba(0,146,246,0.9)",
              }]),
            },
          },
        },
        markPoint: {
          itemStyle: {
            normal: {
              color: "red",
            },
          },
        },
        data: [9, 3, 5, 3, 2],
      },
      {
        name: "已发布",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,

        itemStyle: {
          normal: {
            color: "#00d4c7",
            lineStyle: {
              color: "#00d4c7",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: "rgba(7,44,90,0.3)",
              }, {
                offset: 1,
                color: "rgba(0,212,199,0.9)",
              }]),
            },
          },
        },
        data: [1, 3, 6, 5, 2],
      },
      {
        name: "浏览量",
        type: "line",
        stack: "总量",
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#aecb56",
            lineStyle: {
              color: "#aecb56",
              width: 1,
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: "rgba(7,44,90,0.3)",
              }, {
                offset: 1,
                color: "rgba(114,144,89,0.9)",
              }]),
            },
          },
        },
        data: [1, 2, 3, 4, 7],
      },
    ],
  },
  statisticsOptions: {
    title: {
      text: "数量",
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "#F1F1F3",
      },
      top: "10%",
      left: "1.5%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "15%",
      right: "3%",
      left: "10%",
      bottom: "10%",
    },
    xAxis: [{
      type: "category",
      data: ["湖北", "福建", "山东", "广西", "浙江", "河南", "河北"],
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.12)",
        },
      },
      axisLabel: {
        margin: 10,
        color: "#e2e9ff",
        textStyle: {
          fontSize: 14,
        },
      },
    }],
    yAxis: [{
      splitNumber: 3,
      axisLabel: {
        formatter: "{value}",
        color: "#e2e9ff",
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#233e64",
        },
      },
    }],
    series: [{
      type: "bar",
      data: [300, 450, 770, 203, 255, 188, 156],
      barWidth: "7px",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(0,244,255,1)", // 0% 处的颜色
          }, {
            offset: 1,
            color: "rgba(0,77,167,1)", // 100% 处的颜色
          }], false),
          barBorderRadius: [30, 30, 30, 30],
          shadowColor: "rgba(0,160,221,1)",
          shadowBlur: 4,
        },
      },
    }],
  },
  assessOptions: {
    tooltip: {
      trigger: "item",
    },
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [{
      type: "pie",
      center: ["50%", "50%"],
      radius: ["24%", "45%"],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 30,
      emphasis: {
        itemStyle: {
          borderColor: "#f3f3f3",
          borderWidth: 20,
        },
      },
      // itemStyle: {
      //     normal: {
      //         color: function(params) {
      //             return colorList[params.dataIndex]
      //         }
      //     }
      // },
      label: {
        show: true,
        position: "outside",
        formatter: "{a|{b}：{d}%}\n{hr|}",
        rich: {
          hr: {
            backgroundColor: "t",
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12],
          },
          a: {
            padding: [-30, 15, -20, 15],
          },
        },
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1,
          },
        },
      },
      data: [{
        "name": "北京",
        "value": 5600,
      }, {
        "name": "上海",
        "value": 3600,
      }, {
        "name": "广州",
        "value": 1500,
      }, {
        "name": "深圳",
        "value": 2000,
      }, {
        "name": "未知",
        "value": 899,
      }, {
        "name": "海外",
        "value": 4000,
      }],
    }],
  },
};
