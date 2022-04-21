/*
 * @Author: 任继民
 * @Date: 2021-03-08 09:52:29
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-17 09:54:38
 * @Description: 
 */
import * as echarts from "echarts";
export default {
  cameraOptions: {
    tooltip: {
      trigger: "axis",
      show: false,
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      selectedMode: false,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [{
      splitLine: {
        show: false,
      },
      type: "value",
      show: false,
    }],
    yAxis: [{
      splitLine: {
        show: false,
      },
      axisLine: { //y轴
        show: false,
      },
      type: "category",
      axisTick: {
        show: false,
      },
      data: ["人脸抓拍摄像机", "多摄双舱摄像机", "大广角摄像机", "河道监控警戒球机", "全域鹰眼监控球机", "卡口摄像头"],
      axisLabel: {},
    }],
    series: [{
      name: "标准化",
      type: "bar",
      barWidth: 12, // 柱子宽度
      label: {
        show: true,
        position: "right", // 位置
        color: "#1CD8A8",
        fontSize: 14,
        fontWeight: "bold", // 加粗
        distance: 5, // 距离
      }, // 柱子上方的数值
      itemStyle: {
        barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            "#30a43f",
            "#78e25e",
          ].map((color, offset) => ({
            color,
            offset,
          })),
        ), // 渐变
      },
      data: [320, 302, 341, 374, 390, 650, 420],
    }],
  },
  importAndexportOptions: {
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
        data: ["内部人员", "非内部人员", "内部车辆"],
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
        data: [298, 300, 430],
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
        data: [298, 300, 430],
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
        data: [298, 300, 430],
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
        "data": [298, 300, 430],
      },
      {
        type: "bar",
        "barWidth": "36",
        barGap: "10%",
        barCateGoryGap: "10%",
        itemStyle: {
          normal: {
            color: "#5a9cf3",
            opacity: .8,
          },
        },
        data: [298, 300, 430],
      },
    ],
  },
};
