import Vue from 'vue'
import Router from 'vue-router'
import autoRouter from './auto'
import Layout from '@/components/layout/BaseLayout' // 主框架

Vue.use(Router)

// 动态配置路由数据
const routerData = autoRouter()

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/index', // 重定向
      children: routerData
    }
  ]
})
