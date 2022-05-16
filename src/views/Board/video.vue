<template>
  <div id="board-video">
    <div class="left">
      <videoCom :stream="stream"  :videoObj="leftObj" />
    </div>
    <div class="right">
      
      <ul>
        <li
          v-for="(item, index) in videoArr"
          :key="index"
          :title="item.name"
          :class="activeLi == index ? 'activeLi' : ''"
           @click="changeLeft(item, index)"
        >
          <i class="el-icon-video-play"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getVideo } from "@/api/board";
import videoCom from "../../components/video/index";
export default {
  props:["city"],
  components: {
    videoCom,
  },
  data() {
    return {
      ftpUrl: window.globalUrl.FTP_URL,
      videoArr: [],
      activeLi: 0,
      leftObj: {},
      videourl: "",
      loadText: "",
      stream:null,
    };
  },
  mounted() {
  },
  watch:{
    city(val){
      this.initVideo(val);
    }
  },
  methods: {
    initVideo(name) {
      getVideo({name:name}).then((res) => {
        if (res.success && res.body.total > 0) {
          this.videoArr = res.body.list;
          this.leftObj = res.body.list[0];
          this.stream = res.body.list[0].stream;
        }
      });
    },
    changeLeft(item, index) {
      this.videourl = "";
      this.leftObj = item;
      this.stream = item.stream;
      this.activeLi = index;
    },
  },
};
</script>

<style scoped lang="less" >
#board-video {
  height: calc(100% - 37px);
  width: 100%;
  padding: 14px 18px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .left {
    background: url("../../assets/images/board-videobg.png") no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 70%;
    font-size: 12px;
    box-sizing: border-box;
    padding: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2%;
      p {
        color: #68cbff;
        margin: 0;
        display: inline-block;
      }
    }
    .video {
      width: 100%;
      height: 100%;
    }
    .iframePage {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .iframeFullScreen {
      position: absolute;
      margin: auto;
      bottom: 0;
      font-size: large;
      height: 27px;
      width: 100%;
      text-align: right;
      background-color: rgba(43, 51, 63, 0.7);
      i {
        color: white;
      }
    }
  }
  .right {
    position: absolute;
    width: 26%;
    right: 14px;
    top: 14px;
    height: calc(100% - 27px);
    ul {
      height: 100%;
      overflow-y: auto;
      padding: 0;
      padding-right: 6px;
      margin: 0;
      li {
        list-style: none;
        color: #fff;
        width: 100%;
        padding: 5px 2px;
        cursor: pointer;
        font-size: 13px;
        i {
          margin-right: 3px;
        }
        // img {
        //   width: 80%;
        //   height: 90%;
        //   border: 2px solid transparent;
        //   cursor: pointer;
        // }
      }
      li:hover {
        color: #31ccdd;
      }
      .activeLi {
        color: #31ccdd;
      }
    }
  }
  /deep/::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
    cursor: pointer;
  }
  /deep/::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(78, 127, 175, 0.8);
  }
  /deep/::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(151, 129, 129, 0.2);
    border-radius: 4px;
    background: transparent;
  }
}
.text {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 15px;
  color: #a7b0b8;
  background: black;
  span {
    margin-top: 30%;
    display: inline-block;
  }
}
</style>
