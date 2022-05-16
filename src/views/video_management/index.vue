<template>
  <div class="list">
    <div class="top_left">
      <span class="add" @click="dealVideo('add')"
        ><i class="el-icon-plus"></i> 新增摄像头</span
      >
    </div>

    <el-table
      :data="ary"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="latitude" label="纬度"> </el-table-column>
      <el-table-column prop="longitude" label="经度"> </el-table-column>
      <el-table-column prop="name" label="摄像头名称"> </el-table-column>
      <el-table-column prop="position" label="地理位置"> </el-table-column>
      <el-table-column prop="stream" label="设备号"> </el-table-column>
      <el-table-column prop="streamType" label="设备类型"> </el-table-column>
      <el-table-column prop="videoTypeName" label="摄像头名称"> </el-table-column>
      <el-table-column prop="video_type" label="摄像头类型">
        <template #default="{ row, $index }">
          {{ row.video_type == 0 ? $index + "视频流" : "播放地址" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="mini" @click="detailsVideo(row)">详情</el-button>

          <el-button size="mini" @click="dealVideo('edit', row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="delCol(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-size="params.count"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <addVideo
      v-if="showEditAdd"
      :dataType="abouttype"
      :dataInfo="currentObj"
      ref="addedit"
    />
    <showCamera v-if="showVideoFlag" ref="details" :Url="videourl" />
  </div>
</template>
<script>
import { getVideo, delVideo, playerVideo } from "_api/tree";
import addVideo from "./addVideo.vue";
import showCamera from "./showCamera.vue";

export default {
  components: {
    addVideo,
    showCamera,
  },
  data() {
    return {
      videourl: "",
      ary: [],
      currentObj: {},
      abouttype: "",
      params: {
        page: 1,
        count: 2,
      },
      total: 0,
      showEditAdd: false,
      showVideoFlag: false,
      //   addelCollections,
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      getVideo(this.params).then((res) => {
        this.ary = [];
        if (res.code == 200 && res.data.total > 0) {
          this.ary = res.data.list;
          this.total = res.data.total;
        } else {
          this.ary = [];
          this.total = 0;
        }
      });
    },

    detailsVideo(row) {
      if (row.stream == 3) {
        //播放
      } else {
        playerVideo(row.stream).then((res) => {
          if (res.code == 200) {
            this.showVideoFlag = true;
            this.videourl = res.data.flv;
          } else {
            this.$message.error("网络错误");
          }
        });
      }
    },

    dealVideo(type, row) {
      this.abouttype = type;
      this.showEditAdd = true;
      if (type == "add") {
      } else {
        row.lat = row.latitude;
        row.lon = row.longitude;
        row.videoType = row.video_type;
        this.currentObj = row;
      }
    },

    goTo(name) {
      this.$router.push({ name: name });
    },
    // handleEdit(index, row) {
    // },
    handleDelete(index, row) {
      if (this.checkedDetail.length == 0) {
      }
    },
    handleCurrentChange(index) {
      this.params.page = index;
      this.init();
    },
    delCol(item) {
      this.$confirm("确定删除摄像头：" + item.name + "？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          delVideo(item.stream).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.init();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>


<style scoped>
.el-pagination {
  text-align: right;
  margin-right: 10px;
  margin-top: 6px;
}
</style>