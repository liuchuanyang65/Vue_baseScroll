import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import '@/assets/css/base.styl'
import '@/assets/css/common.styl'
import '@/assets/css/variables.styl'

import plugins from './plugins/index'
import filters from '@/utils/filters'
import directives from '@/utils/directives'

Vue.use(plugins)

// 枚举值过滤
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// 全局指令
for (const key in directives) {
  Vue.directive(key, directives[key])
}

Vue.config.productionTip = false

window.$eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
