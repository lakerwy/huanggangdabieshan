/*
 * @Author: 任继民
 * @Date: 2021-03-03 10:57:40
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-13 15:15:27
 * @Description: 
 */
import * as echarts from "echarts";

const colorList = [
  "#73DDFF",
  "#73ACFF",
  "#FDD56A",
  "#FDB36A",
  "#FD866A",
  "#9E87FF",
  "#58D5FF",
];
var img =
  "data:image/png;base64,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";
var trafficWay = [
  {
    name: "Ⅰ类",
    value: 0,
  }, {
    name: "Ⅱ类",
    value: 0,
  }, {
    name: "Ⅲ类",
    value: 0,
  }, {
    name: "Ⅳ类",
    value: 0,
  }, {
    name: "Ⅴ类",
    value: 0,
  },
];

function pushData(arr, color) {
  let data = [];
  for (var i = 0; i < arr.length; i++) {
    data.push({
        value: arr[i].value,
        name: arr[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      },
      // {
      //   value: 0.1,
      //   name: "",
      //   itemStyle: {
      //     normal: {
      //       label: {
      //         show: false,
      //       },
      //       labelLine: {
      //         show: false,
      //       },
      //       color: "rgba(0, 0, 0, 0)",
      //       borderColor: "rgba(0, 0, 0, 0)",
      //       borderWidth: 0,
      //     },
      //   },
      // }
    );
  }
  return data;
}

export default {
  steamOptions(obj) {
    let quality = obj.water_quality;
    let total = obj.total;
    trafficWay[0].value = quality.classI;
    trafficWay[1].value = quality.classII;
    trafficWay[2].value = quality.classIII;
    trafficWay[3].value = quality.classIV;
    trafficWay[4].value = quality.classV;
    let color = ["#00cfff", "#006ced", "#ffe000", "#ffa800", "#ff5b00", "#ff3000"];
    let wdata = pushData(trafficWay, color);

    return {
      color: color,
      title: {
        text: `水环境监测站\n{a|${total}} 个`,
        top: "45%",
        textAlign: "center",
        left: "49%",
        textStyle: {
          color: "#fff",
          fontSize: 14,
          fontWeight: "400",
          rich: {
            a: {
              color: "#fff32f",
              fontSize: 18,
              fontWeight: "400",
            }
          }
        },
      },
      graphic: {
        elements: [{
          type: "image",
          z: 3,
          style: {
            image: img,
            width: 98,
            height: 98,
          },
          left: "center",
          top: "center",
          position: [100, 100],
        }],
      },
      tooltip: {
        show: false,
      },
      toolbox: {
        show: false,
      },
      legend: {
        show: false,
      },
      series: [{
        name: "",
        type: "pie",
        clockWise: false,
        startAngle: 180,
        radius: ['65%', '70%'],
        center: ["50%", "50%"],
        hoverAnimation: false,
        label: {
          show: true,
          position: "outside",
          color: "#ddd",
          formatter: function (params) {
            var percent = 0;
            var total = 0;
            for (var i = 0; i < trafficWay.length; i++) {
              total += trafficWay[i].value;
            }
            percent = ((params.value / total) * 100).toFixed(0);
            if (params.name !== "") {
              // return params.name + "\n" + "\n" + "占百分比：" + percent + "%";
              return params.name + "  " + percent + "%";
            } else {
              return "";
            }
          },
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 40,
            show: true,
            color: '#00ffff'
          }
        },
        data: wdata,
      }],
    }
  },
  atmosphereOptions(obj) {
    let atmData = [
      {value: 0, name: '优'},
      {value: 0, name: '良'},
      {value: 0, name: '轻度污染'},
      {value: 0, name: '中度污染'},
      {value: 0, name: '重度污染'},
      {value: 0, name: '严重污染'},
    ];
    let airData = obj.air_distribute;
    let airTotal = obj.total;
    let airArray = [];
    for (let item in airData) {
      airArray.push(airData[item]);
    }
    for (let i in airArray) {
      atmData[i].value = airArray[i];
    }
    let color = ['#72FF6F', '#46C5F9', '#F0F645', '#F89D45', '#FF4F4F', '#ff3000'];//各个区域颜色
    let data = pushData(atmData, color);
    return {
      title: {
        text: `大气监测站\n{a|${airTotal}} 个`,
        top: "50%",
        textAlign: "center",
        left: "34%",
        textStyle: {
          color: "#fff",
          fontSize: 14,
          fontWeight: "400",
          rich: {
            a: {
              color: "#fff32f",
              fontSize: 18,
              fontWeight: "400",
            }
          }
        },
      },//标题
      grid: {
        left: "3%",
        right: "4%",
        top: "30%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        show: false,
      },//提示框，鼠标悬浮交互时的信息提示
      legend: {
        show: false,
      },
      // legend: {
      //   icon: 'roundRect',
      //   orient: 'horizontal',
      //   x: 'center',
      //   y: 'top',
      //   data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
      //   textStyle: {color: '#fff'},
      // },//图例属性，以饼状图为例，用来说明饼状图每个扇区，data与下边series中data相匹配
      series: [
        {
          name: '',
          type: 'gauge',
          detail: false,
          splitNumber: 10, //刻度数量
          radius: '62%', //图表尺寸
          center: ["35%", "55%"],
          startAngle: 0, //开始刻度的角度
          endAngle: -360, //结束刻度的角度
          axisLine: {
            show: false,
            lineStyle: {
              width: 0,
              shadowBlur: 0,
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#02B1FF',
              width: 1
            },
            length: 1,
            splitNumber: 6
          },
          splitLine: {
            show: false,
            length: 1,
            lineStyle: {
              color: '#0EC7BE',
            }
          },
          axisLabel: {
            show: false
          },
        },
        {
          name: '大气监测',//tooltip提示框中显示内容
          type: 'pie',//图形类型，如饼状图，柱状图等
          clockWise: false,
          startAngle: 180,
          center: ["35%", "55%"],
          radius: ['65%', '75%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
          //roseType:'area',是否显示成南丁格尔图，默认false
          label: {
            show: true,
            position: "outside",
            color: "#ddd",
            formatter: '{b}\n{d}%',
          },//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
          labelLine: {
            normal: {
              length: 10,
              length2: 30,
              show: true,
              color: "#00ffff",
              lineStyle: {
                type: 'dotted'
              }
            }
          },//线条颜色
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',//鼠标放在区域边框颜色
            textColor: '#000'
          },//鼠标放在各个区域的样式
          data: data,
          color: color,
        },//数组中一个{}元素，一个图，以此可以做出环形图
      ]
    }
  },
  monitOptions(obj) {
    let xAxisData = []; // ["大九湖", "神农顶", "木鱼", "老君山"];
    let planData = []; // [320, 0, 301, 334, 390, 0];
    let completeData = []; // [320, 132, 101, 0, 90, 0];

    xAxisData.length = 0;
    planData.length = 0;
    completeData.length = 0;
    obj.forEach((item) => {
      xAxisData.push(item.regionName);
      planData.push(item.warnNum);
      completeData.push(item.handledNum);
    })

    let color = [
      {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#00177B",
          },
          {
            offset: 0.5,
            color: "#00177B",
          },
          {
            offset: 0.5,
            color: "#2741BD",
          },
          {
            offset: 1,
            color: "#2741BD",
          },
        ],
      },
      {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#2741BD",
          },
          {
            offset: 0.5,
            color: "#2741BD",
          },
          {
            offset: 0.5,
            color: "#1578D6",
          },
          {
            offset: 1,
            color: "#1578D6",
          },
        ],
      },
    ];
    let constData = [];
    // let showData = [];
    let otherData = [];
    for (var i = 0; i < planData.length; i++) {
      otherData[i] = planData[i] + completeData[i];
      if (planData[i] <= 0) {
        constData.push(1);
        otherData.push({
          value: 1,
          itemStyle: {
            normal: {
              borderColor: "rgba(0,0,0,0)",
              borderWidth: 2,
              color: "rgba(0,0,0,0)",
            },
          },
        });
      } else {
        if (completeData[i] == planData[i]) {
          constData.push(1);
        } else {
          constData.push(1);
        }
        if (completeData[i] > 0) {
          otherData.push({
            value: otherData[i],
            itemStyle: {
              normal: {
                borderColor: "#2741BD",
                borderWidth: 2,
                color: "#2741BD",
              },
            },
          });
        } else {
          otherData.push({
            value: otherData[i],
            itemStyle: {
              normal: {
                borderColor: "#00177B",
                borderWidth: 2,
                color: "#00177B",
              },
            },
          });
        }
      }
    }
    return {
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          return params[0].axisValue + "：" +
            "<br/>当日报警：" + planData[params[0].dataIndex] +
            "<br/>当日已处理：" + completeData[params[0].dataIndex];
        },
      },
      legend: {
        data: ["当日报警", "当日已处理"],
        x: 'right',
        textStyle: {color: '#fff'},
      },
      grid: {
        left: "14%", //图表距边框的距离
        right: "0%",
        top: "13%",
        bottom: "15%",
      },
      xAxis: {
        data: xAxisData,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          margin: 20, //刻度标签与轴线之间的距离。
        },
      },
      yAxis: {
        name: '单位/条',
        splitLine: {
          show: true,
          lineStyle: {
            color: "#3e5f73",
            type: "solid",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      series: [
        {
          z: 1,
          name: "当日报警",
          type: "bar",
          barWidth: 30,
          stack: "总量",
          color: color[0],
          data: planData,
        },
        {
          z: 2,
          name: "当日已处理",
          type: "bar",
          barWidth: 30,
          stack: "总量",
          color: color[1],
          data: completeData,
        },
        {
          z: 3,
          name: "项目",
          type: "pictorialBar",
          data: constData,
          symbol: "diamond",
          symbolOffset: ["0%", "50%"],
          symbolSize: [30, 10],
          itemStyle: {
            normal: {
              color: color[0],
            },
          },
          tooltip: {
            show: false,
          },
        },
        {
          z: 4,
          name: "项目",
          type: "pictorialBar",
          data: planData,
          symbol: "diamond",
          symbolPosition: "end",
          symbolOffset: ["0%", "-50%"],
          symbolSize: [30, 10],
          itemStyle: {
            normal: {
              color: color[1],
            },
          },
          tooltip: {
            show: false,
          },
        },
        {
          z: 5,
          name: "项目",
          type: "pictorialBar",
          symbolPosition: "end",
          data: otherData,
          symbol: "diamond",
          symbolOffset: ["0%", "-50%"],
          symbolSize: [30 - 4, (10 * (30 - 4)) / 30],
          tooltip: {
            show: false,
          },
        },
      ],
    }
  },
  monitorOptions: {
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      data: ["大九湖", "神农顶", "木鱼", "老君山"],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#888",
        },
        margin: 20, //刻度标签与轴线之间的距离。
      },
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          color: "#3e5f73",
          type: "solid",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#888",
        },
      },
    },
    series: [
      //下半截柱状图
      {
        type: "bar",
        barWidth: 30,
        barGap: "-100%",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(70,193,195,1)",
            }, {
              offset: 1,
              color: "rgba(70,193,195,0)",
            }], false),
          },
        },
        data: [190, 182, 151],
      },

      { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
        type: "bar",
        barWidth: 30,
        barGap: "-100%",
        stack: "柱状图高度",
        itemStyle: {
          color: "transparent",
        },
        data: [190, 182, 151],
      },
      //头部菱形
      {
        "type": "pictorialBar",
        "symbol": "diamond",
        "symbolPosition": "end",
        "symbolSize": [30, 15],
        "symbolOffset": [0, -23],
        "z": 12,
        "itemStyle": {
          "normal": {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#55beff",
            }, {
              offset: 1,
              color: "#56bfff",
            }], false),
          },
        },
        "data": [340, 294, 272],
      },
      //中间菱形
      {
        "name": "",
        "type": "pictorialBar",
        "symbol": "diamond",
        "symbolSize": [30, 15],
        "symbolOffset": [0, -17],
        "symbolPosition": "end",
        "itemStyle": {
          "normal": {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#51fffc",
            }, {
              offset: 1,
              color: "#4efff5",
            }], false),
          },
        },
        "z": 12,
        "data": [193, 185, 154],
      },

      {
        name: "2019",
        type: "bar",
        barWidth: 30,
        barGap: "-100%",
        stack: "柱状图高度",
        "itemStyle": {
          "normal": {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#3f98cf",
            }, {
              offset: 1,
              color: "rgba(63,152,207,0)",
            }], false),
          },
        },
        data: [150, 112, 121],
      },
    ],
  },
  SensorOptions: {
    tooltip: {
      trigger: "axis",
      // backgroundColor: "transparent",
      backgroundColor: "#0F1225",
      borderWidth: 1,
      padding: 10,
      formatter: function (obj) {
        var str = "";
        str =
          '<div style="font-size: 12px;background:url( ${("../../../assets/images/mapSelPart.png")}) no-repeat center center ;"><p style="color:#8DA2D3;lineHeight:18px;height:18px;">' +
          obj[0].name + "</p>";
        obj.map((item) => {
          let subStr =
            "<div style='lineHeight:22px;height:24px;'><div style='display:inline-block;width:5px;height:5px;margin-right:6px;background:" +
            item.color + ";border-radius:50%;margin-bottom:2px;'></div>" +
            item.seriesName + "：" + item.value + "</div>";
          str += subStr;
        });
        str += "</div>";
        return str;
      },
    },
    legend: {
      data: ["温度", "湿度"],
      textStyle: {
        fontSize: "14px",
        color: "#68a9ff",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false, //坐标轴两边留白
      data: [
        "2201",
        "2202",
        "2203",
        "2204",
        "2301",
        "2302",
        "2303",
        "2304",
        "2401",
        "2402",
        "2403",
        "2404",
      ],
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        //	margin:15,
        textStyle: {
          color: "#b9bac0",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 12,
        },
        formatter: function (params) {
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 4; //一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = "";
              var start = p * provideNumber;
              var end = start + provideNumber;
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr;
            }
          } else {
            newParamsName = params;
          }
          return newParamsName;
        },
        //rotate:50,
      },
      axisTick: { //坐标轴刻度相关设置。
        show: false,
      },
      axisLine: { //坐标轴轴线相关设置
        lineStyle: {
          color: "#b9bac0",
          // opacity:0.2
        },
      },
      splitLine: { //坐标轴在 grid 区域中的分隔线。
        // show: true,
        lineStyle: {
          color: "#434861",
          // 	opacity:0.1
        },
      },
    },
    yAxis: [
      {
        type: "value",
        splitNumber: 5,
        axisLabel: {
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#434861",
            // 	opacity:0.1
          },
        },
      },
    ],
    series: [
      {
        name: "温度",
        type: "line",
        itemStyle: {
          normal: {
            color: "#3A84FF",
            lineStyle: {
              color: "#3A84FF",
              width: 1,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: "#2d607b",
              }, {
                offset: 1,
                color: "#101a3b",
              }]),
            },
          },
        },
        data: [1, 2, 3, 3, 5, 6, 5, 3, 6, 5, 5, 4],
      },
      {
        name: "湿度",
        type: "line",
        itemStyle: {
          normal: {
            color: "rgba(255,80,124,1)",
            lineStyle: {
              color: "rgba(255,80,124,1)",
              width: 1,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: "rgba(255,80,124,0)",
              }, {
                offset: 1,
                color: "rgba(255,80,124,0.35)",
              }]),
            },
          },
        },
        data: [9, 5, 7, 8, 6, 7, 8, 7, 7, 6, 8, 6],
      },
    ],
  },
  earlyWarnoptions: {
    // color: [[]'#4956ff', '#2d82ff', '#2dc6ff', '#2fca95', '#f4d040'],
    backgroundColor: "rgba(0,20,67,0)",
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      left: "right",
      top: "top",
      icon: "circle",
      data: [
        "rose1",
        "rose2",
        "rose3",
        "rose4",
        "rose5",
        "rose6",
        "rose7",
        "rose8",
      ],
    },
    series: [{
      name: "半径模式",
      type: "pie",
      radius: [40, 110],
      center: ["50%", "50%"],
      roseType: "radius",
      // label: {
      //   show: false,
      // },
      label: {
        normal: {
          formatter: function (params) {
            if (params.value != 0) {
              return params.data.type + ":" + params.value + "个";
            } else {
              return "";
            }
          },
          show: true,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0, 103, 255, 0.2)",
        shadowOffsetX: -5,
        shadowOffsetY: 5,
        color: function (params) { // 颜色定制显示（按顺序）
          var colorList = [
            ["#df2679", "#e69029"],
            ["#007be4", "#08b7a5"],
            ["#f1d72b", "#cf7f14"],
            ["#16e5cc", "#139dd6"],
            ["#23a8e6", "#4359ea"],
          ];
          let obj = {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: colorList[params.dataIndex][0], // 0% 处的颜色
            }, {
              offset: 1,
              color: colorList[params.dataIndex][1], // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          };
          return obj;
          //   {
          //         type: 'linear',
          //         x: 0,
          //         y: 0,
          //         x2: 0,
          //         y2: 1,
          //         colorStops: [{
          //             offset: 0, color: colorList[params.dataIndex][0] // 0% 处的颜色
          //         }, {
          //             offset: 1, color: colorList[params.dataIndex][1] // 100% 处的颜色
          //         }],
          //         global: false // 缺省为 false
          //     }
        },
        // 			color: {
        //                                 type: 'linear',
        //                                 x: 0,
        //                                 y: 0,
        //                                 x2: 0,
        //                                 y2: 1,
        //                                 colorStops: [{
        //                                     offset: 0, color: 'red' // 0% 处的颜色
        //                                 }, {
        //                                     offset: 1, color: 'blue' // 100% 处的颜色
        //                                 }],
        //                                 global: false // 缺省为 false
        //                             }
      },
      data: [{
        value: 10,
        name: "rose1",
      }, {
        value: 15,
        name: "rose2",
      }, {
        value: 20,
        name: "rose3",
      }, {
        value: 25,
        name: "rose4",
      }, {
        value: 30,
        name: "rose5",
      }],
    }],
  },
  eventsOptions: {
    textStyle: {
      color: "#c0c3cd",
      fontSize: 14,
    },
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          backgroundColor: "#031245",
        },
        restore: {},
      },
      iconStyle: {
        borderColor: "#c0c3cd",
      },
    },
    legend: {
      top: 10,
      itemWidth: 8,
      itemHeight: 8,
      icon: "circle",
      left: "center",
      padding: 0,
      textStyle: {
        color: "#c0c3cd",
        fontSize: 14,
        // padding: [2, 0, 0, 0],
      },
    },
    color: [
      "#63caff",
      "#49beff",
      "#03387a",
      "#03387a",
      "#03387a",
      "#6c93ee",
      "#a9abff",
      "#f7a23f",
      "#27bae7",
      "#ff6d9d",
      "#cb79ff",
      "#f95b5a",
      "#ccaf27",
      "#38b99c",
      "#93d0ff",
      "#bd74e0",
      "#fd77da",
      "#dea700",
    ],
    grid: {
      containLabel: true,
      left: 10,
      right: 10,
      bottom: "10%",
      top: 30,
    },
    xAxis: {
      nameTextStyle: {
        color: "#c0c3cd",
        padding: [0, 0, -10, 0],
        fontSize: 12,
      },
      axisLabel: {
        color: "#c0c3cd",
        fontSize: 12,
        interval: 0,
      },
      axisTick: {
        lineStyle: {
          color: "#384267",
          width: 1,
        },
        show: true,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#384267",
          width: 1,
          type: "solid",
        },
        show: true,
      },
      data: [
        "狩猎",
        "砍伐 ",
        "开垦",
        "揭取草皮 ",
        "捕捞",
        "采石",
        "捡拾鸟卵",
      ],
      type: "category",
    },
    yAxis: {
      nameTextStyle: {
        color: "#b9bac0",
        padding: [0, 0, 0, 0],
        fontSize: 12,
      },
      axisLabel: {
        color: "#b9bac0",
        fontSize: 14,
      },
      axisTick: {
        lineStyle: {
          color: "#b9bac0",
          width: 1,
        },
        show: true,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#434861",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#434861",
          width: 1,
          type: "solid",
        },
        show: true,
      },
      // name: "单位：万",
      splitNumber: 3,
      // boundaryGap:[0,1] //boundaryGap是坐标轴两端空白策略，数组内数值代表百分比
    },
    // dataZoom: [{
    //   type: "slider",
    //   show: true,
    //   xAxisIndex: [0],
    //   start: 1,
    //   end: 135,
    //   bottom: 0, //距离底部的距离
    //   height: 18,
    //   handleStyle: {
    //     color: "#d3dee5",
    //   },
    //   textStyle: {
    //     color: "#fff",
    //     fontSize: "10px",
    //   },
    // } // {
    //   //   type: "inside",
    //   //   xAxisIndex: [0],
    //   //   start: 1,
    //   //   end: 135,
    //   //   bottom: 0, //距离底部的距离
    //   //   height: 20,
    //   // },
    // ],
    series: [{
      data: [20, 25, 12, 25, 35, 15, 18, 35],
      type: "bar",
      barMaxWidth: "auto",
      barWidth: 30,
      itemStyle: {
        color: "#fcba62",
      },
      label: {
        show: true,
        position: "top",
        distance: 10,
        color: "#fff",
      },
    }, {
      data: [40, 40, 40, 40, 40, 40, 40, 40],
      type: "bar",
      barMaxWidth: "auto",
      barWidth: 30,
      itemStyle: {
        color: "#332f3d",
      },
      barGap: "-100%",
      zlevel: -1,
    }],
  },
  serverAccessOptions: {
    grid: {
      left: "2%",
      right: "2%",
      bottom: "2%",
      top: "2%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      formatter: function (params) {
        return params[0].name + " : " + params[0].value;
      },
    },
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: [{
      type: "category",
      inverse: true,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: ["搜索服务", "三维服务", "动态服务", "地图服务", "要素服务"],
    }, {
      type: "category",
      inverse: true,
      axisTick: "none",
      axisLine: "none",
      show: true,
      axisLabel: {
        textStyle: {
          color: "#ffffff",
          fontSize: "12",
        },
      },
      data: [69, 56, 48, 27, 12],
    }],
    series: [{
      name: "值",
      type: "bar",
      zlevel: 1,
      itemStyle: {
        normal: {
          color: "#69f1ff",
          // barBorderRadius: 30,
          // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          //   offset: 0,
          //   color: "rgb(57,89,255,1)",
          // }, {
          //   offset: 1,
          //   color: "rgb(46,200,207,1)",
          // }]),
        },
      },
      barWidth: 20,
      data: [69, 56, 48, 27, 12],
    }, {
      name: "背景",
      type: "bar",
      barWidth: 20,
      barGap: "-100%",
      data: [100, 100, 100, 100, 100],
      itemStyle: {
        normal: {
          color: "#15275e",
          // barBorderRadius: 30,
        },
      },
    }],
  },
  platformAccessOptions: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: "rgba(255,255,255,0)", // 0% 处的颜色
            }, {
              offset: 0.5,
              color: "rgba(255,255,255,1)", // 100% 处的颜色
            }, {
              offset: 1,
              color: "rgba(255,255,255,0)", // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          },
        },
      },
    },
    grid: {
      top: "18%",
      left: "15%",
      right: "5%",
      bottom: "10%",
      // containLabel: true
    },
    xAxis: [{
      type: "category",
      boundaryGap: true,
      axisLine: { //坐标轴轴线相关设置。数学上的x轴
        // show: true,
        lineStyle: {
          color: 'color:"#092b5d"',
        },
      },
      axisLabel: { //坐标轴刻度标签的相关设置
        textStyle: {
          color: "#24c4ff",
          // margin: ,
        },
        formatter: function (data) {
          return data + "月";
        },
      },
      axisTick: {
        show: false,
      },
      data: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
    }],
    yAxis: [{
      min: 0,
      max: 100,
      splitLine: {
        show: true,
        lineStyle: {
          color: "#092b5d",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#092b5d",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#24c4ff",
        },
        formatter: function (value) {
          if (value === 0) {
            return value;
          }
          return value + "%";
        },
      },
      axisTick: {
        show: false,
      },
    }],
    series: [{
      name: "平台访问次数",
      type: "line",
      symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
      showAllSymbol: true,
      symbolSize: 8,
      lineStyle: {
        normal: {
          color: "#6397ea", // 线条颜色
        },
        borderColor: "rgba(0,0,0,.4)",
      },
      itemStyle: {
        color: "rgba(14,30,73,1)",
        borderColor: "#646ace",
        borderWidth: 2,
      },
      label: {
        normal: {
          show: true,
          position: "top",
          formatter: [
            " {a|{c}%}",
          ].join(","),
          rich: {
            a: {
              color: "#fff",
              align: "center",
            },
          },
        },
      },
      // tooltip: {
      //   show: true,
      // },
      areaStyle: { //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(124, 128, 244,.3)",
          }, {
            offset: 1,
            color: "rgba(124, 128, 244, 0)",
          }], false),
          shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
          shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        },
      },
      data: ["40", "60", "22", "85", "50", "40", "22", "85", "50", "40"],
    }],
  },
  comprehensiveOptions: {
    tooltip: {
      trigger: "item",
    },
    series: [{
      type: "pie",
      center: ["50%", "50%"],
      radius: ["20%", "40%"],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 50,
      emphasis: {
        itemStyle: {
          borderColor: "rgba(14, 21, 59, 0.52)",
          borderWidth: 15,
        },
      },
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
        },
      },
      // label: {
      //   show: true,
      //   position: "outside",
      //   formatter: "{a|{b}：{d}%}\n{hr|}",
      //   rich: {
      //     hr: {
      //       backgroundColor: "t",
      //       borderRadius: 3,
      //       width: 3,
      //       height: 3,
      //       padding: [3, 3, 0, -12],
      //     },
      //     a: {
      //       padding: [-30, 15, -20, 15],
      //     },
      //   },
      // },
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
  getTimeStamp: {
    //获取当前时间戳
    getNowTime() {
      return Math.floor(new Date().getTime());
    },
    //获取当日起始时间戳
    getToday() {
      return Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
    },
    //获取本周起始时间戳
    getWeek() {
      let timestamp = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
      let weekDay = new Date().getDay() === 0 ? 7 : new Date().getDay();
      let weekTimeStamp = timestamp - 86400000 * (weekDay - 1);
      return weekTimeStamp;
    },
    // 获取本月起始时间戳
    getMonth() {
      let date = new Date();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      let monStartTimeStamp = date.getTime();
      return monStartTimeStamp
    },
    // 获取今年起始时间戳
    getYear() {
      let date = new Date();
      date.setMonth(0);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    },
  }
};
