<template>
  <ContentBox class="box3" :headName="'科普科教'">
    <section class="edulis">
      <div
        v-for="(item, index) in scedulist"
        :key="index"
        :class="{ sceduActive: sceduIndex == index }"
        @click="getSceduIndex(index)"
      >
        <span class="dot"></span>
        <span>{{ item.name }}</span>
      </div>
    </section>
    <section class="carousel">
      <el-carousel :interval="4000" type="card" indicator-position="none">
        <el-carousel-item v-for="(item, index) in popularList" :key="index">
          <div class="imgBox">
            <img :src="item.cover_image" :alt="item.title" srcset="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
  </ContentBox>
</template>
<script>
import ContentBox from "../../../components/box/index";
import { kpkjList } from "../../../../tests/data/homeData";
import { getKpkiList } from "../../../api/home";
export default {
  components: {
    // HeadLine
    ContentBox
  },
  data() {
    return {
      sceduIndex: 0,
      popularList: [],
      scedulist: [
        { name: "动物科普" },
        { name: "植物科普" },
        { name: "地质科普" },
        { name: "民俗科普" }
      ],
      classCode: ["kpkj_QG2D", "kpkj_qBMN", "kpkj_tY3K", "kpkj_2gLT"]
    };
  },
  created() {
    this.getKpkj(this.sceduIndex);
    setInterval(() => {
      this.getKpkj(this.sceduIndex);
    }, 1000 * 60);
  },
  methods: {
    getSceduIndex(index) {
      this.sceduIndex = index;
      this.getKpkj(index);
    },
    //科普科教
    async getKpkj(index) {
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = kpkjList[index];
      } else {
        res = await getKpkiList({
          category_code: this.classCode[index],
          pageNum: 1,
          pageSize: 9
        });
      }
      if (res.code == 200) {
        let urlData = res.data.map(item => {
          return {
            title: item.title,
            cover_image: item.cover_image,
            description: item.description,
            video_url: item.video_url,
            voice_url: item.voice_url
          };
        });
        this.popularList = [];
        this.popularList = urlData;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.box3 {
  .edulis {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #909199;
    font-size: 16px;
    margin-top: 5px;
    cursor: pointer;

    div {
      padding: 0 15px;

      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 6px;
        border-radius: 5px;
        background-color: #909199;
      }
    }

    .sceduActive {
      color: #68a9ff;

      .dot {
        background-color: #68a9ff;
      }
    }
  }

  .carousel {
    padding: 0 24px;
    margin-top: 15px;

    .el-carousel {
      ::v-deep.el-carousel__container {
        height: 200px;

        // .el-carousel__mask {
        //   background-color: rgba(color: #000000, $alpha: .7);
        // }

        .imgBox {
          position: relative;

          img {
            height: 200px;
          }

          .medium {
            margin: 0 auto;
            position: absolute;
            font-size: 24px;
            width: 100%;
            // height: 122px;
            // left: 10px;
            top: 40px;
          }
        }
      }
    }
  }
}
</style>
