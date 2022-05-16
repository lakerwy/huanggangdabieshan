import * as CryptoJS from 'crypto-js'

/**
 * @param  {Array} 要转换的数据
 * @param  {String} 每个数据独有的key
 * @param  {String} 每个数据的父级id
 */
export function toTreeData(data, key = 'id', p = 'pid') {
  let result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  let map = {};
  data.forEach(i => {
    map[i[key]] = i
  })
  data.forEach(i => {
    let parent = map[i[p]];
    if (parent) {
      (parent.children || (parent.children = [])).push(i)
    } else {
      result.push(Object.assign(i, { isShowDel: false }))
    }
  })
  return result;
}

/**
 * 
 */
export const download = function (url) {
  let elA = document.createElement("a");
  elA.href = url;
  elA.download = url;
  elA.click()
}


/**
 *加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}
/**
 * 根据id删除数组项
 * @param {Number} id 需要删除的id
 * @param {Array} list 目标数组
 * @return {Array}
 */
export function deleteById(id, list) {
  for (let index = list.length - 1; index >= 0; index--) {
    if (list[index] && list[index].id === id) {
      list.splice(index, 1)
    }
  }
  return list
}


// 获取cookie
export function getCookie(cookieName) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (cookieName == arr[0]) {
      return arr[1];
    }
  }
  return "";
}

//经纬度转度分秒
export function cacuLonLat(a) {
  a = Math.abs(Number(a));
  let degree = Math.floor(a);
  let min = Math.floor(a * 60 - degree * 60);
  let sec = ((a - degree) * 3600 - min * 60)
  return degree + '°' + min + '′' + valueTofixed(sec) + '″';
}

//字符串或数字保留两位小数
export function valueTofixed(val) {
  let num;
  let reg = /^[0-9]+\.?[0-9]*$/;
  if (reg.test(val + '') || typeof (val) == 'number') {
    num = Number(val).toFixed(2);
    num = Number(num)
  } else {
    num = val
  }
  return num;
}

//类型
export function dealTypes(type) {
  var arr = [{ 'type': 1, name: '景点' },
    { 'type': 2, name: '遗迹点' },
    { 'type': 3, name: '视频点' },
    { 'type': 4, name: '监测站' },
    { 'type': 5, name: '游客中心' },
    { 'type': 6, name: '公厕' },
    { 'type': 7, name: 'poi' },
    { 'type': 8, name: '公共事业' },
    { 'type': 9, name: '购物' },
    { 'type': 10, name: '加油加气站' },
    { 'type': 11, name: '交通设施' },
    { 'type': 12, name: '教育' },
    { 'type': 13, name: '酒店' },
    { 'type': 14, name: '美食' },
    { 'type': 15, name: '山峰' },
    { 'type': 16, name: '休闲娱乐' },
    { 'type': 17, name: '医疗' },
    { 'type': 18, name: '政府机构' },
    { 'type': 19, name: '水系' },
    { 'type': 20, name: '罗田英山旅游路线' },
    { 'type': 21, name: '麻城旅游路线' },
  ];
  arr.forEach(item=>{
    if(item.type == type){
      return item.name;
    }
  })
}