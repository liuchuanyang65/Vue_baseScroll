<template>
  <base-scroll ref="scroll" v-model="value" :pullDown="pullDown" :pullUp="pullUp" :finished="finish" @pull-down="onPullingDown" @pull-up="onPullingUp" @scroll="handleScroll">
    <!-- 下拉动画 -->
    <div class="pulldown_wrap" slot="pulldown" slot-scope="props">
      <!-- 加载中效果 -->
      <div class="t_ac flex_c" v-show="props.isLoading">
        <cube-loading></cube-loading>
      </div>
      <!-- 下拉效果 -->
      <div class="t_ac" v-show="!props.isLoading">
        <span class="pulldown_arrow" :class="{rotate: props.isPulldown}">↓</span>
      </div>
    </div>

    <!-- 内容插槽 -->
    <slot></slot>

    <!-- 上拉动画 -->
    <div class="pullup_wrap flex_c" slot="pullup" slot-scope="props">
      <div class="footer" v-show="!props.isPullUp || props.finished">
        <base-line v-show="value.length > 0 && finish"></base-line>
      </div>
      <div class="flex_c" v-show="props.isPullUp && !props.finished">
        <cube-loading></cube-loading>
      </div>
    </div>
  </base-scroll>
</template>

<script>
export default {
  name: 'ScrollBox',

  props: {
    value: {
      type: Array,
      required: false,
      default () { return [] }
    },
    finish: {
      type: Boolean,
      default: false
    },
    pullDown: Boolean,
    pullUp: Boolean,
    isNoData: {
      default: true
    }
  },

  methods: {
    handleScroll (e) {
      this.$emit('scroll', e)
    },
    // 下拉刷新
    onPullingDown () {
      this.$emit('pull-down')
    },
    // 上拉加载
    onPullingUp () {
      this.$emit('pull-up')
    },
    // 滚动
    scrollTo (x, y) {
      this.$refs.scroll && this.$refs.scroll.scrollTo(x, y)
    },
    // 取消 下拉/上拉 动作
    forceUpdate () {
      this.$refs.scroll && this.$refs.scroll.forceUpdate()
    },
    // 重新计算滚动容器高度
    refresh () {
      this.$refs.scroll && this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loading
    margin 0 auto

  .pulldown_wrap
    position absolute
    top -50px
    width 100%
    height 50px
    padding 10px 0
    overflow hidden

  .pulldown_arrow
    display inline-block
    color #aaa
    font-size 26px
    transition all 0.3s
    &.rotate
      transform rotate(180deg)

  .pullup_wrap
    position fixed
    bottom 0
    left 0
    width 100%
    height 82px
</style>
