<template>
  <div class="page">
    <div id="noise"></div>
    <div class="desc">
      <ul>
        <li>
          <span class="title">最大分贝</span>
          <span class="content">{{ maxNoise }}</span>
        </li>
        <li>
          <span class="title">当前分贝</span>
          <span class="content">{{ Noise }}</span>
        </li>
        <li>
          <span class="title">平均分贝</span>
          <span class="content">{{ Math.round(avgNoise) }}</span>
        </li>
      </ul>
    </div>

    <!-- <span class="max">最大分贝</span>
    <span class="now">当前分贝</span>
    <span class="avg">平均分贝</span>
    <span class="max_1">{{ maxNoise }}</span>
    <span class="now_1">{{ Noise }}</span>
    <span class="avg_1">{{ Math.round(avgNoise) }}</span> -->
    <el-select @on-change="getValue(value)" v-model="value">
      <el-option
        v-for="item in waterType"
        :key="item.siteId"
        :label="item.name"
        :value="item.siteId"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import echarts from "echarts";
import { getWaterTypes, getMaxNoise, getWaterData } from "_api/board";
export default {
  name: "echarts",
  data() {
    return {
      params: {
        type: 1,
      },
      waterType: [],
      value: "",
      Noise: "",
      maxNoise: "",
      avgNoise: null,
    };
  },
  mounted() {
    this.getWaterType();
  },
  methods: {
    list() {
      var j = this.Noise * 1;
      var options = {
        tooltip: {
          formatter: "{b}{c}",
        },
        series: [
          {
            tooltip: {
              show: false,
            },
            name: "wrap",
            type: "pie",

            center: ["50%", "70%"],
            radius: ["0%", "5%"],
            z: 5,

            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "#072B79",
                  },
                  emphasis: {
                    color: "#072B79",
                  },
                },
              },
            ],
          },
          {
            tooltip: {
              show: false,
            },
            name: "wrap",
            type: "pie",
            hoverAnimation: false,
            legendHoverLink: false,
            center: ["50%", "70%"],
            radius: ["4%", "8%"],
            z: 6,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "white",
                  },
                  emphasis: {
                    color: "white",
                  },
                },
              },
            ],
          },
          {
            tooltip: {
              show: false,
            },
            name: "刻度",
            type: "gauge",
            radius: "98%",
            z: 5,
            min: 0,
            max: 120,
            center: ["50%", "70%"],
            splitNumber: 6, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 8,
                color: [
                  [1 / 6, "#0f823b"],
                  [2 / 6, "#86d639"],
                  [3 / 6, "#dfd742"],
                  [4 / 6, "#e28f24"],
                  [5 / 6, "#cb3f24"],
                  [1, "#f20506"],
                ],
              },
            }, //仪表盘轴线
            axisLabel: {
              distance: 30,
              fontSize: 12,
            }, //刻度节点文字颜色
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 0,
              },
            }, //刻度样式
            splitLine: {
              show: true,
              length: 0,
              lineStyle: {
                color: "auto",
                width: 0,
              },
            }, //分隔线样式
            detail: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
          {
            tooltip: {
              show: false,
            },
            name: "噪声",
            type: "gauge",
            radius: "92%",
            min: 0,
            max: 120,
            center: ["50%", "70%"],
            data: [
              {
                value: j,
              },
            ],
            splitNumber: 6, //刻度数量
            startAngle: 180,
            endAngle: 0,
            z: 5,
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                color: [
                  [1 / 6, "#0f823b"],
                  [2 / 6, "#86d639"],
                  [3 / 6, "#dfd742"],
                  [4 / 6, "#e28f24"],
                  [5 / 6, "#cb3f24"],
                  [1, "#f20506"],
                ],
              },
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#fff",
              fontSize: 16,
              distance: 0,
              formatter: function (params) {
                var value = params.toFixed(0);
              },
            }, //刻度标签。
            axisTick: {
              splitNumber: 6,
              show: true,
              lineStyle: {
                color: "auto",
                width: 2,
              },
              length: 10,
            }, //刻度样式
            splitLine: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 3,
              },
              length: 15,
            }, //分隔线样式
            itemStyle: {
              normal: {
                color: "white", //指针颜色
              },
            },
            detail: {
              show: false,
            },
            pointer: {
              width: 5,
              length: "60%",
            },
          },
          {
            tooltip: {
              show: false,
            },
            name: "描述",
            type: "gauge",
            radius: "87%",

            min: 0,
            max: 100,
            center: ["50%", "70%"],

            splitNumber: 5, //刻度数量
            startAngle: 165,
            endAngle: 15,
            z: 0,
            axisLine: {
              show: false,
            }, //仪表盘轴线

            axisLabel: {
              show: true,
              color: "#fff",
              fontSize: 12,
              distance: -40,
              formatter: function (params) {
                var value = params.toFixed(0);
                if (value == 0) {
                  return "极静";
                } else if (value == 20) {
                  return "安静";
                } else if (value == 40) {
                  return "一般";
                } else if (value == 60) {
                  return "较吵";
                } else if (value == 80) {
                  return "吵闹";
                } else if (value == 100) {
                  return "极吵";
                } else {
                  return "";
                }
              },
            }, //刻度标签。

            axisTick: {
              splitNumber: 6,
              show: false,
              lineStyle: {
                color: "auto",
                width: 0,
              },
              length: 20,
            }, //刻度样式
            splitLine: {
              show: false,
              length: 0,
              lineStyle: {
                color: "auto",
                width: 0,
              },
            }, //分隔线样式
            detail: {
              show: false,
            },
          },
        ],
      };
      var myChart = echarts.init(document.getElementById("noise"));
      myChart.setOption(options);
    },
    async getWaterType() {
      await getWaterTypes(this.params).then((res) => {
        this.waterType = [];
        if ((res.success == true)) {
          this.waterType = res.body;
          this.value = res.body[0].siteId;
          this.getNoiseValue();
          this.getMaxValue();
        } else {
          this.waterType = [];
        }
      });
    },
    getValue() {
      this.getNoiseValue();
      this.getMaxValue();
    },
    getNoiseValue() {
      getWaterData({ siteId: this.value }).then((res) => {
        this.Noise = null;
        if ((res.success)) {
          this.Noise = res.body.noise;
          this.list();
        } else {
          this.Noise = null;
        }
      });
    },
    getMaxValue() {
      getMaxNoise({ siteId: this.value }).then((res) => {
        if ((res.success)) {
          this.maxNoise = res.body[0].max ? res.body[0].max : "-";
          this.avgNoise = res.body[0].avg ? res.body[0].avg : "-";
        } else {
          this.maxNoise = "-";
          this.avgNoise = "-";
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.page {
  height: calc(100% - 37px);
  width: 100%;
  position: relative;
  #noise {
    height: 100%;
    width: 100%;
  }
  .desc {
    position: absolute;
    bottom: 0%;
    height: 30%;
    width: 60%;
    display: block;
    left: 20%;
    top: 75%;
    ul {
      margin-top: 0%;
      margin-left: 0%;
      display: inline-flex;
      li {
        color: white;
        display: grid;
        text-align: center;
        margin-right: 25px;
      }
    }
  }
  .el-select {
    position: absolute;
    background-color: transparent;
    top: 10%;
    right: 5%;
    width: 95px;
  }
  .title {
    font-size: 14px;
    color: #859daa;
  }
  .content {
    font-size: 26px;
    line-height: 36px;
    letter-spacing: 0px;
    color: #00a4f7;
  }
}
/deep/.el-input {
  .el-input__suffix{
    top:-5px;
  }
}
/deep/.el-input__inner {
  color: #fff;
  background-color: #061a2e;
  border: 1px solid #0f70a1;
  height: 28px;
  line-height: 28px;
  padding-right: 26px;
  padding-left:10px;
}
</style>