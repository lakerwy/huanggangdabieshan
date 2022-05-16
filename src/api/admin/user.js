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

import request from '@/request/index'
const baseUrl = window.globalUrl.HOME_API;

export function fetchList(query) {
  return request({
    url: baseUrl + 'admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: baseUrl + 'admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: baseUrl + 'admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: baseUrl + 'admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: baseUrl + 'admin/user',
    method: 'put',
    data: obj
  })
}

export function getDetails(obj) {
  return request({
    url: baseUrl + 'admin/user/details/' + obj,
    method: 'get'
  })
}

// 更改个人信息
export function editInfo(obj) {
  return request({
    url: baseUrl + 'admin/user/edit',
    method: 'put',
    data: obj
  })
}


// 获取头像
export function getAvatar(obj) {
  return request({
    url: `${baseUrl}admin/sys-file/avatar/${obj}`,
    method: 'get',
    params: obj
  })
}
