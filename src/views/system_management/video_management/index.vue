<template>
  <div class="list">
    <div class="top_left" style="margin-bottom: 10px">
      <el-button type="primary" icon="el-icon-plus" @click="dealVideo('add')"
        >新增摄像头
      </el-button>
    </div>

    <el-table
      :data="ary"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f2f6f7', color: '#71809a' }"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="摄像头名称"> </el-table-column>
      <el-table-column prop="latitude" label="纬度"> </el-table-column>
      <el-table-column prop="longitude" label="经度"> </el-table-column>
      <el-table-column prop="position" label="地理位置"> </el-table-column>
      <el-table-column prop="stream" label="设备号"> </el-table-column>
      <!-- <el-table-column prop="streamType" label="设备类型"> </el-table-column> -->
      <!-- <el-table-column prop="videoTypeName" label="视频名称"> </el-table-column> -->
      <el-table-column prop="video_type" label="视频类型">
        <template #default="{ row }">
          {{ row.video_type == 0 ? "视频流" : "播放地址" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
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
    <el-dialog
      v-model="showVideoFlag"
      width="36%"
      :before-close="dialogClose"
      title="视频详情"
    >
      <player
        v-if="videoType == 0 && videourl"
        class="player"
        style="height: 400px"
        ref="videoPlayer"
        :videoUrl="videourl"
        fluent
        autoplay
        live
      ></player>
      <div style="width: 100%; height: 100%">
        <iframe
          ref="iframe1"
          v-if="videoType == 3 && videourl"
          :src="videourl"
          frameborder="0"
          style="width: 100%; height: 400px"
          @click="openIframe"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getVideo, delVideo, playerVideo } from "_api/tree";
import addVideo from "./addVideo.vue";
import player from "./EasyPlayer";

export default {
  components: {
    addVideo,
    player
  },
  data() {
    return {
      videourl: "",
      ary: [],
      currentObj: {},
      abouttype: "",
      params: {
        page: 1,
        count: 10,
      },
      total: 0,
      showEditAdd: false,
      showVideoFlag: false,
      //   addelCollections,
    };
  },
  mounted() {
    // let _this = this;
    // this.$nextTick(() => {
    //   if (_this.$refs.iframe1) {
    //     _this.$refs.iframe1.onclick = function () {
    //       if (_this.mouseE.isClick) {
    //       }
    //     } 
    //   }
    // })
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
    dialogClose() {
      // if (this.$refs.videoPlayer) {
      //   this.$refs.videoPlayer.pause();
        this.videourl = '';
      // }
      this.showVideoFlag = false;
    },
    detailsVideo(row) {
      this.videoType = row.video_type;
      if (row.video_type == 3) {
        this.showVideoFlag = true;
        this.videourl = row.url;
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
        this.currentObj = {};
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
        .catch(() => { });
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