<template>
  <div class="top-menu">
    <el-menu
      class="my-menu"
      :default-active="activeIndex"
      mode="horizontal"
      text-color="#333">
      <template v-for="(item,index) in items" :key="index">
        <el-menu-item
          class="menu-item"
          :index="item.path"
          @click.native="openMenu(item, index)">
          <template slot="title">
            <!-- <i :class="item.icon"/> -->
            <img v-if="item.path == '/audit'" style="margin-top: 25px;" src="img/property.png" alt="">
            <img v-if="item.path == '/datamanage'" style="margin-top: 25px;" src="img/data.png" alt="">
            <img v-if="item.path == '/finance'" style="margin-top: 25px;" src="img/finance.png" alt="">
            <img v-if="item.path == '/announce'" style="margin-top: 25px;" src="img/publish.png" alt="">
            <img v-if="item.path == '/system'" style="margin-top: 25px;" src="img/system.png" alt="">
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopMenu',
  inject: ["Index"],
  data() {
    return {
      activeIndex: sessionStorage.getItem('topIndex') ? sessionStorage.getItem('topIndex').toString() : '0',
      items: [],
    }
  },
  created() {
    this.getTopMenu();
  },
  computed: {
    ...mapGetters(['menu', 'leftmenu'])
  },
  methods: {
    getTopMenu() {
      this.$store.dispatch("GetTopMenu").then(res => {
          this.items = res;
          // this.openMenu(this.items[0])
          let current = sessionStorage.getItem('topIndex') ? sessionStorage.getItem('topIndex') : 0;
          this.activeIndex = this.items[current].path;
          this.Index.getLeftMenu(this.items[current]);
      });
    },
    openMenu(item, index) {
      // this.Index.openMenu(item);
      sessionStorage.setItem('topIndex', index)
      // sessionStorage.removeItem('leftIndex');
      // this.Index.getLeftMenu(item);
      this.Index.openLeftFirstMenu(item);
    }
  }
}
</script>

<style lang="less" scoped>
.my-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    width: 195px;
    height: 100% !important;
}
</style>
<style lang="less" >
.menu-item {
  span {
    line-height: 38px !important;
  }
}
.my-menu {
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    outline: 0;
    color: #303133;
    background: rgba(255,255,255,0.2) !important;
  }
}
</style>
