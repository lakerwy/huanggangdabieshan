<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div
        class="avue-breadcrumb">
      </div>
    </div>
    <div class="top-bar__title">
      <div
        v-if="showMenu"
        class="top-bar__item top-bar__item--show">
        <top-menu/>
      </div>
    </div>
    <div class="top-bar__right">
      <!-- <el-tooltip
        v-if="showColor"
        effect="dark"
        content="主题色"
        placement="bottom">
        <div class="top-bar__item">
          <top-color/>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip
        v-if="showDebug"
        :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`"
        effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <top-logs/>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip
        v-if="showLock"
        effect="dark"
        content="锁屏"
        placement="bottom">
        <div class="top-bar__item">
          <top-lock/>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip
        v-if="showTheme"
        effect="dark"
        content="特色主题"
        placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme/>
        </div>
      </el-tooltip> -->
      <el-tooltip
        v-if="showFullScreen"
        :content="isFullScreen?'退出全屏':'全屏'"
        effect="dark"
        placement="bottom">
        <div class="top-bar__item" style="margin-right:20px;line-height: 18px;height: 18px;">
          <i
            :class="isFullScreen?'icon-zuixiaohua':'icon-quanpingzuidahua'"
            @click="handleScreen"/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="userInfo.username"
        effect="dark"
        content="用户头像"
        placement="bottom">
        <img
          id="thumbnail"
          :src="avatarSrc"
          class="top-bar__img">
          <el-upload
            :headers="headers"
            :show-file-list="false"
            :data="{id: userInfo.id}"
            name="avatar"
            :before-upload="handleAvatarBeforeUpload"
            :on-success="handleAvatarSuccess"
            :action="action"
          >
            <img v-if="avatarSrc" class="top-bar__img" id="avatar" title="更换头像" :src="avatarSrc" />
            <i v-else title="上传头像" class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="$refs.seting.open()">界面设置
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout">退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting ref="seting"/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, handleImg, listenfullscreen } from '@/util/util'
import topLock from './top-lock'
import topMenu from './top-menu'
import topTheme from './top-theme'
import topLogs from './top-logs'
import topColor from './top-color'
import topSetting from './top-setting'
import {getAvatar} from '@/api/admin/user.js'
import { getStore, setStore } from "@/util/store";

export default {
  name: 'Top',
  components: {
    topLock,
    topMenu,
    topTheme,
    topLogs,
    topColor,
    topSetting
  },
  filters: {},
  data() {
    return {
      avatarSrc: '',
      headers: {
        Authorization: 'Bearer ' + getStore({name: 'access_token'})
      },
      action: `${window.globalUrl.HOME_API}admin/sys-file/userAvatar/update`,
    }
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScreen: state => state.common.showFullScreen,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      'userInfo',
      'isFullScreen',
      'tagWel',
      'tagList',
      'tag',
      'logsLen',
      'logsFlag'
    ])
  },
  created() {
    // handleImg(`${this.userInfo.username}`, 'thumbnail')
    this.initAvatar();
  },
  mounted() {
    listenfullscreen(this.setScreen)
  },
  methods: {
    initAvatar() {
      // 获取用户头像
      getAvatar(this.userInfo.username).then(res => {
        let {code, data} = res.data;
        if(code == 0) {
          this.avatarSrc = data;
        }
      })
    },
    handleAvatarBeforeUpload(file) {
      // 上传文件前
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 6;
      if (!isJPG) {
          this.$message.error('上传图片为 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 6MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res,file,filelist) {
      if(res.code == 0) {
        this.$message.success('更换头像成功！');
      } else {
        this.$message.error(res.msg);
      }
      this.initAvatar();
    },
    handleScreen() {
      fullscreenToggel()
    },
    setCollapse() {
      // this.$store.commit('SET_COLLAPSE')
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREEN')
    },
    logout() {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
            this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss">
.top-bar__right {
  .el-dropdown {
    height: 40px;
    line-height: 40px;
  }
  i {
    line-height: 0 !important;
  }
}
</style>
