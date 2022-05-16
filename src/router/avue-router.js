const RouterPlugin = function () {
  this.$router = null
  this.$store = null
}
RouterPlugin.install = function (router, store) {
  this.$router = router
  this.$store = store
  function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
  }
  function objToform(obj) {
    const result = []
    Object.keys(obj).forEach(ele => {
      result.push(`${ele}=${obj[ele]}`)
    })
    return result.join('&')
  }
  this.$router.$avueRouter = {
    // 全局配置
    $website: this.$store.getters.website,
    routerList: [],
    group: '',
    safe: this,
    // 设置标题
    setTitle: function (title) {
      // title = title ? `${title}——${this.$website.title}` : this.$website.title
      // title = this.$website.title
      // document.title = title
    },
    closeTag: (value) => {
      const tag = value || this.$store.getters.tag
      this.$store.commit('DEL_TAG', tag)
    },
    // 处理路由
    getPath: function (params) {
      const { src } = params
      let result = src || '/'
      if (src.includes('http') || src.includes('https')) {
        result = `/myiframe/urlPath?${objToform(params)}`
      }
      return result
    },
    // 正则处理路由
    vaildPath: function (list, path) {
      let result = false
      list.forEach(ele => {
        if (new RegExp('^' + ele + '.*', 'g').test(path)) {
          result = true
        }
      })
      return result
    },
    // 设置路由值
    getValue: function (route) {
      let value = ''
      if (route.query.src) {
        value = route.query.src
      } else {
        value = route.path
      }
      return value
    },
    // 动态路由
    formatRoutes: function (aMenu = [], first,pIdPath) {
      const propsConfig = this.$website.menu.props
      const aRouter = [];
      const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children',
        meta: propsConfig.meta || 'meta'
      }
      if (aMenu.length === 0) return
      const firstRouter = {
        path: '/home',
        name: 'home',
        component:() => import('@/components/layout/index.vue'),
        children:[]
      }
      let oRouterChildren = [];
      for (let i = 0; i < aMenu.length; i++) {
        const oMenu = aMenu[i]
        if (!this.routerList.includes(oMenu[propsDefault.path])) {
          this.routerList.push(path)
        }else{
          return
        }
        let path = (() => {
          if (!oMenu[propsDefault.path]) {
            return
          } else {
              return oMenu[propsDefault.path]
          }
        })()
        const name = oMenu[propsDefault.path]
        const icon = oMenu[propsDefault.icon]
        const children = oMenu[propsDefault.children]
        const isChild = children.length > 0;
        const meta = {
          keepAlive: Number(oMenu['keepAlive']) === 1
        }
        const tempRoutepath = ['audit', 'finance', 'land', 'announce'];  // 自己定义的路由，再路由后面不能加index
        const object = {
          // icon: icon,
          name: name,
          meta: meta,
          path: first?'/'+path:path,
          children: []
        }
        if (first) {
          object.component = () => import ('@/views/' + path + '/index.vue');
          oRouterChildren.push(object);
          if(children.length>0){
            console.log(this.formatRoutes(children, false ,path));
            object.children = this.formatRoutes(children, false ,path)
          }
        }else {          
          object.component = () => import('@/views/'+ pIdPath + '/' + path + '.vue');
          aRouter.push(object);
        }
      }
      if(first){
        firstRouter.children = oRouterChildren;
        this.safe.$router.addRoute(firstRouter);
      }else{
        return aRouter
      }
      console.log(this.safe.$router.getRoutes());
    }
  }
}
export default RouterPlugin
