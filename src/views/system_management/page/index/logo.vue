<template>
  <div class="avue-logo">
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <span
          key="1"
          class="avue-logo_title" @click="goIndex">
          <img style="width: 80%;margin-top: 32px;" :src="logoSrc" alt="">
          <!-- <img style="width: 80%;margin-top: 32px;" src="img/logo-m.png" alt=""> -->
        </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  data() {
    return {
      logoSrc: window.pageConfiguration.homeLogo
    }
  },
  computed: {
    ...mapGetters(['website', 'keyCollapse'])
  },
  methods: {
    goIndex: function () {
      // window.location.href = '/' // 没有首页，不用跳转
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  // height: 64px;
  // line-height: 64px;
  height: 120px;
  line-height: 120px;
  // background-color: #20222a;
  background-color: #3e57dd;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 16px;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
