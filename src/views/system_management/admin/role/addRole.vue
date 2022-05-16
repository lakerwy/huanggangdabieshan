<template>
  <div>
    <el-dialog
      :title="dataType == 'add' ? '新增角色' : '修改角色'"
      v-model="dialogVisible"
      width="36%"
      :before-close="dialogClose"
      class="exhibition_control"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="roleCode">
          <el-input v-model="form.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="数据权限" prop="dsType">
          <el-select v-model="form.dsType" placeholder="请选择数据权限">
            <el-option
              v-for="item in options"
              :key="item.dsType"
              :label="item.label"
              :value="item.dsType"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <p style="text-align: center">
        <el-button @click="confirm" class="green-confirm">确认</el-button>
        <el-button @click="close" class="green-close">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import { addObj, roleUpdate } from "_api/admin/role";
export default {
  props: {
    dataType: {
      type: String,
    },
    dataInfo: {
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      options: [
        {
          dsType: 0,
          label: "全部",
        },
        {
          dsType: 1,
          label: "自定义",
        },
        {
          dsType: 2,
          label: "本级及子级",
        },
        {
          dsType: 3,
          label: "本级",
        },
      ],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { max: 10, message: "最多输入10个字符", trigger: "blur" },
        ],
        roleCode: [
          { required: true, message: "请输入角色标识", trigger: "blur" },
          { max: 15, message: "最多输入15个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: false, message: "请输入角色描述", trigger: "blur" },
          { max: 50, message: "最多输入50个字符", trigger: "blur" },
        ],
        dsType: [
          { required: true, message: "请选择数据权限", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    dataInfo(val) {
      this.form = val;
    },
  },
  created() {
    this.dialogVisible = true;
    this.form = this.dataInfo;
  },
  methods: {
    close() {
      this.$parent.showEditAdd = false;
    },
    dialogClose() {
      this.form = {};
      this.$parent.showEditAdd = false;
    },
    confirm() {
      let that = this;
      that.$refs["form"].validate((valid) => {
        // 表单验证
        let params = {
          roleName: that.form.roleName,
          roleDesc: that.form.roleDesc,
          roleCode: that.form.roleCode,
          dsType: that.form.dsType,
        };
        let params2 = {
          roleName: that.form.roleName,
          roleDesc: that.form.roleDesc,
          roleCode: that.form.roleCode,
          dsType: that.form.dsType,
          roleId: that.form.roleId,
        };

        if (valid) {
          if (that.dataType == "add") {
            addObj(params).then((res) => {
              if (res.code == 0) {
                that.$message({
                  showClose: true,
                  message: `添加成功`,
                  type: "success",
                });
                // that.filterRoom(that.form.showroomId);
                that.$parent.currentChange(1);
                //页面初始化刷新为1
              } else {
                that.$message({
                  showClose: true,
                  message: res.msg,
                  //返回错误信息
                  type: "info",
                });
              }
              that.$parent.showEditAdd = false;
            });
          } else {
            roleUpdate(params2).then((res) => {
              if (res.code == 0) {
                that.$message({
                  showClose: true,
                  message: `修改成功`,
                  type: "success",
                });
                that.$parent.showEditAdd = false;
                that.$parent.getList();
              } else {
                that.$message({
                  showClose: true,
                  message: res.msg,
                  type: "info",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },

    filterRoom(id) {
      this.tabArr.forEach((item, index) => {
        if (item.id == id) {
          this.$parent.activeTab = index;
          this.$parent.params.id = id;
          let params = {
            id: id,
            page: 1,
            pageSize: 11,
          };
          this.$parent.getCollections(params);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: none;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 82px;
  height: 82px;
}
/deep/.el-upload--picture-card {
  width: 82px;
  height: 82px;
  line-height: 82px;
}
/deep/.el-form-item {
  width: 92%;
}
</style>
<style lang="less" scoped>
.exhibition-management .el-dialog__body {
  padding: 30px 30px 10px 70px !important;
}
.img-container {
  position: absolute;
  width: 100%;
  height: 100%;
  > ul {
    list-style: none;
    margin: 0;
    max-width: 30rem;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    > li {
      flex: 1;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// .el-form {
//   max-height: 560px;
//   overflow: auto;
// }
.el-form::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.el-form::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.el-form::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>