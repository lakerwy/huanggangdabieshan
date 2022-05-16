<template>
  <div class="layerManager">
    <i
      class="el-icon-delete-solid"
      style="right: 40px"
      title="清除图层"
      v-if="layersArr.length"
      @click="closeAll"
    ></i>
    <span class="checkaLL" v-if="layersArr.length"
      ><el-checkbox v-model="checkAll" @change="checkAllList(checkAll)"
        >全选
      </el-checkbox></span
    >
    <h1>图层管理</h1>
    <i @click="close" class="el-icon-close" title="关闭"></i>
    <div class="layerList">
      <div v-for="(item, index) in layersArr" :key="item.id">
        <el-checkbox v-model="item.checked" @change="checkList(item)">
        </el-checkbox>
        <span class="labelname">{{ item.label }}</span>
        <span class="labeltool">
          <i
            class="el-icon-s-platform"
            title="多屏展示"
            @click="showBoard(item)"
            v-show="item.region"
          ></i>
          <i
            class="el-icon-s-flag"
            title="图例"
            @click="getLegend(item)"
            v-show="item.serviceType == 'img'"
          ></i>
          <i
            class="el-icon-s-unfold"
            :class="{ noclick: index == layersArr.length - 1 }"
            title="属性查询"
            @click="propertyQuery(item)"
          ></i>
          <i
            class="el-icon-s-fold"
            :class="{ noclick: index == layersArr.length - 1 }"
            title="空间查询"
            @click="spaceQuery(item, index)"
          ></i>
          <i
            class="el-icon-top"
            title="上移"
            @click="upList(item, index)"
            :class="{ noclick: index == 0 }"
            v-show="layersArr.length != 1 && index != 0"
          ></i>
          <i
            class="el-icon-bottom"
            :class="{ noclick: index == layersArr.length - 1 }"
            title="下移"
            @click="downList(item, index)"
            v-show="layersArr.length != 1 && index != layersArr.length - 1"
          ></i>
          <i
            class="el-icon-close"
            title="删除"
            @click="deleteList(item, index)"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getLegendInfoByArcGIS } from "@map/js/utils/legend";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    layerObj: {
      type: Object
    }
  },
  data() {
    return {
      showlegend: false,
      layersArr: [],
      ghostLayersArr: [],
      checkArr: [],
      layerIds: [],
      checkAll: true,
      legendList: [],
    }
  },
  computed: {
    ...mapState(["isEarth", "component"]),
  },
  watch: {
    layerObj(obj) {
      if (obj.leaf) {
        this.addLayer(obj);
        this.$parent.clickLayer.data = {};
      }
    }
  },
  methods: {
    ...mapMutations([
      "setQueryFlag",
      "setQueryOptions",
      "setLegendUrl"
    ]),
    showBoard(item) {
      this.$parent.dealBoard(item.region);
    },
    onStart() {
      this.ghostLayersArr = JSON.parse(JSON.stringify(this.layersArr));
    },
    onEnd(evt) {
      let arrLength = this.ghostLayersArr.length - 1;
      if (this.isEarth) {
        let oldCode = this.ghostLayersArr[evt.oldIndex].code;
        let newCode = this.ghostLayersArr[evt.newIndex].code;
        this.component && this.component.swapLayer(oldCode, newCode);
      } else {
        this.component &&
          this.component.swapLayer(
            arrLength - evt.oldIndex,
            arrLength - evt.newIndex
          );
      }
    },
    close() {
      this.$parent.activeMenu = null;
    },
    propertyQuery(item) {
      this.setQueryFlag(true);
      this.setQueryOptions({
        queryType: "properSearch",
        data: item,
      });
    },
    spaceQuery(item) {
      this.setQueryFlag(true);
      this.setQueryOptions({
        queryType: "spaceSearch",
        data: item,
      });
    },
    addLayer(item) {
      if (this.layerIds.indexOf(item.id) == -1) {
        item.checked = true;
        this.checkArr.push(item.id);
        this.layersArr.unshift(item);
        this.layerIds.push(item.id);
        let params = {
          id: item.id,
          type: "arcgis",
          url: process.env.NODE_ENV == 'development' ? 'http://192.168.99.234:8088' + item.url : item.url,
        };
        this.component && this.component.addUrlLayer(params);
        //旅游路线是否加吉祥物
        // if (item.label == '麻城旅游路线') {
        //   let arr = this.component.getLayer(this.layerIds.length - 1, item.id);
        // }
      }
      if (this.checkArr.length == this.layersArr.length) {
        this.checkAll = true;
      }
    },
    deleteList(item, index) {
      // 删除
      this.component && this.component.deleteLayer(item.id);
      this.layersArr.splice(index, 1);
      let ind = this.layerIds.indexOf(item.id);
      this.layerIds.splice(ind, 1);
    },
    closeAll() {
      this.layersArr = [];
      for (let index = 0; index < this.layerIds.length; index++) {
        const item = this.layerIds[index];
        this.component && this.component.deleteLayer(item);
      }
      this.layerIds = [];
    },
    getLegend(data) {
      this.setLegendUrl(window.globalUrl.FTP_URL + data.imageUrl);
      this.showlegend = true;
      // if (data.url) {
      //   getLegendInfoByArcGIS(data.url).then((res) => {
      //     if (res.layers.length > 0) {
      //       this.legendList = res.layers;
      //     }
      //   });
      // }
    },
    checkList(item) {
      if (item.checked) {
        this.checkArr.push(item.id);
        if (this.checkArr.length == this.layersArr.length) {
          this.checkAll = true;
        }
      } else {
        this.checkAll = false;
        var index = this.checkArr.indexOf(item.id);
        if (index > -1) {
          this.checkArr.splice(index, 1);
        }
      }
      // 可见
      this.component && this.component.setLayerVisible(item.id, item.checked);
    },
    checkAllList(flag) {
      this.layersArr.forEach((item) => {
        item.checked = flag;
        this.component && this.component.setLayerVisible(item.id, flag);
      })
    },
    upList(item, index) {
      // 上移
      this.layersArr.splice(index - 1, 0, this.layersArr[index]);
      this.layersArr.splice(index + 1, 1);
      this.component && this.component.upLayer(item.id);
    },
    downList(item, index) {
      // 下移
      this.layersArr.splice(index + 2, 0, this.layersArr[index]);
      this.layersArr.splice(index, 1);
      this.component && this.component.downLayer(item.id);
    }
  }
}
</script>
<style lang="less" scoped>
.layerManager {
  width: 320px;
  height: 548px;
  position: absolute;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  > i {
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
    font-size: 20px;
    cursor: pointer;
  }
  h1 {
    text-align: center;
    font-size: 15px;
  }
  .top {
    border-bottom: 1px solid #395372;
    position: relative;
    height: 52px;
    line-height: 52px;
    margin: 0 24px;
    margin-bottom: 4px;
    .text {
      font-size: 18px;
      color: #04f1f6;
      font-weight: bold;
    }
    span {
      margin-right: 8px;
    }
    i {
      position: absolute;
      top: 10px;
      color: #1d9eb8;
      cursor: pointer;
      font-size: 24px;
      right: 30px;
    }
    .el-icon-close {
      right: 0px;
    }
  }
  .layerList:hover {
    overflow: auto;
  }
  .layerList {
    height: 500px;
    margin: 0 14px;
    overflow: hidden;
    .labelname {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      font-size: 16px;
      color: #106c88;
      margin-left: 4px;
      word-break: break-all;
      width: 258px;
    }
    .labeltool {
      // width: 100%;
      color: #1e5fa8;
      text-indent: 12px;
      // float: right;
      display: none;
    }
  }
  .el-checkbox {
    vertical-align: top;
    padding-top: 2px;
    padding-left: 4px;
    /deep/el-checkbox__input {
      margin-top: -8px;
    }
    /deep/.el-checkbox__label {
      color: #409eff;
      width: 90%;
      position: relative;
    }
  }
  .is-checked /deep/.el-checkbox__inner {
    background-color: #1a659b;
    border-color: #1a659b;
  }
  .chosen {
    box-shadow: rgb(11, 234, 235) 0px 0px 18px inset;
    cursor: pointer;
  }
  .layerList div:hover {
    box-shadow: rgba(175, 189, 196, 0.7) 0px 0px 18px inset;
    cursor: pointer;
    .labeltool {
      display: block;
      font-weight: bold;
    }
  }
  .labeltool i:hover {
    color: #1d9eb8;
    cursor: pointer;
  }
  .layerList::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .layerList::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(102, 142, 163, 0.8);
  }
  .layerList::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: transparent;
  }
}
.checkaLL {
  position: absolute;
  top: 12px;
  left: 13px;
}
</style>