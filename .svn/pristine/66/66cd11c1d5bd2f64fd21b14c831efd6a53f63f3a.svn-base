<template>
  <div class="container boxbg">
    <div class="border">
      <div
        v-if="localData && localData.infoType === 'camera'"
        class="camera-info"
      >
        <div class="video">
          <player
            class="player"
            ref="videoPlayer"
            :videoUrl="localData.url"
            fluent
            autoplay
            live
          ></player>
          <!--<video
            :src="localData.url"
            controls="controls"
            width="200px"
            height="110px"
          ></video>-->
        </div>
        <div class="info noWrap">
          <el-tooltip
            class="item"
            effect="light"
            :content="localData.name"
            placement="top"
          >
            <div class="title">{{ localData.name }}</div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="light"
            :content="localData.video_code"
            placement="top"
          >
            <div class="content noWrap">
              <span class="label">摄像机编号：</span>{{ localData.video_code }}
            </div>
          </el-tooltip>
          <div class="content">
            <span class="label">经度：</span
            >{{ localData.lon | coordinateFormate }}
          </div>
          <div class="content">
            <span class="label">纬度：</span
            >{{ localData.lat | coordinateFormate }}
          </div>
        </div>
      </div>
      <div
        v-if="data.infoType === 'person' && !routeTaskInfo"
        class="route-info"
      >
        <div class="route-info-header">
          <div class="title">巡护简报</div>
          <i class="el-icon-close icon" @click="close"></i>
        </div>
        <div class="separate-line"></div>
        <div class="content">暂无数据</div>
      </div>
      <div
        v-if="data.infoType === 'person' && routeTaskInfo"
        class="route-info"
      >
        <div class="route-info-header">
          <div class="title">巡护简报</div>
          <i class="el-icon-close icon" @click="close"></i>
        </div>
        <div class="separate-line"></div>
        <div class="route-info-item">
          <div class="row">
            <div class="content">
              <span class="label">巡护单位名称：</span
              >{{ routeTaskInfo.org_name }}
            </div>
          </div>
          <div class="row">
            <div class="left">
              <div class="content">
                <span class="label">开始时间：</span
                >{{ routeTaskInfo.begin_time | dateFormate }}
              </div>
              <div class="content">
                <span class="label">结束时间：</span
                >{{ routeTaskInfo.end_time | dateFormate }}
              </div>
              <div class="content">
                <span class="label">巡护类型：</span
                >{{ routeTaskInfo.task_type }}
              </div>
              <div class="content">
                <span class="label">里程（公里）：</span
                >{{ routeTaskInfo.patrol_length | meterToKilometer }}
              </div>
            </div>
            <div class="right">
              <div class="content">
                <span class="label">时间：</span
                >{{ routeTaskInfo.patrol_day | hourFormate }}小时
              </div>
              <el-tooltip
                class="item"
                effect="light"
                :content="routeTaskInfo.real_name"
                placement="top"
              >
                <div class="content noWrap">
                  <span class="label">成员：</span>{{ routeTaskInfo.real_name }}
                </div>
              </el-tooltip>
              <div class="content">
                <span class="label">审核状态：</span
                >{{ routeTaskInfo.check_status }}
              </div>
              <div class="content">
                <span class="label">巡护方式：</span
                >{{ routeTaskInfo.patrol_type }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="content">
              <span class="label">巡护路线：</span
              >{{ routeTaskInfo.route_name }}
            </div>
          </div>
          <div class="row">
            <div class="content">
              <span class="label">备注：</span>{{ routeTaskInfo.patrol_note }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.infoType === 'record'" class="record-info">
        <div class="record-left">
          <div
            class="img-container"
            id="images-gallery"
            v-if="showImgOrVideo === 1"
          >
            <ul>
              <li
                v-for="(item, index) in data.record_img"
                :key="index"
                @click="imageClickEvent"
              >
                <img class="img" :src="item" />
              </li>
            </ul>
          </div>

          <video
            v-if="showImgOrVideo === 2"
            :src="data.record_video ? data.record_video[0] : null"
            controls="controls"
            width="200px"
            height="110px"
          ></video>
          <div class="btn-bottom">
            <div @click="showImgOrVideoEvent(2)">
              <img src="img/icon_视频播放 .png" /> 视频播放
            </div>
            <div @click="showImgOrVideoEvent(1)">
              <img src="img/icon_图片查看.png" /> 图片查看
            </div>
          </div>
        </div>
        <div class="info">
          <el-tooltip
            class="item"
            effect="light"
            :content="data.record_desc"
            placement="top"
          >
            <div class="title">{{ data.record_desc }}</div>
          </el-tooltip>
          <div class="content">
            <img src="img/时间 开始时间.png" />{{
              data.record_time | dateFormate
            }}
          </div>
          <div class="content">
            <div>
              <img src="img/经纬度.png" />
            </div>
            <div>
              <div>经度：{{ data.lon | coordinateFormate }}</div>
              <div>纬度：{{ data.lat | coordinateFormate }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.infoType === 'warn'" class="warn-info">
        <div class="title">火灾</div>
        <div class="content">
          <span class="label">地点：</span>{{ data.locate_desc }}
        </div>
        <div class="content">
          <span class="label">详情：</span>{{ data.fire_info }}
        </div>
        <div class="content">
          <span class="label">经度：</span>{{ data.lon }}
        </div>
        <div class="content">
          <span class="label">纬度：</span>{{ data.lat }}
        </div>
        <div class="content">
          <span class="label">时间：</span>{{ data.begin_time | dateFormate }}
        </div>
      </div>
      <div v-if="data.infoType === 'water' || data.infoType === 'gas'" class="warn-info">
        <div class="title">{{data.shortName}}</div>
        <div class="content">
          <span class="label">名称：</span>{{ data.gatherStationName }}
        </div>
        <div class="content">
          <span class="label">地址：</span>{{ data.gatherStationAddress }}
        </div>
        <div class="content">
          <span class="label">经度：</span>{{ data.gatherStationLongitude }}
        </div>
        <div class="content">
          <span class="label">纬度：</span>{{ data.gatherStationLatitude }}
        </div>
        <div class="content">
          <span class="label">高程：</span>{{ data.gatherStationElevation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPatrolTaskRequest,
  getCameraUrlRequest
} from "../../../api/thematic";

import { routeTaskInfo } from "../../../../tests/data/fireHeat";
import player from "./easyPlayer";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  components: {
    player
  },
  data() {
    return {
      routeTaskInfo: null,
      showImgOrVideo: 1,
      localData: null,
      gallery: null
    };
  },
  created() {},
  mounted() {
    this.init();
    console.log(this.data);
  },
  filters: {
    dateFormate(value) {
      if (value) {
        return value.substr(0, 19).replace("T", " ");
      }
      return null;
    },
    coordinateFormate(value) {
      if (value) {
        return value.toFixed(6);
      }
      return null;
    },
    meterToKilometer(value) {
      if (value) {
        return (value / 1000).toFixed(2);
      }
      return null;
    },
    hourFormate(value) {
      if (value) {
        return (value / 1000 / 60 / 60).toFixed(2);
      }
      return null;
    }
  },
  watch: {
    data() {
      this.init();
    }
  },
  methods: {
    init() {
      if (this.data) {
        if (this.data.infoType === "person") {
          this.getRouteInfo();
        } else if (this.data.infoType === "camera") {
          this.getCameraUrl();
        } else if (this.data.infoType === "record") {
          this.showImgOrVideoEvent(this.showImgOrVideo);
        }
      }
    },
    async getRouteInfo() {
      let params = {
        staff_id: this.data.staff_id,
        task_id: this.data.task_id
      };

      let result = null;
      if (process.env.NODE_ENV === "test") {
        result = routeTaskInfo;
      } else {
        result = await getPatrolTaskRequest(params);
      }

      if (result.code == 200) {
        this.routeTaskInfo = result.data;
      }
    },
    async getCameraUrl() {
      this.localData = { ...this.data };

      let params = {
        // cameraCode: this.data.video_code
        stream: this.data.video_code
      };
      let result = await getCameraUrlRequest(params);

      if (result.code == 200 && result.data) {
        // this.localData = { ...this.data, url: result.data.url };
        this.localData = { ...this.data, url: result.data.flv };
      }
    },
    close() {
      this.$emit("close");
    },
    showImgOrVideoEvent(value) {
      this.showImgOrVideo = value;
      if (value === 1 && this.data.record_img.length) {
        this.$nextTick(() => {
          this.gallery = new Viewer(document.getElementById("images-gallery"));
        });
      }
    },
    imageClickEvent() {
      if (this.gallery) {
        this.gallery.show();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #142233;
  border: 1px solid #1ea3a5;
  .border {
    margin: -2px;
    background: linear-gradient(to left, #fcff1c, #fcff1c) left top no-repeat,
      linear-gradient(to bottom, #fcff1c, #fcff1c) left top no-repeat,
      linear-gradient(to left, #fcff1c, #fcff1c) right top no-repeat,
      linear-gradient(to bottom, #fcff1c, #fcff1c) right top no-repeat,
      linear-gradient(to left, #fcff1c, #fcff1c) left bottom no-repeat,
      linear-gradient(to bottom, #fcff1c, #fcff1c) left bottom no-repeat,
      linear-gradient(to left, #fcff1c, #fcff1c) right bottom no-repeat,
      linear-gradient(to left, #fcff1c, #fcff1c) right bottom no-repeat;
    background-size: 2px 24px, 24px 2px, 2px 24px, 24px 2px;
    padding: 12px 15px;

    .title {
      font-size: 18px;
      color: #fcff1c;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .noWrap {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .camera-info {
      display: inline-flex;
      align-items: center;
      .video {
        width: 200px;
        height: 110px;
      }
      .info {
        width: 145px;
        text-align: left;
        margin-left: 10px;
        .content {
          margin: 5px 0;
          font-size: 14px;
          color: #ffffff;
          .label {
            opacity: 0.62;
          }
        }
      }
    }

    .route-info {
      width: 450px;
      text-align: left;
      .route-info-header {
        display: flex;
        justify-content: space-between;
        .icon {
          color: #fff;
          font-size: 24px;
          cursor: pointer;
        }
      }
      .separate-line {
        width: 100%;
        height: 2px;
        border: none;
        border-top: 1px solid #1ea3a5;
        margin: 10px 0;
      }
      .content {
        margin: 3px 0;
        width: 100%;
        color: #fff;
        flex: 1;
        font-size: 14px;
        .label {
          color: #4471ad;
        }
      }

      .route-info-item {
        .row {
          display: flex;
          width: 100%;
          .left {
            width: 60%;
          }
        }
      }
    }

    .record-info {
      color: #fff;
      font-size: 14px;
      text-align: left;
      display: flex;
      .record-left {
        width: 200px;
        height: 120px;
        display: flex;
        justify-items: center;
        position: relative;
        .img-container {
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
        .btn-bottom {
          position: absolute;
          bottom: 0;
          height: 22px;
          width: 100%;
          display: inline-flex;
          > div {
            width: 50%;
            display: inline-flex;
            justify-content: center;
            background: rgba(0, 0, 0, 0.7);
            font-size: 10px;
            align-items: center;
            cursor: pointer;
            > img {
              margin-right: 5px;
            }
          }
        }
      }
      .info {
        margin-left: 10px;
        .content {
          display: flex;
          justify-items: center;
          margin: 5px 0;
          img {
            margin-right: 5px;
          }
        }
      }
    }

    .warn-info {
      text-align: left;
      padding: 10px;
      width: 300px;
      .content {
        font-size: 14px;
        color: #ffffff;
        word-break: break-all;
        .label {
          opacity: 0.62;
        }
      }
    }
  }
}
</style>
