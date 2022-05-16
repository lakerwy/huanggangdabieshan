/**
 * 档案管理相关接口
 */
 import service from '../request/index'

 const baseUrl = window.globalUrl.HOME_API;
    
 // 获取顶部菜单
 export const getTopMenu = () => {
   return service({
    url: baseUrl + 'admin/menu',
    params: {type: 'top'},
    method: 'get'
   })
 }

 // 获取菜单子菜单
 export function getMenu(id) {
  return service({
    url: baseUrl + 'admin/menu',
    params: {parentId: id},
    method: 'get'
  })
}

 