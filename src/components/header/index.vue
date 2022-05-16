<template>
  <div class="header">
    <div class="left">
      <div class="title">
        <img src="imgs/logo.png" alt="" class="logo" />
        <span>{{title}}</span>
      </div>
      <div class="menus">
        <div
          class="menu-name"
          :class="{ active: $route.path.split( '/').indexOf(item.path) > 0 }"
          v-for="(item, index) in menus"
          :key="item.id"
          @click="change(item, index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="user" v-if="userInfo.username">
      <el-dropdown @command="handleCommand">
        <div class="photo">
          <span style="color: #fff">欢迎您，{{ userInfo.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="user" v-else>
      <span @click="login">登录</span>
      <!-- <span>立即注册</span> -->
    </div>
  </div>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mapGetters, useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { getTopMenu } from '_api/system'
import { getMenu } from '@/api/admin/menu'

export default defineComponent({
  name: 'myHeader',
  computed: {
    ...mapGetters(['userInfo']),
  },
  data() {
    return { 
      menus: [],
      currentIndex: '',
      title:window.globalUrl.Title
    }
  },
  setup() {
    // 在setup中 里面没有访问 this，所以我们不能再直接访问 this.$router 或 this.$route。作为替代，我们使用 useRouter 函数和useRoute()
    const store = useStore();
    const router = useRouter();
    const login = () => {
      router.push({ path: '/login' })
    }

    const handleCommand = (command) => {
      // 下拉菜单点击
      // 退出登录
      ElMessageBox.confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear();
        store.dispatch('LogOut');
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 1000);
      }).catch(() => {

      });
    }
    return {
      handleCommand,
      login
    }
  },
  created() {
    this.initMenu();
    this.currentIndex = this.$route.path;
  },
  methods: {
    change(item) {
      sessionStorage.setItem('top-menu-id', item.id);
      sessionStorage.setItem('top-menu-path', item.path);
      this.currentIndex = item.path;
      this.$store.dispatch("GetLeftMenu", { type: true, id: item.id }).then(data=>{
        if (data.length > 0) {
          this.$router.push({ path: '/' + item.path + '/' + data[0].path })
        } else {
          this.$router.push({ path: '/' + item.path })
        }
      })
    },
    async initMenu() {
      let res = await getTopMenu();
      if (res.code == 0 && res.data.length > 0) {
        let arr = []
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          if (element.path == this.$route.name) {
            sessionStorage.setItem('top-menu-id', element.id);
            sessionStorage.setItem('top-menu-path', element.path);
          }
          arr.push(element);
        }
        this.menus = arr;
      }
    }
  }
})
</script>


<style lang="less" scoped>
.header {
  padding: 0 24px 0 22px;
  // width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  .left {
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    color: #ffffff;
    font-weight: 600;
    line-height: 55px;
    .logo {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .menus {
    text-align: center;
    height: 100%;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-left: 150px;
    .menu-name {
      line-height: 55px;
      min-width: 80px;
      cursor: pointer;
      color: #feffff;
      font-size: 14px;
      margin-right: 32px;
      height: 50px;
    }
    .active {
      border-bottom: 2px solid #fff;
    }
  }
  .user {
    width: 140px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    line-height: 55px;
    color: #ffffff;
    text-align: right;
    span {
      cursor: pointer;
    }
    span:first-child {
      margin-right: 38px;
    }
  }
}
</style>