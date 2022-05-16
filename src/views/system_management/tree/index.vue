<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-dropdown>
        <el-button v-if="deptManager_btn_add" type="primary" icon="el-icon-plus"
          >添加<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>

        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="folder('1', row)"
              >文件夹</el-dropdown-item
            >
            <el-dropdown-item @click="folder('2', row)" v-show="form.type != 2">文件</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button
        v-if="deptManager_btn_edit"
        type="success"
        icon="el-icon-edit"
        @click="handlerEdit"
        style="margin-left: 10px"
        :disabled="!currentObj.id"
        >编辑
      </el-button>
      <el-button
        v-if="deptManager_btn_del"
        type="danger"
        icon="el-icon-delete"
        @click="handleDelete"
        :disabled="!currentObj.id"
        >删除
      </el-button>
    </div>

    <el-row>
      <el-col :span="5" style="margin-top: 10px">
        <el-tree
          node-key="id"
          :load="loadServerNode"
          :props="defaultProps"
          :render-content="renderContent"
          :default-expanded-keys="expandArr"
          @node-click="getCurrentNode"
          accordion
          lazy
        ></el-tree>
      </el-col>
      <el-col :span="16" style="margin-top: 15px">
        <el-card class="box-card">
          <el-form
            ref="form"
            :label-position="labelPosition"
            :rules="rules"
            :model="form"
            label-width="150px"
          >
            <!-- <el-form-item label="文件类型" v-show="formStatus">
              <el-input disabled v-model="abouttype" />
            </el-form-item> -->
            <el-form-item
              prop="name"
              :label="abouttype == 1 ? '文件名称：' : '图层名称：'"
              v-show="formStatus || form.name"
            >
              <el-input v-model="form.name" :disabled="!formStatus" />
            </el-form-item>
            <el-form-item v-show="abouttype == 2" label="服务地址：">
              <el-input v-model="form.serviceUrl" :disabled="!formStatus" />
            </el-form-item>
            <el-form-item v-show="abouttype == 2" label="服务类型：">
              <el-radio-group
                v-model="form.serviceType"
                :disabled="!formStatus"
              >
                <el-radio label="other">其它</el-radio>
                <el-radio label="video">视频</el-radio>
                <el-radio label="img">图例</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="图例图片："
              v-show="form.serviceType == 'img' && abouttype == 2"
            >
              <el-upload
                class="upload-demo"
                action="#"
                ref="upload"
                accept="image/jpeg,image/jpg,image/png"
                :auto-upload="false"
                :on-preview="handlePreview"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="fileList"
                :limit="1"
                list-type="picture-card"
                :disabled="!formStatus"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="imgVisible" :width="width" append-to-body>
                <img @load="onLoad" :src="imageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <!-- <el-form-item
              v-show="form.serviceType == 'video'"
              label="视频园区："
            >
              <el-select v-model="form.region">
                <el-option
                  v-for="(item, ind) in citys"
                  :key="ind"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存 </el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="create">更新 </el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRegionToCity } from "@/api/property/exchangeIssues";
import { split } from "@/util/util.js";
import { getTree, delTree } from "@/api/tree";
import axios from 'axios';
export default {
  name: "tree",
  inject: ["reload"],
  data() {
    return {
      node: null,
      resolve: null,
      fileName: true,
      imgVisible: false,
      abouttype: 1,
      formStatus: "",
      list: null,
      total: null,
      listQuery: {
        name: '',
      },
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf",
      },
      labelPosition: "right",
      form: {
        name: '',
        serviceUrl: '',
        type: null,
        pid: '',
        serviceType: 'other'
      },
      citys: [],
      deptManager_btn_add: false,
      deptManager_btn_edit: false,
      deptManager_btn_del: false,
      props: {
        label: "xzqmc",
        children: "list",
        value: "xzqbh",
        checkStrictly: true,
        emitPath: false,
      },
      width: '',
      regionData: [],
      currentObj: {},
      fileList: [],
      imageUrl: '',
      rules: {
        name: [
          { required: true, message: "", trigger: "blur" },
        ]
      },
    };
  },
  created() {
    this.deptManager_btn_add = this.permissions["sys_dept_add"];
    this.deptManager_btn_edit = this.permissions["sys_dept_edit"];
    this.deptManager_btn_del = this.permissions["sys_dept_del"];
  },
  computed: {
    ...mapGetters(["elements", "permissions", "component"]),
  },
  methods: {
    cancel(){
      this.$refs['form'].resetFields();
      this.getCurrentNode(this.currentObj);
      this.formStatus = '';
    },
    onLoad(e) {
      const img = e.target;
      let width = 0;
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40;
      }
      this.width = width + 'px';
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.imgVisible = true;
      this.imageUrl = file.url;

    },
    async initRegion() {
      let res = await getRegionToCity();
      let { status, data } = res.data;
      if (status) {
        let temp = data;
        this.regionData = split(temp);
      }
    },
    getList() {
      getTree(this.listQuery).then((response) => {
        this.treeData = response.body;
      });
    },
    handlerEdit() {
      this.formStatus = "update";
    },
    handleDelete() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delTree({ id: this.currentObj.id }).then((res) => {
          if (res.success == true) {
            this.$message({
              message: `删除成功`,
              type: "success",
            });
            this.reload();
            this.formStatus = "";
          }
        });
      });
    },
    create() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let fileParams = new FormData();
          fileParams.append("name", this.form.name);
          let layerParams = new FormData();
          if (this.form.serviceType == 'img') {
            layerParams.append("file", this.fileList[0].raw);
          }
          layerParams.append("serviceType", this.form.serviceType);
          layerParams.append("serviceUrl", this.form.serviceUrl);
          layerParams.append("name", this.form.name);
          //新增文件夹
          if (this.abouttype == 1) {
            //添加文件夹
            if (this.formStatus == 'create') {
              if (this.currentObj.id) {
                fileParams.append("pid", this.currentObj.id);
              }
              fileParams.append("type", this.abouttype);
              //更新文件夹
            } else {
              if (this.currentObj.id) {
                fileParams.append("id", this.currentObj.id);
              }
            }
            //新增图层
          } else {
            //新增图层
            if (this.formStatus == 'create') {
              layerParams.append("type", this.abouttype);
              if (this.currentObj.id) {
                layerParams.append("pid", this.currentObj.id);
              }
              //更新图层
            } else {
              if (this.currentObj.id) {
                layerParams.append("id", this.currentObj.id);
              }
            }
          }
          let typeName = this.formStatus == 'create' ? 'add' : 'update';
          let that = this;
          // return;
          axios({
            url: window.globalUrl.HOME_API + '/datamanager/layer/' + typeName,
            method: 'POST', //请求方式
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: that.abouttype == 1 ? fileParams : layerParams,
          }).then(res => {
            if (res.success == true) {
              that.$message({
                showClose: true,
                message: that.formStatus == 'create' ? `新增成功！` : `更新成功！`,
                type: 'success'
              });
              this.reload();
            } else {
              that.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              });
            }
          })
        }
      });
    },
    loadServerNode(node, resolve) {
      //加载数据的方法里把node，reslove存起来
      // this.node = node;
      // this.resolve = resolve;
      // this.node.childNodes = [];
      let obj = {};
      if (node.level !== 0 && node.data.id) {
        obj = { id: node.data.id };
      }
      getTree(obj).then((res) => {
        if (res.success && res.body.length > 0) {
          res.body.forEach((item) => {
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

    folder(type) {
      this.form.name = "";
      this.form.serviceUrl = "";
      this.formStatus = "create";
      this.abouttype = type;
    },
    getCurrentNode(obj) {
      this.formStatus = "";
      this.currentObj = obj;
      this.form.pid = obj.id;
      this.form.type = obj.type;
      this.form.name = obj.label;
      this.abouttype = obj.type;
      if (obj.type !== 1) {
        this.form.serviceType = obj.serviceType ? obj.serviceType : 'other';
        this.form.serviceUrl = obj.url;
        if (obj.imageUrl) {
          this.fileList = [{ url: window.globalUrl.FTP_URL + obj.imageUrl }];
        } else {
          this.fileList = []
        }
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
.el-tree {
  border: 1px solid #e4e6ea;
  height: 660px;
  overflow-y: auto;
  padding: 12px;
  /deep/.el-tree-node__content {
    height: 30px;
  }
}
</style>

