<template>
  <div class="left">
    <div class="left_top">
      <div class="more">
        <img
          :src="imgSrc"
          alt=""
          @click="showHistory = !showHistory"
          style="width:22px;height:22px;"
        />
      </div>
      <div class="input">
        <el-input
          v-model="postParams.data.name"
          @focus="showHistory = true"
          @input="showHistory = false"
          @blur="blur"
        >
          <template #suffix>
            <i
              style="
                margin-top: 7px;
                margin-right: 10px;
                font-size: 25px;
                cursor: pointer;
              "
              class="el-icon-close"
              @click="clearValue"
            ></i>
          </template>
        </el-input>
      </div>
      <div class="search" @click="searchDesc">
        <img src="imgs/image_onemap/icon_serchbtn.png" alt="" />
      </div>
    </div>
    <div class="search_history" v-if="showHistory">
      <ul class="list_icon">
        <li v-for="item in listIcon" :key="item.id" @click="listSearch(item)">
          <img :src="item.src" alt="" />
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div class="left_content" v-if="pagTotal>0">
      <div class="total">
        当前共查询到<span class="span">{{ pagTotal }}</span
        >个
        <div class="addRes" v-if="false">
          <img src="imgs/image_onemap/icon_add.png" alt="" />
          新增遗迹
        </div>
      </div>
      <div class="list_con">
        <div
          class="list_item"
          v-for="(item, index) in list"
          :key="item.id"
          :class="selectIndex == index ? 'active' : ''"
          @click="changeSelect(item, true, index)"
        >
          <div class="list_info">
            <div class="title">
              <i></i>
              {{ item.name }}
            </div>
            <div class="message">
              <span>地理位置 </span> {{ item.position }}
            </div>
          </div>
          <div class="list_img">
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          :pager-count="3"
          @current-change="handleCurrentChange"
          :current-page="postParams.data.page"
          layout="prev, pager, next, jumper"
          :page-size="postParams.data.pageSize"
          :total="pagTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, inject } from "vue";
import { getOnemapTypesInfo } from "../../../api/remain";

import { useStore } from "vuex";
import * as mapHanlder from "../mapHanlder";

export default defineComponent({
  setup(props, context) {
    const imgSrc = ref("imgs/image_onemap/icon_more.png");
    const store = useStore();
    const list = ref([]);
    const listIcon = ref([
      {
        id: 1,
        title: "视频点",
        src: "imgs/image_onemap/serch_video.png",
        checked: false,
        type: 3,
      },
      {
        id: 2,
        title: "遗迹点",
        src: "imgs/image_onemap/serch_relic.png",
        checked: false,
        type: 2,
      },
      {
        id: 3,
        title: "景点",
        src: "imgs/image_onemap/serch_museum.png",
        checked: false,
        type: 1,
      },
      {
        id: 4,
        title: "监测点",
        src: "imgs/image_onemap/serch_super.png",
        checked: false,
        type: 4,
      },
      // {
      //   id: 5,
      //   title: "景区分布",
      //   src: "imgs/image_onemap/icon_serch5.png",
      //   checked: false,
      //   type: "",
      // },
      // {
      //   id: 6,
      //   title: "路线规划",
      //   src: "imgs/image_onemap/icon_serch6.png",
      //   checked: false,
      //   type: "",
      // },
    ]);
    const postParams = reactive({
      data: {
        page: 1,
        name: "",
        pageSize: 7,
        type: 0
      }
    });

    //显示隐藏搜索面板历史
    const searchValue = ref("");
    const showHistory = ref(false);
    //历史记录功能
    const clearValue = () => {
      postParams.data.name = "";
      postParams.data.type = 0;
      pagTotal.value = 0;
      imgSrc.value = "imgs/image_onemap/icon_more.png";
    };
    //清楚地图上的标记
    const clearPoint = () => {
      if (!store.state.isEarth) {
        mapHanlder.clearDmOnMap({
          component: store.state.component,
        });
      }
    };
    //分类点击
    const listSearch = (item)=>{
      postParams.data.type = item.type;
      // imgSrc.value = item.src;
      // showHistory.value = false;
      // store.state.component.goCoordinate([parseFloat(item.longtitude), parseFloat(x.wd)],13)
      // getOnemapPage();
    }

    const searchDesc = () => {
      if (postParams.data.name == "") {
        postParams.data.page = 1;
        getOnemapPage();
        return;
      }
      getOnemapPage();
    };
    const blur = () => {
      setTimeout(() => {
        showHistory.value = false;
      }, 250);
    };

    //选择卡片功能
    // const updateLocation = inject("updateLocation");
    const selectIndex = ref(0);
    const changeSelect = (item, isClick, i) => {
      selectIndex.value = i;
      // updateLocation(false, item.id);
      if (!store.state.isEarth) {
        mapHanlder.viewDmOnMap({
          component: store.state.component,
          data: item,
          lonKey: "longitudeNumber",
          latKey: "latitudeNumber",
          isClick: isClick,
        });
      } else {
        context.emit("addThreeEarthPop", item);
      }
    };

    //历史搜索
    const historySearch = (item) => {
      searchValue.value = item;
      getOnemapPage(1, searchValue.value);
    };
    //查询分页信息
    const imgUrl = window.globalUrl.FTP_URL;
    const detailImg = ref("imgs/detail_img2.png");
    const pagTotal = ref(0);
    const getOnemapPage = async () => {
      let res = await getOnemapTypesInfo(postParams.data);
      if (res.success && res.body.total>0) {
        pagTotal.value = res.body.total;
        list.value = res.body.list.map((item) => {
          let img = detailImg.value;
          return {
            ...item,
            img: img,
          };
        });
      }else{
        pagTotal.value=0;
        list.value=[];
      }
      showHistory.value = false;
    };
    const handleCurrentChange = (val) => {
      postParams.data.page = val;
      getOnemapPage();
    };
    return {
      blur,
      searchValue,
      showHistory,
      historySearch,
      changeSelect,
      clearValue,
      searchDesc,
      list,
      listIcon,
      pagTotal,
      handleCurrentChange,
      selectIndex,
      clearPoint,
      postParams,
      imgSrc,
      listSearch
    };
  },
});
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.left {
  z-index: 12;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  position: absolute;
  top: 100 / @vh;
  right: 37 / @vw;
  .left_top {
    width: 447 / @vw;
    height: 48 / @vh;
    background-color: #ffffff;
    border: 1px solid #bfbfbf;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .more {
      padding: 0 17 / @vw;
      height: 22 / @vh;
      border-right: 1px solid #bfbfbf;
      img {
        cursor: pointer;
      }
    }
    .input {
      width: 348 / @vw;
      /deep/ .el-input__inner {
        border: 0;
        height: 30 / @vh;
      }
    }
    .search {
      height: 48 / @vh;
      cursor: pointer;
      img {
        height: 100%;
      }
    }
  }
  .search_history {
    position: absolute;
    width: 447 / @vw;
    margin-top: 12px;
    max-height: 424 / @vh;
    z-index: 10;
    border-bottom: 1px solid #bfbfbf;
    background-color: #ffffff;
    overflow: hidden;
    .list_icon {
      padding: 5 / @vw 0;
      li:hover {
        background-color: #f0fbff;
      }
      li {
        text-align: center;
        display: inline-block;
        width: 79 / @vw;
        height: 70 / @vh;
        font-size: 14 / @vw;
        margin-left: 27 / @vw;
        padding: 5 / @vw 0;
        p {
          margin: 0;
        }
        img {
          width: 42px;
          height: 38px;
        }
      }
    }
    .history {
      width: 398 / @vw;
      min-height: 170 / @vh;
      max-height: 350 / @vh;
      margin-top: 30 / @vh;
      margin-left: 33 / @vw;
      font-size: 14 / @vw;
      padding-bottom: 20 / @vh;
      overflow: hidden;
      > div {
        padding-left: 7 / @vw;
        font-weight: bold;
      }
      .history_li {
        li:hover {
          background-color: #e5f8ff;
        }
        li {
          width: 394 / @vw;
          height: 36 / @vh;
          display: flex;
          align-items: center;
          padding-left: 7 / @vw;
          margin-top: 13 / @vh;
          img {
            padding-right: 10 / @vw;
          }
          div {
            width: 338 / @vw;
          }
          i {
            font-size: 20 / @vw;
          }
        }
      }
    }
  }
  .left_content {
    width: 447 / @vw;
    height: 874 / @vh;
    margin-top: 13 / @vh;
    background-color: #ffffff;
    border: 1px solid #bfbfbf;
    position: relative;
    .total {
      margin-top: 25 / @vh;
      margin-left: 23 / @vw;
      height: 30 / @vh;
      line-height: 30 / @vh;
      color: #000000;
      font-size: 15 / @vw;
      .span {
        padding: 0 9px;
        color: #13a36e;
      }
      .addRes {
        float: right;
        padding-right: 29 / @vw;
        display: flex;
        align-items: center;
        color: #13a36e;
        cursor: pointer;
        img {
          padding-right: 5 / @vw;
        }
      }
    }
    .list_con {
      height: 727 / @vh;
      .list_item:nth-last-child(1) {
        border: 0;
      }
      .list_item:hover {
        background-color: #e5f9ff;
      }
      .active {
        background-color: #e5f9ff;
      }
      .list_item {
        margin-left: 16 / @vw;
        width: 400 / @vw;
        height: 103 / @vh;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        align-items: center;
        cursor: pointer;
        .list_info {
          width: 290 / @vw;
          div {
            padding: 10 / @vh 0;
            margin-left: 30 / @vw;
            color: #808080;
            font-size: 14 / @vw;
          }
          .title {
            margin-left: 8 / @vw;
            font-weight: bold;
            color: #333333;
            i {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 4px;
              background-color: #13a36e;
              margin-right: 10 / @vw;
            }
          }
          .message {
            span {
              margin-right: 8 / @vw;
            }
          }
        }
        .list_img {
          img {
            width: 96 / @vw;
            height: 64 / @vh;
          }
        }
      }
    }
    .pagination {
      margin-top: 20 / @vh;
      /deep/ li:not(.disabled).active {
        background-color: #13a36e;
        color: #fff;
      }
      /deep/ li:hover {
        color: #13a36e;
      }
    }
  }
}
</style>