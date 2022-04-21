<template>
  <ContentBox
    class="box3"
    :headName="'景区流量'"
    @click.native="setThematicIndex('JQRLT')"
  >
    <section class="scen-header">
      <div>
        <span>{{ currentDate }} 入区总人数</span>
      </div>
      <div class="num">
        <span class="num-num">{{ numTotal }}</span
        ><span>人</span>
      </div>
    </section>
    <section class="table-container">
      <TourTable :tableData="tableData"></TourTable>
    </section>
  </ContentBox>
</template>
<script>
import ContentBox from "../../../components/box/index";
import { mapMutations } from "vuex";
import { TourTable } from "../../../components/divTable";
import { touristData } from "../../../../tests/data/homeData";
import { getTouristShow } from "../../../api/home";
export default {
  components: {
    TourTable,
    ContentBox
  },
  data() {
    return {
      currentDate: "",
      numTotal: 0,
      tableData: []
    };
  },
  mounted() {
    this.getTourist();
    setInterval(() => {
      this.getTourist();
    }, 1000 * 60);
  },
  methods: {
    ...mapMutations(["setThematicIndex"]),
    getTiemShow() {
      let date = new Date();
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      return `${month}月${day}号`;
    },
    async getTourist() {
      this.numTotal = 0;
      this.tableData = [];
      this.currentDate = this.getTiemShow();
      let res = null;
      if (process.env.NODE_ENV === "test") {
        res = touristData;
      } else {
        res = await getTouristShow();
      }
      if (res.code == 200 && res.data) {
        this.numTotal = res.data.total;
        this.tableData = res.data.detail;
      }
    }
  }
};
</script>
<style scoped lang="less">
.box3 {
  .scen-header {
    background: url("../../../assets/images/组 68.png") no-repeat;
    background-size: cover;
    height: 57px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    position: relative;
    font-size: 16px;

    .num {
      margin-left: 64px;

      .num-num {
        font-family: DINNextW1G;
        font-size: 36px;
        font-weight: bold;
        margin-right: 13px;
      }
    }
  }
  .table-container {
    padding: 0 10px;
    height: 200px;
  }
}
</style>
