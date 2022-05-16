<template>
  <div class="files-management">
    <div class="page-content">
      <div class="content">
        <div class="content-up">
          <div>
            <img
              src="../../../assets/images/序厅.png"
              style="wid: 762px; height: 430px"
            />
          </div>
          <div class="content-up-right">
            <img src="../../../assets/images/shu.png" alt="" />
            <span class="text">地质博物馆简介</span>
            <div class="line"></div>
            <div class="content-up-right-text">
              <div>
                湖北黄冈大别山地质地质公园博物馆位于黄冈经济开发区明珠大道与新港二路交汇处西北侧。博物馆占地面积1300平方米，总建筑面积近4000平方米。
              </div>
              <div>
                黄冈大别山地质公园博物馆设立了地球的故事、中国的脊梁、巍巍大别山、水草丰饶天然乐土（大别山生态园）、人杰地灵
                昂扬激荡（大别山名人馆）、天工开物（地质标本精华厅）、我是地质小博士、多功能厅、临展厅等八个陈展单元。
              </div>
              <div>
                黄冈大别山地质公园博物馆采用图片、文字、模型、实物、三维动画、AR互动演示、电子地图、地理信息系统
              </div>
              <div>
                等多种形式，全方位向游客介绍公园内的地质知识和相关的其他景观，使其成为了解湖北黄冈大别山地质公园的窗口，为游客到园区旅游观光提供导航服务；同时，通过经常性开展地学科普教育活动，引导广大青少年学习地球科学知识，达到认识地球、了解地球、保护地球的功能作用，提高广大青少年的科学素养，为促进黄冈经济社会发展提供支持。
              </div>
              <div>
                7月15日，黄冈大别山地质公园博物馆地质科普展暨新馆开馆仪式在黄冈大别山地质公园博物馆举行，同时正式成为中国地质博物馆黄冈分馆。
              </div>
              <div>
                中国地质博物馆馆长贾跃明宣布黄冈大别山地质公园博物馆新馆落成开馆，
              </div>
              <div>
                黄冈市市委书记、市人大常委会主任刘雪荣致辞，中国地质博物馆副馆长王玲宣布同意黄冈大别山地质公园博物馆为中国地质博物馆黄冈分馆的函，黄冈市副市长余友斌主持。
              </div>
            </div>
          </div>
        </div>
        <div class="content-down">
          <div class="content-down-right">
            <img src="../../../assets/images/shu.png" alt="" />
            <span class="text">地质博物馆功能</span>
            <div class="line"></div>
            <div class="imgRouter">
              <div @click="goTo('/geological_museum/exhibitionManagement')">
                <img src="../../../assets/images/展厅管理.png" alt="" />
              </div>
              <div @click="goTo('/geological_museum/samples')" style="margin: 0 35px">
                <img src="../../../assets/images/馆藏标本.png" alt="" />
              </div>
              <div @click="goTo('/geological_museum/scienceTweet')">
                <img src="../../../assets/images/科普推文.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <myFooter />
      </div>
    </div>
  </div>
</template>

<script>
import myFooter from "_com/footer/index.vue";
export default {
  components: {
    myFooter,
  },
  methods: {
    //   点击展厅管理进入详情页面
    goTo(name) {
      this.$router.push({ path: name })
    },
  },
};
</script>

<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.files-management {
  height: calc(100% - 73px);
  text-align: left;
  .page-content {
    margin: 0 0 0 0;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    .content {
      margin-top: 30px;
      margin-left: 142px;
      position: relative;
      &-up {
        display: flex;
        &-right {
          margin-left: 40px;
          position: relative;
          .text {
            width: 112px;
            height: 15px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 48px;
            letter-spacing: 0px;
            color: #13a36e;
            position: absolute;
            top: -15px;
            left: 45px;
          }
          .line {
            width: 736px;
            height: 7px;
            background-color: #13a36e;
            opacity: 0.2;
            position: absolute;
            top: 15px;
            left: 40px;
          }
          &-text {
            width: 774px;
            height: 373px;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #666666;
            margin-top: 10px;
            div {
              text-indent: 25px;
            }
          }
        }
      }
      &-down {
        display: flex;
        &-right {
          margin-top: 20px;
          position: relative;
          .text {
            width: 112px;
            height: 15px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 48px;
            letter-spacing: 0px;
            color: #13a36e;
            position: absolute;
            top: -15px;
            left: 45px;
          }
          .line {
            width: 1537px;
            height: 7px;
            background-color: #13a36e;
            opacity: 0.2;
            position: absolute;
            top: 15px;
            left: 40px;
          }
          .imgRouter {
            margin-top: 20px;
            display: flex;
            div {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
