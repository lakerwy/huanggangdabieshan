<template>
  <el-dialog
    v-model="showVideoFlag"
    width="100%"
    :before-close="dialogClose"
    :title="'视频展示-' + videoCity"
    custom-class="dialog-video4"
  >
    <el-form inline>
      <el-form-item label="园区：">
        <el-select v-model="videoCity">
          <el-option
            v-for="(item, ind) in citys"
            :key="ind"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="total > 4" label="操作：" width="100px">
        <el-pagination
          layout="prev, next"
          prev-text="上一页"
          next-text="下一页"
          :current-page="page"
          :page-size="pageSize"
          @prev-click="changePage"
          @next-click="changePage"
          :total="total"
        >
        </el-pagination>
        <p style="margin: 0; text-indent: 150px; color: #fff">
          共<b> {{ total }} </b>个视频
        </p>
      </el-form-item>
    </el-form>
    <ul v-if="videoArr.length" class="arr">
      <li
        v-for="(item, index) in videoArr"
        :key="index"
        style="height: 50%; width: 50%"
      >
        <videoCom
          :stream="item.stream"
          :videoObj="item"
          :index="index"
          ref="video"
          v-if="showVideoFlag"
        />
      </li>
    </ul>
  </el-dialog>
</template>
<script>
import videoCom from "../../components/video/index";
import { getVideo, getVideoRegion } from "@/api/board";

export default {
  props: ['city'],
  components: {
    videoCom
  },
  data() {
    return {
      showVideoFlag: false,
      videoArr: [],
      dialogFull: false,
      citys: [],
      videoCity: null,
      showVideo: false,
      total: 10,
      pageSize: 4,
      page: 1,
      cityName: ''
    }
  },
  watch: {
    videoCity(val) {
      if (val) {
        this.page = 1;
        this.getArr();
      }
    },
    city(val) {
      this.videoCity = val;
      this.page = 1;
      this.getArr(val);
    }
  },
  created() {
    this.initVideoRegion();
  },
  methods: {
    changePage(val) {
      this.page = val;
      this.getArr();
    },
    getArr() {
      this.videoArr = [];
      getVideo({ name: this.videoCity, page: this.page, pageSize: this.pageSize }).then(res => {
        if (res.success && res.body.total > 0) {
          this.total = res.body.total;
          this.videoArr = res.body.list;
        }
      })
    },
    initVideoRegion() {
      getVideoRegion().then((res) => {
        if (res.body.length && res.success) {
          this.citys = res.body
        }
      });
    },
    dialogClose() {
      this.showVideoFlag = false;
    }
  }
}

</script>
<style lang="less" scoped>
.arr {
  height: 100%;
  margin: 0;
  padding: 0 2px;
  box-sizing: border-box;
  overflow: hidden;
  li {
    float: left;
    list-style: none;
    box-sizing: border-box;
    padding: 2px;
  }
}
/deep/.el-input {
  .el-input__suffix {
    top: -5px;
  }
}
/deep/.el-input__inner {
  color: #fff;
  background-color: #061a2e;
  border: 1px solid #0f70a1;
  height: 28px;
  line-height: 28px;
  padding-right: 26px;
  padding-left: 10px;
}
.el-form {
  position: absolute;
  top: 10px;
  margin-left: 20px;
  /deep/.el-form-item__label {
    color: #fff;
  }
  /deep/.el-select {
    width: 200px;
  }
}
/deep/.el-pagination {
  position: absolute;
  top: 4px;
  left: 10px;
  .btn-prev {
    margin-right: 10px !important;
  }
}
</style>