<template>
  <div>
    <div class="base__line">
      <p class="line"></p>
      <p class="text">我也是有底线的</p>
      <p class="line"></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.base__line
  display flex
  align-items center
  justify-content center
  margin 30px 0
  .line
    width 80px
    height 2px
    background #b4b4b4
    border-radius 15px 15px 0px 0px
  .text
    font-size 20px
    color #B4B4B4
    line-height 20px
    margin 0 20px
</style>
