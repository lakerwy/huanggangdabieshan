<template>
  <div class="execution">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
    >
      <!-- createTime: "2019-03-19 11:06:44"
delFlag: "0"
description: "日志类型"
id: 1
remarks: "异常、正常"
system: "1"
type: "log_type"
updateTime: "2019-03-19 11:06:44" -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="system" label="字典类型">
        <template #default="{row}">
          {{ row.system == 0 ? "业务类" : "系统类" }}
        </template> </el-table-column>
      <el-table-column prop="remarks" label="备注信息"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="mini" @click="dealVideo('edit', row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="rowDel(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @search-change="searchChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-del="rowDel">
        <template
          slot-scope="scope"
          slot="menu">
          <el-button
            v-if="permissions.sys_dict_add"
            type="text"
            size="small"
            icon="el-icon-menu"
            @click="handleItem(scope.row,scope.index)">字典项
          </el-button>
        </template>
      </avue-crud>
    </basic-container> -->
    <el-dialog
      :visible="dialogFormVisible"
      title="字典项管理"
      width="90%"
      @close="dictItemVisible"
    >
      <!-- <avue-crud
        ref="crudItem"
        :page="itemPage"
        :data="tableDictItemData"
        :permission="permissionList"
        v-model="form"
        :before-open="handleBeforeOpen"
        :option="tableDictItemOption"
        @size-change="itemSizeChange"
        @current-change="itemCurrentChange"
        @row-update="handleItemUpdate"
        @row-save="handleItemSave"
        @row-del="rowItemDel"
      /> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  addItemObj,
  addObj,
  delItemObj,
  delObj,
  fetchItemList,
  fetchList,
  putItemObj,
  putObj,
} from "@/api/admin/dict";
import { tableDictItemOption, tableOption } from "@/const/crud/admin/dict";
import { mapGetters } from "vuex";

export default {
  name: "Dict",
  data() {
    return {
      searchForm: {},
      form: {
        type: undefined,
        dictId: undefined,
      },
      dictType: undefined,
      dictId: undefined,
      dialogFormVisible: false,
      tableData: [],
      tableDictItemData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      itemPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      tableDictItemOption: tableDictItemOption,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    // permissionList() {
    //   return {
    //     addBtn: this.vaildData(this.permissions.sys_dict_add, false),
    //     delBtn: this.vaildData(this.permissions.sys_dict_del, false),
    //     editBtn: this.vaildData(this.permissions.sys_dict_edit, false)
    //   }
    // }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableLoading = true;
      fetchList({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then((response) => {
        this.tableData = response.data.records;
        this.page.total = response.data.total;
        this.tableLoading = false;
      });
    },
    rowDel: function (row) {
      this.$confirm(
        '是否确认删除数据类型为"' + row.type + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delObj(row);
        })
        .then(() => {
          this.getList(this.page);
          this.$message.success("删除成功");
        })
        .catch(function () {});
    },
    handleUpdate: function (row, index, done) {
      putObj(row).then(() => {
        this.$message.success("修改成功");
        this.getList(this.page);
        done();
      });
    },
    handleSave: function (row, done) {
      addObj(row).then(() => {
        this.$message.success("添加成功");
        this.getList(this.page);
        done();
      });
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
    },
    //======字典项表格相关=====
    dictItemVisible: function () {
      this.dialogFormVisible = false;
      this.itemPage.currentPage = 1;
    },
    handleItem: function (row) {
      this.dictId = row.id;
      this.dictType = row.type;
      this.getDictItemList();
    },
    getDictItemList() {
      this.dialogFormVisible = true;
      fetchItemList(
        Object.assign(
          {
            current: this.itemPage.currentPage,
            size: this.itemPage.pageSize,
          },
          { dictId: this.dictId }
        )
      ).then((response) => {
        this.tableDictItemData = response.data.data.records;
        this.itemPage.total = response.data.data.total;
      });
    },
    handleBeforeOpen(done) {
      this.form.type = this.dictType;
      this.form.dictId = this.dictId;
      done();
    },
    handleItemSave: function (row, done) {
      addItemObj(row).then(() => {
        this.$message.success("添加成功");
        this.getDictItemList();
        done();
      });
    },
    handleItemUpdate: function (row, index, done) {
      putItemObj(row).then(() => {
        this.$message.success("修改成功");
        this.getDictItemList();
        done();
      });
    },
    itemSizeChange(pageSize) {
      this.itemPage.pageSize = pageSize;
      this.getDictItemList();
    },
    itemCurrentChange(current) {
      this.itemPage.currentPage = current;
      this.getDictItemList();
    },
    rowItemDel: function (row) {
      this.$confirm('是否确认删除数据为"' + row.label + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delItemObj(row.id);
        })
        .then(() => {
          this.getDictItemList();
          this.$message.success("删除成功");
        })
        .catch(function () {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

