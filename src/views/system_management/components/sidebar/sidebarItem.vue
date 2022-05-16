<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in newMenu">
      <el-menu-item
        v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
        :index="item[pathKey]"
        :key="item[labelKey]"
        :class="{ 'is-active': item.path == $route.name }"
        @click="open(item, index)"
      >
        <!-- <i :class="item[iconKey]"/> -->
        <span slot="title" :alt="item[pathKey]">{{ item[labelKey] }}</span>
      </el-menu-item>
      <el-submenu
        v-else-if="!validatenull(item[childrenKey]) && vaildRoles(item)"
        :index="item[pathKey]"
        :key="item[labelKey]"
      >
        <template slot="title">
          <!-- <i :class="item[iconKey]"/> -->
          <span
            slot="title"
            :class="{ 'el-menu--display': collapse && first }"
            >{{ item[labelKey] }}</span
          >
        </template>
        <template v-for="(child, cindex) in item[childrenKey]">
          <el-menu-item
            v-if="validatenull(child[childrenKey])"
            :index="(child[pathKey], cindex)"
            :class="{ 'is-active': vaildAvtive(child) }"
            :key="child[labelKey]"
            @click="open(child, cindex)"
          >
            <!-- <i :class="child[iconKey]"/> -->
            <span slot="title">{{ child[labelKey] }}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :menu="[child]"
            :key="cindex"
            :props="props"
            :screen="screen"
            :collapse="collapse"
          />
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validatenull } from '@/utils/validate'
import config from './config.js'
export default {
  name: 'SidebarItem',
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    collapse: {
      type: Boolean
    }
  },
  data() {
    return {
      config: config,
      activePath: "",
      newMenu: []
    }
  },
  created() {
    sessionStorage.setItem('firstCome',true);
    this.translateMenu();
    // this.open(this.newMenu[0]);
    // this.getSideMenu();
  },
  // watch: {
  //   menu: {
  //     handler: function(newV) {
  //       if(newV && newV.length > 0) {
  //         let index = sessionStorage.getItem('leftIndex') ? sessionStorage.getItem('leftIndex') : 0
  //         this.open(newV[index], index)
  //       }
  //     },
  //   }
  // },
  computed: {
    ...mapGetters(['roles']),
    labelKey() {
      return this.props.label || this.config.propsDefault.label
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  methods: {
    translateMenu() {
      let array = JSON.parse(JSON.stringify(this.menu));
      array.forEach(item => {
        item.allPath = '/' + sessionStorage.getItem('top-menu-path') + '/' + item.path;
      })
      this.newMenu = array;
    },
    // getSideMenu() {
    //   this.$store.dispatch("GetLeftMenu", { type: true, id: sessionStorage.getItem('top-menu-id') }).then(() => {
    //   })
    // },
    vaildAvtive(item) {
      const groupFlag = (item['group'] || []).some(ele =>
        this.$route.path.includes(ele)
      )
      return this.nowTagValue === item[this.pathKey] || groupFlag
    },
    vaildRoles(item) {
      item.meta = item.meta || {}
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull(val) {
      return validatenull(val)
    },
    open(item) {     
      this.$router.push({
        path: item.allPath,
      }).catch(() => { })
    }
  }
}
</script>

