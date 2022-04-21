/*
 * @Author: 任继民
 * @Date: 2021-03-03 10:57:40
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-16 16:29:02
 * @Description: 
 */
import * as echarts from "echarts";
// const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
const hexToRgba = (hex, opacity) => {
  let rgbaColor = "";
  let reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${
      parseInt(
        "0x" + hex.slice(3, 5),
      )
    },${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
};
export default {
  lineOptions: {
    legend: {
      icon: "circle",
      top: "1%",
      // right: "5%",
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        color: "#556677",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        label: {
          show: true,
          backgroundColor: "#fff",
          color: "#556677",
          borderColor: "rgba(0,0,0,0)",
          shadowColor: "rgba(0,0,0,0)",
          shadowOffsetY: 0,
        },
        lineStyle: {
          width: 0,
        },
      },
      backgroundColor: "#fff",
      textStyle: {
        color: "#5c6c7c",
      },
      padding: [10, 10],
      extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
    },
    grid: {
      left:0,
      top:0,
      right:0,
      bottom:0
    },
    xAxis: [{
      type: "category",
      data: ["北京", "上海", "广州", "深圳", "香港", "澳门", "台湾"],
      axisLine: {
        lineStyle: {
          color: "rgba(107,107,107,0.37)", //x轴颜色
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#999", //坐标轴字颜色
        },
        margin: 15,
      },
      axisPointer: {
        label: {
          padding: [11, 5, 7],
          backgroundColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: "#fff", // 0% 处的颜色
            }, {
              offset: 0.9,
              color: "#fff", // 0% 处的颜色
            }, {
              offset: 0.9,
              color: "#33c0cd", // 0% 处的颜色
            }, {
              offset: 1,
              color: "#33c0cd", // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          },
        },
      },
      boundaryGap: false,
    }],
    yAxis: [{
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(107,107,107,0.37)", //y轴颜色
        },
      },
      axisLabel: {
        textStyle: {
          color: "#999",
        },
      },
      splitLine: {
        show: false,
      },
    }],
    series: [{
      name: "Adidas",
      type: "line",
      data: [10, 10, 100, 12, 15, 3, 7],
      // symbolSize: 1,
      smooth: true,
      symbolSize: 5,
      zlevel: 3,
      lineStyle: {
        normal: {
          color: "#68a9ff",
          // shadowBlur: 3,
          // shadowColor: hexToRgba("#8B5CFF", 0.5),
          // shadowOffsetY: 8,
        },
      },
      symbol: "circle", //数据交叉点样式
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
              offset: 0,
              color: hexToRgba("#8B5CFF", 0.3),
            }, {
              offset: 1,
              color: hexToRgba("#8B5CFF", 0.1),
            }],
            false,
          ),
          // shadowColor: hexToRgba("#8B5CFF", 0.1),
          // shadowBlur: 10,
        },
      },
    }],
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
      left:0,
      top:0,
      right:0,
      bottom:0
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
