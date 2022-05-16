import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import Layout from '@/views/system_management/index'
import AvueRouter from './avue-router'
import Store from '../store/index'
let routes = [
  {
    path: '/myiframe',
    name: 'openIframe',
    component: () => import('../components/iframe/main'),
    // redirect: '/myiframe',
    // children: [{
    //   path: ':routerPath',
    //   name: 'iframe',
    //   component: () =>
    //     import('../components/iframe/main'),
    //   props: true
    // }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: "/board",
    name: "board",
    component: () => import('../views/Board/index.vue')
  },

  // children: [
  //   {
  //     path: '/park_map',
  //     name: 'park_map',
  //     component: () => import('../views/park_map/index.vue')
  //   },
  //   {
  //     path: '/remain_management',
  //     name: 'remain_management',
  //     component: () => import('../views/remain_management/index.vue')
  //   },
  // {
  //   path: '/new_remain',
  //   name: 'new_remain',
  //   component: () => import('../views/newRemain/index.vue')
  // },
  // {
  //   path: '/edit_remain',
  //   name: 'edit_remain',
  //   component: () => import('../views/newRemain/edit/index.vue')
  // },
  // {
  //   path: '/detail_remain',
  //   name: 'detail_remain',
  //   component: () => import('../views/newRemain/detail/index.vue')
  // },
  //   {
  //     path: '/files_management',
  //     name: 'files_management',
  //     component: () => import('../views/files_management/index')
  //   },
  //   // 地质博物馆
  //   {
  //     path: '/geological_museum',
  //     name: 'geological_museum',
  //     component: () => import('../views/geological_museum/index')
  //   },
  //   // 地质博物馆--展厅管理详情页面
  // {
  //   path: '/home/exhibitionManagement',
  //   name: 'exhibitionManagement',
  //   component: () => import('../views/geological_museum/exhibitionManagement/index.vue')
  // },
  // {
  //   path: '/home/scienceTweet',
  //   name: 'scienceTweet',
  //   component: () => import('../views/geological_museum/scienceTweet/index.vue')
  // },
  // {
  //   path: '/home/samples',
  //   name: 'samples',
  //   component: () => import('../views/geological_museum/samples/index.vue')
  // },
  //   {
  //     path: '/system_management',
  //     name: 'system_management',
  //     component: () => import('../views/system_management/index.vue')
  //   },
  // ]
  // }
]
const Router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
AvueRouter.install(Router, Store);
Router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/board') {
    next()
  } else {
    if (!sessionStorage.getItem('sys-access_token')) {
      next({
        path: '/login'
      })
      return;
    } else {
      if (to.path == '/') {
        next({
          path: '/park_map'
        })
      } else {
        next()
      }
    }
  }
})
Router.$avueRouter.formatRoutes(Store.state.user.menu, true)
export function resetRouter() {
  const newRouter = createRouter()
  Router.matcher = newRouter.matcher;
  AvueRouter.install(Router, Store)
}
export default Router
