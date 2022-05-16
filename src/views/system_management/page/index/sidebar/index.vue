<template>
  <div class="avue-sidebar">
    <el-scrollbar style="height:100%">
      <div
        v-if="validatenull(menu)"
        class="avue-sidebar--tip">没有发现菜单</div>
      <el-menu
        style="z-index: 5;"
        :default-active="nowTagValue"
        :show-timeout="200"
        :collapse="keyCollapse"
        unique-opened
        mode="vertical">
        <sidebar-item
          :menu="leftmenu"
          :screen="screen"
          :props="website.menu.props"
          :collapse="keyCollapse"
          first/>
      </el-menu>
      <img style="position: absolute;bottom: 0;width:100%;" src="img/bg/slider.png" alt="">
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '../logo'
import sidebarItem from './sidebarItem'
import { validatenull } from '@/util/validate'

export default {
  name: 'Sidebar',
  inject: ["Index"],
  components: { sidebarItem, logo },
  created() {
    this.Index.openMenu(this.menuId);
  },
  computed: {
    ...mapGetters(['website', 'menu', 'leftmenu', 'tag', 'keyCollapse', 'screen']),
    nowTagValue: function() {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  methods:{
    validatenull(val) {
      return validatenull(val)
    },
  }
}
</script>


