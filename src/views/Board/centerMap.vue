<template>
  <div class="page-map">
    <div id="mapBoard" style="width: 100%; height: 100%"></div>
    <p>
      {{ areaInfo }}<span>{{ area }}</span> k㎡
    </p>
    <div class="info">
      <h3>
        {{ city }}地质遗迹点<i>{{ allCount }}</i
        >个
      </h3>
      <ul>
        <li v-for="(item, index) in infoArr" :key="index">
          <span>{{ filterKey(item.level) }}</span>
          <i>{{ item.count }}</i
          >个
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRelicLevel } from "@/api/board";
import echarts from "echarts";
export default {
  name: "echarts",
  data() {
    return {
      infoArr: [],
      city: '黄冈市',
      allCount: null,
      areaInfo: '总面积 ',
      area:'',
    };
  },
  mounted() {
    this.loadInfo('黄冈市', '黄冈大别山世界地质公园');
    this.list();
  },
  methods: {
    loadInfo(paramsName, name) {
      this.city = name;
      getRelicLevel(paramsName).then(res => {
        this.area = res.body.area;
        if (res.success && res.body.data.length) {
          this.infoArr = res.body.data;
          let all = 0;
          for (let index = 0; index < res.body.data.length; index++) {
            all += res.body.data[index].count;
          }
          this.allCount = all;
        }
      })
    },
    async list() {
      let res = await fetch("./data/geojson.json");
      let geoJson = await res.json();
      if (!geoJson) {
        return;
      }
      echarts.registerMap("dabieshan", geoJson);
      var mapData = [
        { name: "麻城市", value: "0", cityCode: 'mc', info: '麻城片区面积 ' },
        { name: "黄冈大别山世界地质公园", value: "1", cityCode: 'hg', info: '总面积 ' },
        { name: "罗田县", value: "0", cityCode: 'lt', info: '罗田片区面积 ' },
        { name: "英山县", value: "0", cityCode: 'ys', info: '英山片区面积 ' },
      ]
      var options = {
        geo: [
          {
            map: "dabieshan",
            roam: false, //是否允许缩放
            zoom: 1.1, //默认显示级别
            scaleLimit: {
              min: 0,
              max: 3,
            }, //缩放级别
            itemStyle: {
              normal: {
                areaColor: "#16a1f4",
                shadowColor: "#16a1f4",
                shadowBlur: 15,
                shadowOffsetX: -2,
                shadowOffsetY: 4,
              },
            },
            tooltip: {
              show: false,
            },
          },
        ],
        visualMap: {
          show: false,
          categories: ['1', '0'],
          inRange: {
            color: ['#04a1b2'],
          },
        },
        series: [
          {
            type: "map",
            map: "dabieshan",
            zoom: 1.1, //默认显示级别
            silent: false, //禁用地图的hover事件
            label: {
              show: true,
              textStyle: {
                color: '#fefefe',
                fontSize: '16',
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#043da0',
                  fontWeight: 'bold',
                  fontSize: '18',
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#19a4f3",
                borderWidth: 1,
                areaColor: "#043da0",
              },
              emphasis: {
                areaColor: "#04a1b2",
                borderWidth: 1,
                borderColor: "#fff",
                color: "#fff",
              },
            },
            data: mapData
          },
        ],
      };
      var myChart = echarts.init(document.getElementById("mapBoard"));
      myChart.setOption(options);
      myChart.on('click', (params) => {
        this.areaInfo = params.data.info;
        let paramsName = params.name;
        if (params.data.cityCode == 'hg') {
          paramsName = "黄冈市";
        }
        this.loadInfo(paramsName, params.name);
        for (var i = 0; i < mapData.length; i++) {
          mapData[i].value = "0";
          if (params.name == mapData[i].name) {
            mapData[i].value = "1";

          }
        }
        myChart.setOption(options);
      });
    },
    filterKey(key) {
      switch (key) {
        case '1':
          return '世界级';
        case '2':
          return '国家级';
        case '3':
          return '省级';
        case '4':
          return '市级';
        case '5':
          return '县级';
      }
    }
  },
};
</script>

<style scoped lang="less" >
.page-map {
  height: 100%;
  width: 100%;
  position: relative;
  > p {
    color: #fff;
    position: absolute;
    top: 3%;
    right: 10%;
    width: 242px;
    text-align: center;
    span {
      color: #75d3dd;
      font-size: 22px;
      font-style: italic;
      padding: 0 3px;
      font-weight: bold;
    }
  }
  .info {
    position: absolute;
    width: 242px;
    height: 166px;
    background: url("../../assets/images/bg-mapcenter.png") no-repeat;
    right: 10%;
    top: 8%;
    i {
      color: #00a4f7;
      font-size: 24px;
      padding: 0 4px;
    }
    h3 {
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 16px;
      color: #68cbff;
      text-align: center;
      margin-top: 20px;
    }
    ul {
      color: #fefeff;
      margin: 0;
      margin-top: -10px;
      font-size: 13px;
      li {
        list-style: square;
        width: 49%;
        float: left;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
