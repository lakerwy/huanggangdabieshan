<!--
 * @Author: 任继民
 * @Date: 2021-03-02 14:03:10
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-16 09:47:08
 * @Description: 综合运营主页
-->
<template>
  <div id="app">
    <!-- <Layout v-bind="$attrs"> -->
    <Header />
    <router-view />
    <MajorWarn />
    <!-- </Layout> -->
  </div>
</template>
<script>
// import Layout from "./layout/index";
import Header from "./components/Header/index";
import MajorWarn from "./views/mask/majorWarn";
export default {
  components: {
    // Layout,
    Header,
    MajorWarn
  },
  data() {
    return {};
  },
  mounted() {
    document.title = "综合运营展示系统";    
  }
};
</script>
<style lang="scss">
@import url("./assets/scss/common.scss");
#app {
  font-family: MicrosoftYaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* position: relative; */
}
</style>
