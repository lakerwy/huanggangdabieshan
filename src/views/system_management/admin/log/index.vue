<template>
  <div class="log">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template #default="{ row }">
          {{ row.type == 0 ? "正常" : "异常" }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="remoteAddr" label="IP地址"> </el-table-column>
      <el-table-column prop="method" label="请求方式"> </el-table-column>
      <el-table-column prop="serviceId" label="客户端"> </el-table-column>
      <el-table-column prop="time" label="请求时间"> 
        <template #default="{ row }">
          {{row.time?row.time+'秒':null}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="mini" @click="detailShow(row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDel(row)"
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

    <showDetails v-if="detailShowif" :dataInfo="currentObj" ref="show" />
  </div>
</template>

<script>
import { delObj, fetchList } from "@/api/admin/log";
import { tableOption } from "@/const/crud/admin/log";
import showDetails from "./showDetails.vue"
import { mapGetters } from "vuex";

export default {
  name: "Log",
  components:{
    showDetails,
  },
  data() {
    return {
      tableData: [],
      currentObj:{},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableLoading: false,
      detailShowif: false,
      tableOption: tableOption,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableLoading = true;
      fetchList({
        descs: "create_time",
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then((response) => {
        this.tableData = response.data.records;
        this.page.total = response.data.total;
        this.tableLoading = false;
      });
    },
    handleDel: function (row) {
      this.$confirm('是否确认删除ID为"' + row.id + '"的日志?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then(() => {
          this.getList(this.page);
          this.$message.success("删除成功");
        });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
      this.getList();
    },
    refreshChange() {
      this.getList(this.page);
    },
    detailShow(row) {
      this.detailShowif = true;
      this.currentObj = row;
    },
  },
};
</script>
