<template>
  <div class="wrap">
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
