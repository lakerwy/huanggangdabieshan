<template>
  <div class="aboutQuery">
    <!-- <transition name="el-zoom-in-bottom"> -->
    <div class="sxcx" v-if="queryOptions.queryType == 'properSearch'">
      <div class="titleContainer">
        <h3>属性查询</h3>
        <i @click="close" class="el-icon-close"></i>
      </div>
      <div class="query-result-container">
        <div class="query-layers">
          <el-tree
            ref="tree"
            :data="layers"
            :props="{ label: 'name' }"
            node-key="id"
            :current-node-key="layerId"
            :indent="4"
            :highlight-current="true"
            :default-expand-all="true"
            @node-click="nodeClickEvent"
          >
          </el-tree>
        </div>
        <div class="query-property">
          <PropertyTable
            :alias="tableData ? tableData.alias : {}"
            :list="tableData ? tableData.list : []"
            :sum="total"
            :pageSize="pageSize"
            @row-click="rowClickEvent"
            @change="pageChangeEvent"
          ></PropertyTable>
        </div>
      </div>
    </div>
    <div class="kjcx" v-if="queryOptions.queryType == 'spaceSearch'">
      <div class="titleContainer">
        <h3>空间查询</h3>
        <div class="searchContainer">
          <el-cascader
            :options="layers"
            :props="{ value: 'id', label: 'name' }"
            @change="handleChange"
            placeholder="请先选择图层"
          ></el-cascader>
          <img
            src="@/assets/images/btn_point_select.png"
            alt=""
            @click="selectEvent('Point')"
            title="点选"
          />
          <img
            src="@/assets/images/btn_box_select.png"
            alt=""
            @click="selectEvent('Box')"
            title="框选"
          />
          <img
            src="@/assets/images/btn_polygon.png"
            alt=""
            @click="selectEvent('Polygon')"
            title="多边形选"
          />
          <img
            src="@/assets/images/btn_clear.png"
            alt=""
            @click="clear"
            title="清除"
          />
          <!-- <el-button @click="selectEvent('Point')">点选</el-button>
          <el-button @click="selectEvent('Box')">框选</el-button>
          <el-button @click="selectEvent('Polygon')">多边形</el-button>
          <el-button @click="clear">清除</el-button> -->
        </div>
        <h3><i @click="close" class="el-icon-close"></i></h3>
      </div>

      <div style="padding: 4px 6px; border: 1px solid #a8becf; margin-top: 3px">
        <el-table
          :data="tableData ? tableData.list : []"
          stripe
          border
          size="small"
          height="100%"
          :highlight-current-row="true"
          tooltip-effect="dark"
          style="width: 100%; color: #000 !important"
          @row-click="rowClickEvent"
        >
          <el-table-column
            v-for="(item, index) in tableData ? tableData.alias : {}"
            :key="index"
            :prop="item"
            :label="item"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <!-- <div class="page-container">
            <el-pagination
              background
              layout="prev, pager, next,total"
              :current-page="pageIndex"
              :page-size="pageSize"
              :total="sum"
              :hide-on-single-page="true"
              @current-change="pageChange"
            >
            </el-pagination>
          </div> -->
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { getLayerInfo, propertiesQuery, spatialQuery } from "@map/js/query/query";
import { createTreeByArray } from "@/api/tree";
import * as mapHanlder from "../mapHanlder.js";
import PropertyTable from "./PropertyTable.vue";

export default {
  components: {
    PropertyTable,
  },
  data() {
    return {
      direction: "btt",
      showBoard: true,
      drawer: false,
      data: null, // 图层基本信息
      layers: [], //  图层详细信息
      layerId: null, // 所选图层id
      projection: null, // 所选图层的坐标系
      tableData: null, // 查询得到的属性表
      pageSize: 10,
      pageIndex: 1,
      total: 0,
    };
  },
  watch: {
    ifshowQuery(val) {
      this.drawer = val;
    },
    queryOptions() {
      this.tableData = null;
      if (!this.queryOptions) {
        return;
      }
      let data = this.queryOptions.data;
      this.init(data);
    },
  },
  computed: {
    ...mapState(["ifshowQuery", "queryOptions", "component", "isEarth"]),
  },
  methods: {
    ...mapMutations(["setQueryFlag", "setQueryOptions"]),
    async init(data) {
      if (data.url) {
        this.data = {
          type: "arcgis",
          url: process.env.NODE_ENV == 'development' ? 'http://192.168.99.234:8088' + data.url : data.url,
        };
      }
      let info = await getLayerInfo(this.data);
      if (!info) {
        return;
      }
      let layers = info.layers;
      this.layers = createTreeByArray(layers, {
        idKey: "id",
        pidKey: "parentLayerId",
      });
      this.projection = info.projection;

      if (this.queryOptions.queryType == "properSearch") {
        let item = this.layers.find((x) => {
          return !x.subLayerIds;
        });
        if (item) {
          this.$nextTick(() => {
            let tree = this.$refs.tree;
            tree.setCurrentKey(item.id);
            this.nodeClickEvent(item);
          });
        }
      }
    },
    nodeClickEvent(data) {
      this.clear();
      if (!data) {
        return;
      }
      this.layerId = data.id;
      this.getTableData();
    },
    pageChangeEvent({ pageIndex, pageSize }) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.getTableData();
    },
    async getTableData() {
      let projection = this.component.getProjection();
      let result = await propertiesQuery({
        layer: this.data,
        layerId: this.layerId,
        layerProjection: this.projection,
        params: { pageIndex: this.pageIndex, pageSize: this.pageSize },
        featureProjection: projection,
      });
      if (result) {
        this.tableData = result;
        this.total = result.sum;
        if (!this.isEarth) {
          mapHanlder.addQueryResultOnMap({
            component: this.component,
            features: result.features,
          });
        }
      }
    },
    rowClickEvent(row) {
      if (row) {
        if (!this.isEarth) {
          this.component.goFeature(row.feature);
        }
      }
    },
    clear() {
      this.tableData = null;
      this.total = 0;
      this.pageIndex = 1;
      if (!this.isEarth) {
        mapHanlder.clearQueryResult(this.component);
      }
    },
    handleChange(value) {
      this.clear();
      this.layerId = value[value.length - 1];

    },
    selectEvent(type) {
      if (this.layerId == null) {
        this.$message.error("请先选择图层");
        return;
      }
      this.clear();
      if (!this.isEarth) {
        mapHanlder.spatialSelectHandler({
          component: this.component,
          type: type,
          callback: this.selectCallback,
        });
      }
    },
    async selectCallback(feature, projection) {
      let res = await spatialQuery({
        layer: this.data,
        layerId: this.layerId,
        layerProjection: this.projection,
        feature: feature,
        featureProjection: projection,
      });
      if (res) {
        this.tableData = res;
        if (!this.isEarth) {
          mapHanlder.addQueryResultOnMap({
            component: this.component,
            features: res.features,
          });
        }
      }
    },
    close() {
      this.clear();
      this.setQueryFlag(false);
      this.setQueryOptions({});
    },
  },
};
</script>
<style lang="less" scoped>
.aboutQuery {
  position: absolute;
  bottom: 4px;
  z-index: 22;
  background: rgba(255, 255, 255, 0.9);
  width: 80%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  left: 200px;

  .sxcx,
  .kjcx {
    height: 367px;
    padding: 0 6px;
    box-sizing: border-box;
  }
  .titleContainer {
    margin-left: 15px;
    padding-right: 15px;
    line-height: 50px;
  }
  .searchContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
    height: 40px;
    padding-top: 6px;
    justify-content: space-between;
    width: 400px;
    img {
      border: 2px solid #4a84a3;
      width: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
    img:hover{
      background: rgba(3, 103, 123, 0.2);
    }
  }
}

h3 {
  width: 114px;
  float: left;
  margin: 0;
  color: #2c3e50;
}
.el-icon-close {
  position: absolute;
  right: 15px;
  top: 10px;
  color: black;
  font-size: 24px;
}

/deep/.el-drawer {
  height: 100% !important;
}
/deep/.el-drawer__container {
  height: 30% !important;
}

/deep/.el-cascader:not(.is-disabled):hover .el-input__inner,
/deep/.el-input__inner {
  background-color: transparent;
  // border: 1px solid #395372;
}

// /deep/.el-cascader .el-input .el-input__inner:focus, /deep/.el-cascader .el-input.is-focus .el-input__inner{
//   border: 1px solid #395372;
// }
/deep/.el-cascader .el-input .el-input__inner:focus,
/deep/ .el-cascader .el-input.is-focus .el-input__inner {
  // border-color: #395372;
}



/deep/.el-tree {
  background-color: transparent;
  color: #000;
}

/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: rgba(3, 103, 123, 0.1);
}
/deep/.el-table {
  background-color: transparent;
}
/deep/.el-table__empty-block {
  background-color: transparent !important;
}

/deep/.el-table th {
  background-color: transparent !important;
}

/deep/.el-table thead th {
  padding: 6px 0;
  color: #18639d !important;
  background: rgba(3, 103, 123, 0.2);
}
/deep/.el-table tbody td {
  padding: 5px 0;
}

/deep/.el-table thead th:hover {
  background: rgba(3, 103, 123, 0.1) !important;
}
/deep/.el-table tbody th:hover {
  background: rgba(3, 103, 123, 0.1);
}

/deep/.el-table tr {
  background-color: transparent !important;
  color: #000 !important;
}

/deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: transparent !important;
}

/deep/.el-table__body tr.current-row > td {
  background-color: rgba(3, 103, 123, 0.1) !important;
}

/deep/.el-table--striped
  .el-table__body
  tr.el-table__row--striped.current-row
  td {
  background-color: rgba(3, 103, 123, 0.1) !important;
}

.sxcx /deep/.el-table__body-wrapper {
  height: 223px !important;
}
.kjcx /deep/.el-table__body-wrapper {
  height: 252px !important;
}
.query-result-container {
  display: flex;
  box-sizing: border-box;
  height: 317px;
  width: 100%;
  .query-layers {
    width: 280px;
    margin-right: 4px;
    max-height: 100%;
    padding: 2px;
    border: 1px solid #a8becf;
    overflow: auto;
    /deep/.el-tree-node__content {
      height: 36px !important ;
    }
  }
  .query-property {
    border: 1px solid #a8becf;
    flex: 1;
    width: 1207px;
    max-height: 100%;
    /deep/.el-table th,
    .el-table tr {
      background-color: transparent;
    }
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/deep/.el-pagination.is-background .el-pager li {
  background-color: transparent;
  border: 1px solid #98afb4;
  color: #98afb4;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  color: #fff;
}

/deep/.el-pagination.is-background .btn-next,
/deep/.el-pagination.is-background .btn-prev {
  background-color: transparent;
  border: 1px solid #98afb4;
  color: #98afb4;
}

// /deep/.el-table--border::after,
// /deep/.el-table--group::after,
// /deep/ .el-table::before {
//   background-color: #0d3553;
// }

/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-bottom: 1px solid #8db5bc;
}

/deep/::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
  cursor: pointer;
}
/deep/::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(78, 127, 175, 0.8);
}
/deep/::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(151, 129, 129, 0.2);
  border-radius: 4px;
  background: transparent;
}
/deep/.el-input__inner {
  border: 1px solid #106c89;
  height: 36px;
  line-height:36px;
}
</style>
