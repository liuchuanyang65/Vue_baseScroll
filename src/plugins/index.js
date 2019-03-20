/*
 * 插件注册
 * @Author: chuanyangliu
 * @Date: 2019-01-30 10:41:29
 * @Last Modified by: lichuanyang
 * @Last Modified time: 2019-03-20 13:32:00
 */
// 导入全局变量
// import { } from '@/config/index'

import lockr from 'lockr'
import http from './http'
import filters from './filters'
import directive from './directive'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// 导入所有基础组件
const requireComponent = require.context('../components/base', false, /Base[A-Z]\w+\.(vue|js)$/)

export default {
  install: (Vue, options) => {
    Vue.prototype.$options = options
    // 挂载工具方法
    Vue.prototype.$http = window.http = http
    Vue.prototype.$lockr = window.lockr = lockr

    // 挂载全局枚举变量
    Vue.prototype.$enum = {
    }

    // 注册全局过滤器
    let fKeys = Object.keys(filters)
    fKeys.forEach(k => Vue.filter(k, filters[k]))

    // 注册全局指令
    let dKeys = Object.keys(directive)
    dKeys.forEach(k => Vue.directive(k, directive[k]))

    // 注册全局基础组件
    requireComponent.keys().forEach(fileName => {
      // 获取组件配置
      const componentConfig = requireComponent(fileName)
      // const componentConfig = value.default || value
      // // 全局注册组件
      // Vue.component(componentConfig.name, componentConfig)
      const componentName = upperFirst(
        camelCase(
          // 剥去文件名开头的 `./` 和结尾的扩展名
          fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
      )
      // 全局注册组件
      Vue.component(
        componentName,
        componentConfig.default || componentConfig
      )
    })
  }
}
