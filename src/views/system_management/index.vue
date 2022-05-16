<template>
  <div class="avue-layout">
    <div class="avue-left">
      <!-- 左侧导航栏 -->
      <sidebar />
    </div>
    <div class="avue-main">
      <!-- 主体视图层 -->
      <tags/>
      <div
        style="height: 100%; overflow-y: auto; overflow-x: hidden"
        id="avue-view"
      >
        <keep-alive>
          <router-view class="avue-view" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view class="avue-view" v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import sidebar from './components/sidebar/';
import tags from './components/tags.vue';
export default {
  name: 'Index',
  provide() {
    return {
      Index: this
    };
  },
  components: {
    sidebar,
    tags
  },
  data() {
    return {
      // 刷新token锁
      refreshLock: false,
      // 刷新token的时间
      refreshTime: '',
      // 计时器
      timer: ''
    }
  },
  created() {
  },
  mounted() {
  },
  computed: mapGetters(['userInfo', 'leftmenu', 'isLock', 'screen', 'isCollapse', 'website', 'expires_in']),
  methods: {
    showCollapse() {
      // this.$store.commit('SET_COLLAPSE')
    },
    // openMenu(item = {}, flag) {
    //   this.$store.dispatch("GetMenu", { type: true, id: item.id }).then(data => {
    //     if (data.length !== 0) {
    //       this.$router.$avueRouter.formatRoutes(data, true);
    //       // this.$router.$avueRouter.formatRoutes(data, flag);
    //     }
    //   });
    // },
    getLeftMenu(item = {}, flag) {
      // 刷新页面时加载左侧所有的菜单
      this.$store.dispatch("GetLeftMenu", { type: true, id: item.id })
    },
    openLeftFirstMenu(item = {}) {
      // 点击头部menu加载第一项
      this.$store.dispatch("GetLeftMenu", { type: true, id: item.id }).then(() => {
        this.$router.push({ path: this.leftmenu[0].path });
      })
    },
  }
}
</script>
<style lang="less" scoped>
</style>