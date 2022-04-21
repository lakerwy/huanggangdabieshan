<!--
 * @Author: 任继民
 * @Date: 2021-05-12 11:02:52
 * @LastEditors: 任继民
 * @LastEditTime: 2021-05-12 13:03:07
 * @Description: box
-->
<template>
  <section class="content-box boxbg">
    <div class="header">
      <div class="title">{{ headName }}</div>
      <div class="border-bottom"></div>
      <!--<img src="img/流光.png" alt="" srcset="">-->
    </div>
    <section>
      <slot />
    </section>
  </section>
</template>
<script>
export default {
  props: {
    headName: {
      type: String,
      default: "森林防火"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.content-box {
  text-align: center;
  width: 495px;
  height: 310px;
  margin-bottom: 10px;
  box-sizing: content-box;
  .header {
    .title {
      font-family: MicrosoftYaHei;
      font-size: 18px;
      font-weight: bold;
      color: #68a9ff;
      height: 30px;
      line-height: 30px;
    }
    .border-bottom {
      height: 1px;
      width: 100%;
      background-image: url("../../assets/images/流光.png");
      background-size: 100% 100%;
    }
  }
}
</style>
