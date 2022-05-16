<template>
  <div class="leftTree">
    <h1>资源目录</h1>
    <i @click="close" class="el-icon-close"></i>
    <el-tree
      :data="SourceDrc"
      node-key="id"
      :load="loadServerNode"
      :props="defaultProps"
      :render-content="renderContent"
      :default-expanded-keys="expandArr"
      @current-change="nodeClick"
      accordion
      lazy
    ></el-tree>
  </div>
</template>

<script>
import { getTree } from "@/api/tree";
import { mapMutations, mapState } from "vuex";
// import { bus } from "./bus.js";
export default {
  data() {
    return {
      ifShowTree: false,
      SourceDrc: [],
      expandArr: [],

      defaultProps: {
        label: "label",
        children: 'children',
        isLeaf: 'leaf'
      },
    };
  },
  computed: {
    ...mapState(["component"]),
  },
  methods: {
    ...mapMutations(["setLegendUrl"]),
    close() {
      this.$parent.activeMenu = null;
    },
    loadServerNode(node, resolve) {
      let obj = {};
      if (node.level !== 0 && node.data.id) {
        obj = { id: node.data.id };
      }
      getTree(obj).then((res) => {
        if (res.success && res.body.length > 0) {
          res.body.forEach(item => {
            if (item.type == 2) {
              item.leaf = true;
            } else {
              item.leaf = false;
            }
          });
          return resolve(res.body);
        } else {
          return resolve(null);
        }
      });
    },
    nodeClick(obj) {
      if (obj.serviceType == 'img') {
        this.setLegendUrl(window.globalUrl.FTP_URL + obj.imageUrl);
      }
      if (obj.leaf) {
        this.$parent.emitObjToLayer(obj);
      }
    },
    renderContent: function (h, { node, data, store }) {
      if (data.type == 1) {
        if (node.expanded) {
          return (
            <div>
              <span title={data.label} class="style-demo">
                <i
                  class="el-icon-folder-opened"
                  style="color: #FFB427;margin-right:4px;"
                ></i>
                {data.label}
              </span>
            </div>
          );
        } else {
          return (
            <div>
              <span title={data.label} class="style-demo">
                <i
                  class="el-icon-folder"
                  style="color: #FFB427;margin-right:4px;"
                ></i>
                {data.label}
              </span>
            </div>
          );
        }
      } else {
        return (
          <div>
            <span title={data.label} class="style-demo">
              <i
                class="el-icon-document"
                style="color: #FFB427;margin-right:4px;"
              ></i>
              {data.label}
            </span>
          </div>
        );
      }

    },
  },
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 15px;
}

.leftTree {
  position: absolute;
  width: 320px;
  height: 548px;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  .el-tree {
    height: 500px;

    width: 312px;
    background: transparent;
  }
  .el-tree:hover {
    overflow: auto;
  }
  > i {
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
    font-size: 24px;
    cursor: pointer;
  }
}
.el-tree::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-tree::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(102, 142, 163, 0.8);
}
.el-tree::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: transparent;
}
</style>