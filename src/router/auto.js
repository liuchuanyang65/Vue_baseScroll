import menuJSon from './menu'

function getRouterConfig (router) {
  return {
    name: router.path,
    path: router.path,
    meta: Object.assign({ title: router.title, keepAlive: router.keepAlive || false }),
    component: () => import(`@/views/${router.entry}`)
  }
}

export default function addRouter () {
  let routerMenus = menuJSon
  // 路由配置
  var routerConfig = []
  // 添加路由配置
  routerMenus.forEach((item) => {
    let config = getRouterConfig(item)
    routerConfig.push(config)
  })
  // 返回路由配置
  return routerConfig
}
