<template>
  <div class="leftTree">
    <i
      class="el-icon-menu"
      v-if="ifShowTree"
      @click="ifShowTree = !ifShowTree"
    ></i>
    <i
      class="el-icon-s-grid"
      v-if="!ifShowTree"
      @click="ifShowTree = !ifShowTree"
    ></i>
    <div v-show="ifShowTree" class="aboutTree">
      <h1>资源目录</h1>
      <el-tree
        :data="SourceDrc"
        show-checkbox
        node-key="id"
        :load="loadServerNode"
        :props="defaultProps"
        :render-content="renderContent"
        @current-change="nodeClick"
        accordion
        lazy
      ></el-tree>
    </div>
  </div>
</template>

<script>
import { getTree } from "@/api/tree";
export default {
  data() {
    return {
      ifShowTree: false,
      SourceDrc: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    loadServerNode(node, resolve) {
      let obj = {};
      if (node.level !== 0 && node.data.id) {
        obj = { id: node.data.id };
      }
      getTree(obj).then((res) => {
        if (res.success && res.body.length > 0) {
          return resolve(res.body);
        } else {
          return resolve(null);
        }
      });
    },
    nodeClick(obj, node) {
    },

    renderContent: function (h, { node, data, store }) {
      if (data.type == 1) { 
          if (node.expanded) {
          return (
            <div>
              <span title={data.label} class="style-demo">
                <i
                  class="el-icon-folder-opened"
                  style="color: #FFB427;margin-right:2px;"
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
                  style="color: #FFB427;margin-right:2px;"
                ></i>
                {data.label}
              </span>
            </div>
          );
        }
      }else{
        return (
          <div>
            <span title={data.label} class="style-demo">
              <i
                class="el-icon-document"
                style="color: #FFB427;margin-right:2px;"
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
  top: 100px;
  left: 35px;
  .aboutTree {
    width: 379px;
    height: 800px;
    background-color: rgb(246, 243, 243);
    box-shadow: 5px 0px 15px 0px rgba(67, 67, 65, 0.08);
    border: solid 1px #bfbfbf;
  }
  > i {
    position: absolute;
    top: 11px;
    left: -28px;
    color: white;
  }
}
</style>