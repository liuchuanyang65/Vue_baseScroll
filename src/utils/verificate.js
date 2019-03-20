
// 处理时间
const formatTime = (date, type) => {
  if (date) {
    date = typeof date === 'object' ? date : new Date(date)
  } else {
    date = new Date()
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  var result = [year, month, day].map(formatNumber).join('/')
  if (!type) {
    result += ' ' + [hour, minute, second].map(formatNumber).join(':')
    return result
  }
  if (type === 1) {
    result += ' ' + [hour, minute].map(formatNumber).join(':')
    return result
  }
  if (type === 2) {
    return result
  }
  if (type === 3) {
    result = [year, month, day].map(formatNumber).join('-')
    return result
  }
  return result
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 验证开始时间结束时间最大时间范围为三个月 -------参数值格式为yyyy-mm-dd形式
const checkTime = (begintime, endtime) => {
  if (!endtime) {
    return true
  }
  var time1 = new Date(begintime).getTime()
  var time2 = new Date(endtime).getTime()
  if (begintime === '') {
    console.log('开始时间不能为空')
    return false
  }
  if (endtime === '') {
    console.log('结束时间不能为空')
    return false
  }
  if (time1 > time2) {
    console.log('开始时间不能大于结束时间')
    return false
  }
  // 判断时间跨度是否大于3个月
  var arr1 = begintime.split('-')
  var arr2 = endtime.split('-')
  arr1[1] = parseInt(arr1[1])
  arr1[2] = parseInt(arr1[2])
  arr2[1] = parseInt(arr2[1])
  arr2[2] = parseInt(arr2[2])
  var flag = true
  if (arr1[0] === arr2[0]) { // 同年
    if (arr2[1] - arr1[1] > 3) { // 月间隔超过3个月
      flag = false
    } else if (arr2[1] - arr1[1] === 3) { // 月相隔3个月，比较日
      if (arr2[2] > arr1[2]) { // 结束日期的日大于开始日期的日
        flag = false
      }
    }
  } else { // 不同年
    if (arr2[0] - arr1[0] > 1) {
      flag = false
    } else if (arr2[0] - arr1[0] === 1) {
      if (arr1[1] < 10) { // 开始年的月份小于10时，不需要跨年
        flag = false
      } else if (arr1[1] + 3 - arr2[1] < 12) { // 月相隔大于3个月
        flag = false
      } else if (arr1[1] + 3 - arr2[1] === 12) { // 月相隔3个月，比较日
        if (arr2[2] > arr1[2]) { // 结束日期的日大于开始日期的日
          flag = false
        }
      }
    }
  }
  if (!flag) {
    return false
  }
  return true
}

const trim = s => {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

// 验证姓名（中英文数字）限制15个字 可输入 中 英 文 数字 字母
const isName = name => {
  if (name) {
    let reg = /^[\u4e00-\u9fa5A-Za-z0-9]{1,15}$/
    if (name === 'null' || name === 'undefined') {
      return false
    }
    if (reg.test(name)) {
      return true
    } else {
      return false
    }
  }
}

// 验证手机号码13-19的11位手机号码
const isCellphone = phone => {
  if (phone) {
    let reg = /^1[3456789][0-9]{9}$/
    if (reg.test(phone)) {
      return true
    } else {
      return false
    }
  }
}

// 验证输入的验证码（6位的正数字）
const isAuthcode = num => {
  if (num) {
    // let reg= /^[0-9]{6}$/
    let reg = /^\d{6}$/
    if (reg.test(num)) {
      return true
    } else {
      return false
    }
  }
}

// 验证正整数
const isNumber = num => {
  // if(num) {
  let reg = /^[0-9]\d*$/
  if (reg.test(num)) {
    return true
  } else {
    return false
  }
  // }
}

// 验证用户密码（必须字母数字组合，6-16个字符）
const isPassword = pass => {
  if (pass) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (reg.test(pass)) {
      return true
    } else {
      return false
    }
  }
}
// 验证店铺ID（必须字母数字组合，必须10个字符）
const isStoreid = pass => {
  if (pass) {
    let res = /^[a-zA-Z0-9]+$/
    // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,10}$/
    if (res.test(pass)) {
      return true
    } else {
      return false
    }
  }
}

// 验证营业执照注册码（不低于13位数字
const isRegister = num => {
  if (num) {
    let reg = /^[0-9a-zA-Z]{13,}$/
    if (reg.test(num)) {
      return true
    } else {
      return false
    }
  }
}

// 一位小数的正实数
const isApoint = num => {
  if (num) {
    let reg = /^[0-9]+(.[0-9]{1})?$ /
    if (reg.test(num)) {
      return true
    } else {
      return false
    }
  }
}

// 正数或一位小数
const decimals = num => {
  if (num) {
    let reg = /^[0-9]+([.][0-9]{1}){0,1}$/
    if (reg.test(num)) {
      return true
    } else {
      return false
    }
  }
}

// 验证一个对象是否有值为空
const emptyObj = obj => {
  let res = true
  for (var key in obj) {
    if (!obj[key]) {
      res = false
    }
  }
  return res
}

// 禁止为空、undefined和null
const textNormal = str => {
  if (!str || str === 'undefined' || str === 'null') {
    return false
  } else {
    return true
  }
}

// 截取路由参数 参数格式在#之后
const getDatas = (url) => {
  var args = {}
  url = url.slice(url.indexOf('?') + 1)
  if (url.length > 0) {
    var nameValueArr = url.split('&') // 多参数
    nameValueArr.forEach(v => {
      let temp = v.split('=')
      let key = temp[0]
      let val = temp[1]
      args[key] = val
    })
    return args
  }
}

// 获取路由参数 参数格式在# 之前
const getData = (url) => {
  var args = {}
  var argsStr = url.search // 获取URL参数字符串
  if (argsStr.length > 0) {
    argsStr = argsStr.substring(1)
    var nameValueArr = argsStr.split('&') // 多参数
    for (var i = 0; i < nameValueArr.length; i++) {
      var pos = nameValueArr[i].indexOf('=')
      if (pos === -1) continue // 如果没有找到就跳过
      var argName = nameValueArr[i].substring(0, pos) // 提取name
      var argVal = nameValueArr[i].substring(pos + 1) // 提取value
      args[argName] = argVal
    }
    return args
  }
}

// 去除链接上的token
const delData = () => {
  if (window.location.href.indexOf('token') > -1 && window.location.href.indexOf('?') > -1 && window.location.href.indexOf('#') > -1) {
    let tokenstr = window.location.href.match(/\?(\S*)#/)[1]
    let lastarr = window.location.href.split('?' + tokenstr)
    let lasturl = lastarr[0] + lastarr[1] + ''
    return lasturl
  } else {
    return window.location.href
  }
}

const verify = {
  trim,
  emptyObj,
  formatTime,
  checkTime,
  isNumber,
  isApoint,
  decimals,
  isName,
  isCellphone,
  isAuthcode,
  isPassword,
  isStoreid,
  isRegister,
  textNormal,
  getDatas,
  getData,
  delData
}

export default verify
