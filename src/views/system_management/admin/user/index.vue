<template>
  <div class="user">
    <el-row :span="24" style="padding-top: 10px">
      <el-col :xs="24" :sm="24" :md="5" class="user__tree">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree
          :data="treeData"
          :props="treeProps"
          ref="tree"
          :filter-node-method="filterNode"
          class="filter-tree"
          node-key="id"
          highlight-current
          @node-click="nodeClick"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="19" class="user__main">
        <div style="margin-bottom: 10px; text-align: right">
          <el-input
            placeholder="请输入用户名"
            v-model="searchName"
            class="searchName"
            clearable
          >
          </el-input>
          <el-button type="info" @click="search">搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="dealUser('add')"
            style="float: left"
            >新增用户
          </el-button>
        </div>
        <el-table
          :data="list"
          stripe
          style="width: 100%"
          :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <!-- <el-table-column prop="userId" label="id"> </el-table-column> -->
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <!-- <el-table-column prop="password" label="密码"> </el-table-column> -->
          <el-table-column prop="deptName" label="所属部门"> </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="roleName" :data="role" label="角色">
            <template #default="{ row }">
              <el-tag v-for="(item1, index) in row.roleList" :key="index">
                {{ item1.roleName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userType " label="状态">
            <template #default="{ row }">
              <el-tag>
                {{ row.userType == 0 ? "有效" : "锁定" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                size="mini"
                type="success"
                @click="dealUser('edit', row)"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" @click="delCol(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <addUser
      v-if="showEditAdd"
      :dataType="abouttype"
      :dataInfo="currentObj"
      ref="addedit"
    />
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj } from "@/api/admin/user";
import { deptRoleList } from "@/api/admin/role";
import { fetchTree } from "@/api/admin/dept";
import { tableOption } from "@/const/crud/admin/user";
import addUser from "./addUser";
import { mapGetters } from "vuex";

export default {
  name: "SysUser",
  components: {
    addUser,
  },
  data() {
    return {
      searchName: "",
      abouttype: "",
      showEditAdd: false,
      filterText: "",
      treeProps: {
        children: "children",
        label: "name",
      },
      searchForm: {},
      treeData: [],
      option: tableOption,
      treeDeptData: [],
      checkedKeys: [],
      currentObj: {},
      roleProps: {
        label: "roleName",
        value: "roleId",
      },
      defaultProps: {
        label: "name",
        value: "id",
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条,
        isAsc: false, // 是否倒序
        deptId: "",
      },
      list: [],
      listLoading: true,
      item: [],
      role: [],
      form: {},
      rolesOptions: [],
    };
  },
  // computed: {
  //   ...mapGetters(["permissions"]),
  // },
  watch: {
    role() {
      this.form.role = this.role;
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    // this.sys_user_add = this.permissions["sys_user_add"];
    // this.sys_user_edit = this.permissions["sys_user_edit"];
    // this.sys_user_del = this.permissions["sys_user_del"];
    this.init();
    // this.getList(this.page);
    this.getList();
  },

  methods: {
    init() {
      fetchTree().then((response) => {
        this.treeData = response.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    search() {
      this.page.page = 1;
      this.getList();
    },
    nodeClick(data) {
      this.page.page = 1;
      this.page.deptId = data.id;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      let params = {
        current: this.page.currentPage,
        size: this.page.pageSize,
        deptId: this.page.deptId,
        username: this.searchName,
      };
      fetchList(params).then((response) => {
        this.list = response.data.records;
        this.page.total = response.data.total;
        this.listLoading = false;
      });
    },

    dealUser(type, row) {
      this.abouttype = type;
      this.showEditAdd = true;
      if (type == "add") {
        this.currentObj = {};
      } else {
        this.currentObj = JSON.parse(JSON.stringify(row));
      }
    },

    getNodeData() {
      //新增 权限列表
      deptRoleList().then((response) => {
        this.rolesOptions = response.data.data;
      });
    },
    searchChange(param, done) {
      this.searchForm = param;
      this.page.currentPage = 1;
      this.getList(this.page, param);
      done();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
      this.getList();
    },

    // refreshChange() {
    //   this.getList(this.page);
    // },
    // handleOpenBefore(show, type) {
    //   window.boxType = type;
    //   // 查询部门树
    //   fetchTree().then((response) => {
    //     this.treeDeptData = response.data.data;
    //   });
    //   // 查询角色列表
    //   deptRoleList().then((response) => {
    //     this.rolesOptions = response.data.data;
    //   });

    //   if (["edit", "views"].includes(type)) {
    //     this.role = [];
    //     for (let i = 0; i < this.form.roleList.length; i++) {
    //       this.role[i] = this.form.roleList[i].roleId;
    //     }
    //   } else if (type === "add") {
    //     this.role = [];
    //   }
    //   show();
    // },
    // handleUpdate(row, index) {
    //   this.$refs.crud.rowEdit(row, index);
    //   this.form.password = undefined;
    // },
    // create(row, done, loading) {
    //   if (this.form.phone.indexOf("*") > 0) {
    //     this.form.phone = undefined;
    //   }
    //   addObj(this.form)
    //     .then(() => {
    //       this.getList(this.page);
    //       done();
    //       this.$message.success("创建成功");
    //     })
    //     .catch(() => {
    //       loading();
    //     });
    // },
    // update(row, index, done, loading) {
    //   if (this.form.phone && this.form.phone.indexOf("*") > 0) {
    //     this.form.phone = undefined;
    //   }
    //   putObj(this.form)
    //     .then(() => {
    //       this.getList(this.page);
    //       done();
    //       this.$message.success("修改成功");
    //     })
    //     .catch(() => {
    //       loading();
    //     });
    // },
    delCol(row, index) {
      this.$confirm(
        "此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        delObj(row.userId)
          .then((res) => {
            if (res.code == 0) {
              this.list.splice(index, 1);
              this.$message.success("删除成功");
              this.getList();
            }else{
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-tree {
  border: 1px solid #e4e6ea;
  height: 660px;
  overflow-y: auto;
  margin-top: 6px;
  padding: 12px;
  /deep/.el-tree-node__content {
    height: 30px;
  }
}
.user {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
  }
}
.searchName {
  width: 340px;
  margin-right: 10px;
}
</style>