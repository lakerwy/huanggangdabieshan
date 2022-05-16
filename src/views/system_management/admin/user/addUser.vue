<template>
  <div>
    <el-dialog
      :title="dataType == 'add' ? '新增' : '编辑'"
      v-model="dialogVisible"
      width="36%"
      :before-close="dialogClose"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-show="dataType == 'add' ">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptName">
          <el-select
            v-model="form.deptName"
            placeholder="请选择所属部门"
            v-if="treeData.length > 0"
          >
            <el-option :value="form.deptName" :label="form.deptName">
              <el-tree
                :data="treeData"
                :props="treeProps"
                ref="tree"
                :filter-node-method="filterNode_"
                class="filter-tree"
                node-key="id"
                highlight-current
                @node-click="nodeClick_"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <!-- <el-input> -->
          <el-select v-model="form.role" multiple placeholder="请选择角色">
            <el-option
              v-for="item in rolesOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
          <!-- </el-input> -->
        </el-form-item>
        <el-form-item label="状态" prop="userType">
          <el-radio-group v-model="form.userType">
            <el-radio label="0">有效</el-radio>
            <el-radio label="1">锁定</el-radio>
          </el-radio-group>
          <!-- <el-input v-model="form.userType"></el-input> -->
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
import { addObj, putObj, fetchList } from "@/api/admin/user";
import "viewerjs/dist/viewer.css";
import { fetchTree } from "@/api/admin/dept";
import { deptRoleList } from "@/api/admin/role";

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
      // radio:"0",
      rolesOptions: [],
      dialogVisible: false,
      filterText: "",
      treeProps: {
        children: "children",
        label: "name",
      },
      roleProps: {
        label: "roleName",
        value: "roleId",
      },
      treeData: [],
      form: {
        username: "",
        password: "",
        deptName: "",
        deptId:"",
        phone: "",
        role: [],
        userType: "0",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        deptName: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "数字长度为11位", trigger: "bulr" },
        ],
        role: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "bulr",
          },
        ],
        userType: [{ required: true }],
      },
    };
  },
  watch: {
    dataInfo(val) {
      this.form = val;
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.dialogVisible = true;

    this.form = this.dataInfo;
    this.form.userType = "" + this.dataInfo.userType;
    this.init();
    this.getNodeData();
    if (this.dataType == "add") {
      this.resetForm();
    } else {
      if (this.dataInfo.roleList) {
        var listArr = [];
        this.dataInfo.roleList.forEach((item) => {
          if (item.roleId) {
            listArr.push(item.roleId);
          }
        });
        this.form.role = listArr;
      }
    }
  },

  methods: {
    getNodeData() {
      //新增 权限列表
      deptRoleList().then((response) => {
        if (response.code == 0 && response.data.length > 0) {
          this.rolesOptions = response.data;
        }
      });
    },
    // setOption() {
    //   this.$parent.getNodeData() = true;
    // },
    init() {
      fetchTree().then((response) => {
        this.treeData = response.data;
      });
    },
    nodeClick_(data) {
      this.form.deptName = data.name;
      this.form.deptId = data.id;
    },
    getList() {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          this.params,
          this.searchForm
        )
      ).then((response) => {
        this.list = response.data.records;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },
    filterNode_(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    close() {
      this.$parent.showEditAdd = false;
    },
    dialogClose() {
      this.form = {};
      this.$parent.showEditAdd = false;
    },
    // setOption() {
    //   this.$parent.getNodeData();
    // },

    confirm() {
      let that = this;
      that.$refs["form"].validate((valid) => {
        // 表单验证
        if (valid) {
          if (that.dataType == "add") {
            addObj(that.form).then((res) => {
              if (res.code == 0) {
                that.$message({
                  showClose: true,
                  message: `新增成功`,
                  type: "success",
                });
                that.$parent.currentChange(1);
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
            putObj(that.form).then((res) => {
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
                  message: res.message,
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
    resetForm(form) {
      this.form = {
        username: undefined,
        deptName: undefined,
        phone: undefined,
        role: undefined,
        password: undefined,
        userType: "0",
      };
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
/deep/.el-select {
  width: 100%;
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
