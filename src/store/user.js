import {getStore, setStore} from '@/util/store'
import {isURL, validatenull} from '@/util/validate'
import {deepClone, encryption} from '@/util/util'
import webiste from '@/const/website'
import {getMenu, getTopMenu} from '@/api/admin/menu'

function addPath(ele, first) {
  const menu = webiste.menu
  const propsConfig = menu.props
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon]
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild) ele[propsDefault.children] = []
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child)
    })
  }
}

const user = {
  state: {
    userInfo: getStore({
      name: 'userInfo'
    }) || {},
    permissions: getStore({
      name: 'permissions'
    }) || [],
    roles: [],
    menu: getStore({
      name: 'menu'
    }) || [],
    leftMenu: getStore({
      name: 'leftmenu'
    }) || [],
    expires_in: getStore({
      name: 'expires_in'
    }) || '',
    access_token: getStore({
      name: 'access_token'
    }) || '',
    refresh_token: getStore({
      name: 'refresh_token'
    }) || ''
  },
  actions: {
    // 获取系统菜单
    GetMenu({commit}, obj) {
      return new Promise(resolve => {
        getMenu(obj.id).then((res) => {
          const data = res.data.data
          const menu = deepClone(data)
          menu.forEach(ele => {
            addPath(ele)
          })
          let type = obj.type
          commit('SET_MENU', {type, menu})
          resolve(menu)
        })
      })
    },
    //顶部菜单
    GetTopMenu({commit}) {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || [];
          const menu = deepClone(data)
          menu.forEach(ele => {
            addPath(ele)
          })
          let type = true;
          commit('SET_MENU', {type, menu})
          resolve(menu)
        })
      })
    },
    // 左侧菜单
    GetLeftMenu({commit}, obj,a) {
      return new Promise(resolve => {
        getMenu(obj.id).then((res) => {
          const data = res.data.data || []
          const menu = deepClone(data)
          let type = obj.type
          commit('SET_MENU_LEFT', {type, menu})
          resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_MENU: (state, params = {}) => {
      let {menu, type} = params;
      if (type !== false) state.menu = menu
      setStore({
        name: 'menu',
        content: menu,
        type: 'session'
      })
    },
    SET_MENU_LEFT: (state, params = {}) => {
      // state.leftMenu = leftMenu
      let {menu, type} = params;
      if (type !== false) state.leftMenu = menu
      setStore({
        name: 'leftmenu',
        content: menu,
        type: 'session'
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i].authority] = true
      }

      state.permissions = list
      setStore({
        name: 'permissions',
        content: list,
        type: 'session'
      })
    }
  }

}
export default user
