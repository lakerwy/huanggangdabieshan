<template>
  <div
    :class="{'avue--collapse':isCollapse}"
    class="avue-contail">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top/>
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar/>
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags/>
        <!-- 主体视图层 -->
        <div style="height:100%;overflow-y:auto;overflow-x:hidden;"
             id="avue-view">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import tags from './tags'
  import top from './top/'
  import sidebar from './sidebar/'
  import admin from '@/util/admin'
  import {getStore} from '@/util/store.js'

  export default {
    name: 'Index',
    // provide() {
    //   return {
    //     Index: this
    //   };
    // },
    components: {
      top,
      tags,
      sidebar
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
      // 实时检测刷新token
      this.refreshToken()
    },
    destroyed() {
      clearInterval(this.refreshTime)
      clearInterval(this.timer)
      /*
      * 默认关闭websocket，如需工作流通知，则开启
      * this.disconnect()
      */

    },
    mounted() {
      this.init()
    },
    computed: mapGetters(['userInfo', 'leftmenu', 'isLock','screen', 'isCollapse', 'website', 'expires_in']),
    methods: {
      openMenu(item = {}, flag) {
        this.$store.dispatch("GetMenu",{type: true,id: item.id}).then(data => {
            if (data.length !== 0) {
                this.$router.$avueRouter.formatRoutes(data, true);
                // this.$router.$avueRouter.formatRoutes(data, flag);
            }
        });
      },
      getLeftMenu(item = {}, flag) {
        // 刷新页面时加载左侧所有的菜单
        this.$store.dispatch("GetLeftMenu",{type: true,id: item.id})
      },
      openLeftFirstMenu(item = {}) {
        // 点击头部menu加载第一项
        this.$store.dispatch("GetLeftMenu",{type: true,id: item.id}).then(() => {
          this.$router.push({path: this.leftmenu[0].path});
        })
      },
      // 屏幕检测
      init() {
        this.$store.commit('SET_SCREEN', admin.getScreen())
        window.onresize = () => {
          setTimeout(() => {
            this.$store.commit('SET_SCREEN', admin.getScreen())
          }, 0)
        }
      },
      // 实时检测刷新token
      refreshToken() {
        this.refreshTime = setInterval(() => {
          const token = getStore({
            name: 'access_token',
            debug: true
          })
          if (this.validatenull(token)) {
            return
          }
          if (this.expires_in <= 1000 && !this.refreshLock) {
            this.refreshLock = true
            this.$store
              .dispatch('RefreshToken')
              .catch(() => {
                clearInterval(this.refreshTime)
              })
            this.refreshLock = false
          }
          this.$store.commit('SET_EXPIRES_IN', this.expires_in - 10)
        }, 10000)
      },
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect()
        }
      }
    }
  }
</script>
