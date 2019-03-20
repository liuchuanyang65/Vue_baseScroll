<template>
  <div class="wrap">
    <p>1、本项目采用了postcss-px-to-viewport插件实现px与vm的转换 在.postcssrc.js文件中进行相关配置</p>
    <p>2、stylus</p>
    <p>3、基本组件已全局注册可直接使用</p>
    <p>4、npm insatll </p>
    <p>5、运行项目：npm run server 打包项目：npm run build</p>
  </div>
</template>

<script>
import MixinList from '@/plugins/mixins/list'

export default {
  mixins: [MixinList], // 公用的滚动js

  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  font-size 32px
  margin 100px
  text-align left
</style>

