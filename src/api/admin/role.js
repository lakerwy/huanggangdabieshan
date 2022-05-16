/*
 *    Copyright (c) 2018-2025, intelligence All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: intelligence
 */

import request from '@/router/axios'
const baseUrl = window.globalUrl.HOME_API;

export function roleList() {
  return request({
    url: baseUrl + 'admin/role/roleList',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: baseUrl + 'admin/role/page',
    method: 'get',
    params: query
  })
}

export function deptRoleList() {
  return request({
    url: baseUrl + 'admin/role/list',
    method: 'get'
  })
}

export function getObj(id) {
  return request({
    url: baseUrl + 'admin/role/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: baseUrl + 'admin/role',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: baseUrl + 'admin/role',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: baseUrl + 'admin/role/' + id,
    method: 'delete'
  })
}

export function permissionUpd(roleId, menuIds) {
  return request({
    url: baseUrl + 'admin/role/menu',
    method: 'put',
    data: {
      roleId: roleId, 
      menuIds: menuIds
    }
  })
}

export function roleUpdate(data) {
  return request({
    url: baseUrl + 'admin/role',
    method: 'put',
    data: data
  })
}

export function fetchRoleTree(roleId) {
  return request({
    url: baseUrl + 'admin/menu/tree/' + roleId,
    method: 'get'
  })
}
