<template>
  <!-- <layout /> -->
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
// import layout from './components/layout/index'

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
  // components: {
  //   layout
  // }
}
</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-align: left;
  /* margin-top: 60px; */
}
.el-button--primary {
  --el-button-font-color: #ffffff;
  --el-button-background-color: #0b7b8d;
  --el-button-border-color: #0b7b8d;
  --el-button-hover-color: #238a95;
  --el-button-active-font-color: #ffffff;
  --el-button-active-background-color: #0b7b8d;
  --el-button-active-border-color: #0b7b8d;
}
.green-confirm {
  background-color: #13a36e;
  border-color: transparent;
  color: #fff;
}
.green-confirm:hover,
.green-confirm:focus {
  color: #ffffff;
  border-color: transparent;
  background-color: #13a36e;
}
</style>
