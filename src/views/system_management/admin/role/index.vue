<template>
  <div class="app-container calendar-list-container">
    <div class="top_left" style="margin-bottom: 10px">
      <el-button type="primary" icon="el-icon-plus" @click="dealRole('add')"
        >新增角色
      </el-button>
    </div>
    <el-table 
      :data="list"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleCode" label="角色标识"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column prop="dsType" label="数据权限"> 
        <template #default="{ row }">
          {{ dsTypeFilter(row.dsType) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="{ row }">
          <el-button size="mini" @click="dealRole('edit', row)">编辑</el-button>
          <el-button size="mini" @click="handlePermission(row)">权限</el-button>
          <el-button size="mini" type="danger" @click="delCol(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <addRole
      v-if="showEditAdd"
      :dataType="abouttype"
      :dataInfo="currentObj"
      ref="addedit"
    />
    <el-dialog
      v-model="dialogPermissionVisible"
      :close-on-click-modal="false"
      title="分配权限"
      custom-class="roleDialog"
    >
      <div class="dialog-main-tree">
        <el-tree
          ref="menuTree"
          :data="treeData"
          :default-checked-keys="checkedKeys"
          :check-strictly="false"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          node-key="id"
          highlight-current
          show-checkbox
          default-expand-all
        />
      </div>
      <div class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="small" @click="updatePermession(roleId)"
          >更 新
        </el-button>
        <el-button type="default" size="small" @click="cancal()"
          >取消</el-button
        >
      </div>
    </el-dialog>

    <el-pagination
      @current-change="currentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchList,
  fetchRoleTree,
  permissionUpd,
  putObj,
} from "@/api/admin/role";
import { tableOption } from "@/const/crud/admin/role";
import { fetchTree } from "@/api/admin/dept";
import { fetchMenuTree } from "@/api/admin/menu";
import addRole from "./addRole.vue";
import { mapGetters } from "vuex";

export default {
  name: "TableRole",
  components: {
    addRole,
  },
  data() {
    return {
      // dicData: [
      //   {
      //     label: "全部",
      //     value: 0,
      //   },
      //   {
      //     label: "自定义",
      //     value: 1,
      //   },
      //   {
      //     label: "本级及子级",
      //     value: 2,
      //   },
      //   {
      //     label: "本级",
      //     value: 3,
      //   },
      // ],
      currentObj: {},
      abouttype: "",
      list: [],
      showEditAdd: false,

      searchForm: {},
      tableOption: tableOption,
      dsScopeData: [],
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      defaultProps: {
        label: "name",
        value: "id",
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      menuIds: "",

      listLoading: true,
      form: {},
      roleId: undefined,
      roleCode: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false,
      roleManager_btn_add: false,
      roleManager_btn_edit: false,
      roleManager_btn_del: false,
      roleManager_btn_perm: false,
    };
  },
  // created() {
  //   this.roleManager_btn_add = this.permissions["sys_role_add"];
  //   this.roleManager_btn_edit = this.permissions["sys_role_edit"];
  //   this.roleManager_btn_del = this.permissions["sys_role_del"];
  //   this.roleManager_btn_perm = this.permissions["sys_role_perm"];
  // },
  // computed: {
  //   ...mapGetters(["elements", "permissions"]),
  // },

  created() {
    this.getList();
  },

  methods: {
    dsTypeFilter(val) {
      switch (val) {
        case 0:
          return "全部";
        case 1:
          return "自定义";
        case 2:
          return "本级及子级";
        case 3:
          return "本级";
      }
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
      )
        .then((response) => {
          this.list = response.data.records;
          this.page.total = response.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    delCol(row) {
      this.$confirm('是否确认删除名称为"' + row.roleName + '"' + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.roleId)
      }).then(() => {
        this.getList()
        this.$message.success('删除成功')
      })
    },
    dealRole(type, row) {
      this.abouttype = type;
      this.showEditAdd = true;
      if (type == "add") {
        this.currentObj={}
      } else {
        this.currentObj = JSON.parse(JSON.stringify(row));
      }
    },

    refreshChange() {
      this.getList(this.page);
    },
    searchChange(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
      this.getList();
    },
    handleCreate() {
      this.$refs.crud.rowAdd();
    },
    handleOpenBefore(show) {
      fetchTree().then((response) => {
        this.dsScopeData = response.data.data;
        if (this.form.dsScope) {
          this.checkedDsScope = this.form.dsScope.split(",");
        } else {
          this.checkedDsScope = [];
        }
      });
      show();
    },
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    cancal() {
      this.dialogPermissionVisible = false;
    },
    handlePermission(row) {
      fetchRoleTree(row.roleId)
        .then((response) => {
          this.checkedKeys = response.data;
          return fetchMenuTree();
        })
        .then((response) => {
          this.treeData = response.data;
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(
            this.treeData,
            this.checkedKeys,
            []
          );
          this.dialogPermissionVisible = true;
          this.roleId = row.roleId;
          this.roleCode = row.roleCode;
        });
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i];
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp);
        } else {
          temp.push(idArr.filter((id) => id === item.id));
        }
      }
      return temp;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data, done) {
      done();
    },
    //新增
    create(row, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(",");
      }
      addObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$message.success("创建成功");
        })
        .catch(() => {
          loading();
        });
    },
    update(row, index, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(",");
      }
      putObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$message.success("修改成功");
        })
        .catch(() => {
          loading();
        });
    },
    updatePermession(roleId) {
      this.menuIds = "";
      this.menuIds = this.$refs.menuTree
        .getCheckedKeys()
        .join(",")
        .concat(",")
        .concat(this.$refs.menuTree.getHalfCheckedKeys().join(","));
      permissionUpd(roleId, this.menuIds).then((res) => {
        let { code, msg } = res;
        if (code == 0) {
          this.dialogPermissionVisible = false;
          this.$store.dispatch("GetMenu", { type: false });
          this.$message.success("修改成功");
        } else {
          this.$message.error(msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 .roleDialog {
    width: 61% !important;
    .dialog-main-tree {
      max-height: 560px;
      overflow-y: auto;
      margin-bottom: 10px;
    }
    /deep/.el-dialog__body{
      height: 600px;
    }
  }
.el-dialog__wrapper {
 
  .el-form-item__label {
    width: 20% !important;
    padding-right: 20px;
  }
  .el-form-item__content {
    margin-left: 20% !important;
  }
}
</style>
