<template>
  <div class="left">
    <div class="left_top">
      <div class="more">
        <img
          :src="imgSrc"
          alt=""
          @click="showHistory = !showHistory"
          style="width: 22px; height: 22px"
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
    <div class="left_content" v-if="pagTotal > 0">
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
          @click="changeSelect(item, index)"
        >
          <div class="list_info">
            <div class="title">
              <i></i>
              {{ item.name }}
            </div>
            <div class="message">
              <span>地理位置 </span> {{ item.data.position }}
            </div>
          </div>
          <!-- <div class="list_img">
            <img
              :src="item.data.image ? imgUrl + item.data.image : detailImg"
              alt=""
            />
          </div> -->
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
import { defineComponent, ref, reactive, inject, nextTick } from "vue";
import { getOnemapTypesInfo } from "../../../api/remain";
import { parseFromWK } from "wkt-parser-helper";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { getGeometry } from "@map/js/feature.js";

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
        type: 0,
      },
    });

    //显示隐藏搜索面板历史
    const searchValue = ref("");
    const showHistory = ref(false);
    //历史记录功能
    const clearValue = () => {
      // emit('closePopup');
      postParams.data.name = "";
      postParams.data.type = 0;
      pagTotal.value = 0;
      imgSrc.value = "imgs/image_onemap/icon_more.png";
      clearPoint();
    };
    //清楚地图上的标记
    const clearPoint = () => {
      if (!store.state.isEarth) {
        store.state.component.clearTrack();
        store.state.component.deleteVectorLayer('router_crack');
      }
      store.state.component.deleteVectorLayer("rightSearch");
      clearPop();
    };
    //分类点击
    const listSearch = (item) => {
      clearPoint();
      list.value = [];
      postParams.data.type = item.type;
      imgSrc.value = item.src;
      showHistory.value = false;
      getOnemapPage();
    };
    const showAround = inject('showAround');
    const searchDesc = () => {
      showAround(false);
      if (postParams.data.name == "") {
        postParams.data.page = 1;
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
    const selectIndex = ref(null);
    const changeSelect = (item, i) => {
      showAround(false);
      selectIndex.value = i;
      if (!store.state.isEarth) {
        //地图上线-轨迹
        if (item.geometryType == "MultiLineString" || item.geometryType == "LineString") {
          let params = {
            code: "router_crack",
            data: [item],
            name: item.name,
            // popTypes: "xhgl_crack",
            ready: () => {
              let param = {
                code: "router_crack",
                id: item.id,
              };
              store.state.component && store.state.component.showTrack(param);
            },
          };
          store.state.component && store.state.component.addJsonData(params);
          nextTick(() => {
            let param = {
              code: "router_crack",
              id: item.id,
              icons: item.type == 24 ? require("@/assets/images/crack1.png") : require("@/assets/images/crack2.png"),
              coordinates: item.coordinates
            };
            store.state.component && store.state.component.showTrack(param);
          });
        } else {
          //地图上点位
          let geometry = getGeometry({
            type: item.geometryType,
            coordinates: item.coordinates,
          });
          let coordiante = geometry.getFirstCoordinate();
          store.state.component.showFeatureInfoByCoordinate(coordiante, item);
        }

      } else {
        store.state.component.goEntityById("rightSearch", item.id);
      }
    };

    const clearPop = () => {
      store.state.component.clearSelectFeature();
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
      clearPop();
      let res = await getOnemapTypesInfo(postParams.data);
      if (res.success && res.body.total > 0) {
        let arr = res.body.list.map((item) => {
          let geojson = parseFromWK(item.layer);
          return {
            coordinates: geojson.coordinates,
            geometryType: geojson.type,
            type: item.type,
            name: item.name,
            id: item.id,
            data: item,
          };
        });
        // 列表
        list.value = arr;
        pagTotal.value = res.body.total;

        // 上图
        listOnMap(arr);
      } else {
        pagTotal.value = 0;
        list.value = [];

        clearPoint();

        ElMessage({
          message: "暂无数据！",
          type: "success",
        });
      }
      showHistory.value = false;
    };
    const listOnMap = (list) => {
      var params = {
        code: "rightSearch",
        name: "一张图-搜索",
        data: list,
        typeKey: "type",
        icons: {
          "1": require("@/assets/images/serch_museum.png"),
          "2": require("@/assets/images/serch_relic.png"),
          "3": require("@/assets/images/serch_video.png"),
          "4": require("@/assets/images/serch_super.png"),
          default: require("@/assets/images/serch_museum.png"),
        },
        hoverIcons: {
          "1": require("@/assets/images/serch_museum_hover.png"),
          "2": require("@/assets/images/serch_relic_hover.png"),
          "3": require("@/assets/images/serch_video_hover.png"),
          "4": require("@/assets/images/serch_super_hover.png"),
          default: require("@/assets/images/serch_museum_hover.png"),
        },
      };
      store.state.component.addJsonLayer(params);
    };
    const handleCurrentChange = (val) => {
      selectIndex.value = null;
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
      listSearch,
      detailImg,
      imgUrl,
    };
  },
});
</script>

<style lang="less" scoped>
.left {
  z-index: 12;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  position: absolute;
  top: 80px;
  right: 20px;
  .left_top {
    width: 447px;
    height: 48px;
    background-color: #ffffff;
    border: 1px solid #bfbfbf;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .more {
      padding: 0 17px;
      height: 22px;
      border-right: 1px solid #bfbfbf;
      img {
        cursor: pointer;
      }
    }
    .input {
      width: 348px;
      /deep/ .el-input__inner {
        border: 0;
        height: 30px;
      }
    }
    .search {
      height: 48px;
      cursor: pointer;
      img {
        height: 100%;
      }
    }
  }
  .search_history {
    position: absolute;
    width: 420px;
    margin-top: 12px;
    z-index: 10;
    border-bottom: 1px solid #bfbfbf;
    background-color: #ffffff;
    overflow: hidden;
    .list_icon {
      display: flex;
      justify-content: space-around;
      li:hover {
        background-color: #f0fbff;
      }
      li {
        text-align: center;
        display: inline-block;
        width: 79px;
        height: 70px;
        font-size: 14px;
        padding: 8px 0;
        cursor: pointer;
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
      width: 398px;
      min-height: 170px;
      max-height: 350px;
      margin-top: 30px;
      margin-left: 33px;
      font-size: 14px;
      padding-bottom: 20px;
      overflow: hidden;
      > div {
        padding-left: 7px;
        font-weight: bold;
      }
      .history_li {
        li:hover {
          background-color: #e5f8ff;
        }
        li {
          width: 394px;
          height: 36px;
          display: flex;
          align-items: center;
          padding-left: 7px;
          margin-top: 13px;
          img {
            padding-right: 10px;
          }
          div {
            width: 338px;
          }
          i {
            font-size: 20px;
          }
        }
      }
    }
  }
  .left_content {
    width: 447px;
    height: 700px;
    margin-top: 13px;
    background-color: #ffffff;
    border: 1px solid #bfbfbf;
    .total {
      margin-top: 18px;
      margin-left: 16px;
      height: 30px;
      line-height: 30px;
      color: #000000;
      font-size: 15px;
      .span {
        padding: 0 9px;
        color: #13a36e;
      }
      .addRes {
        float: right;
        padding-right: 29px;
        display: flex;
        align-items: center;
        color: #13a36e;
        cursor: pointer;
        img {
          padding-right: 5px;
        }
      }
    }
    .list_con {
      height: 580px;
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
        margin-left: 16px;
        width: 400px;
        height: 84px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        align-items: center;
        cursor: pointer;
        .list_info {
          width: 290px;
          div {
            padding: 5px 0;
            margin-left: 30px;
            color: #808080;
            font-size: 14px;
          }
          .title {
            margin-left: 8px;
            font-weight: bold;
            color: #333333;
            i {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 4px;
              background-color: #13a36e;
              margin-right: 10px;
            }
          }
          .message {
            span {
              margin-right: 8px;
            }
          }
        }
        .list_img {
          img {
            width: 96px;
            height: 64px;
          }
        }
      }
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
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
