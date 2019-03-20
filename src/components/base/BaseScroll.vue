<template>
  <div class="z-scroll-wrap" ref="wrap" @scroll="handleScroll">
    <!-- 主容器 -->
    <div class="z-scroll-box" ref="box" :style="boxStyle">
      <!-- 下拉刷新 -->
      <div class="z-scroll-pulldown" ref="pulldown">
        <template v-if="$scopedSlots.pulldown">
          <slot name="pulldown" :isLoading="isLoading" :isPulldown="isPulldown"></slot>
        </template>
        <div class="pulldown_wrap" v-else>
          <div v-show="isLoading">加载中...</div>
          <div v-show="!isLoading">
            <div v-show="!isPulldown">下拉刷新...</div>
            <div v-show="isPulldown">释放刷新...</div>
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="z-scroll-content">
        <slot></slot>
      </div>

      <!-- 上拉 -->
      <div class="z-scroll-pullup" ref="pullup">
        <template v-if="$scopedSlots.pullup">
          <slot name="pullup" :isLoading="isLoading" :isPullUp="isPullUp" :finished="finished"></slot>
        </template>
        <div class="pullup_wrap" v-else>
          <div v-show="!isPullUp || finished">——— 我是有底线的 ———</div>
          <div v-show="isPullUp && !finished" class="spinner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'z-scroll',

  props: {
    value: {
      type: Array,
      default () { return [] }
    },
    finished: {
      type: Boolean,
      default: false
    },
    pullDown: Boolean,
    pullUp: Boolean
  },

  data () {
    return {
      scrollY: 0, // 滚动位置
      moveStart: 0, // 滑动起始坐标
      moveDistance: 0, // 滑动距离

      isTop: false, // 是否处于收回状态
      isLoading: false, // 是否处于加载中状态 - 上拉与下拉都适用
      isPulldown: false, // 是否到达下拉刷新阀值
      isPullUp: false, // 是否到达上拉阀值

      wrapHeight: 0, // 容器盒子高度
      pullupHeight: 0, // 上拉盒子高度
      pulldownHeight: 0 // 下拉盒子高度
    }
  },

  computed: {
    boxStyle () {
      let speed = this.isTop ? 300 : 0
      return {
        paddingBottom: `${this.pullupHeight}px`,
        transition: `all ${speed}ms`,
        transform: `translate3d(0px, ${this.moveDistance}px, 0px)`
      }
    }
  },

  methods: {
    // 注册监听事件
    init () {
      let ele = this.$refs.wrap
      if (this.pullDown) {
        ele.addEventListener('touchstart', this.touchStart)
        ele.addEventListener('touchmove', this.touchMove)
        ele.addEventListener('touchend', this.touchEnd)
      }
    },

    // 滚动事件
    handleScroll (e) {
      this.scrollY = e.target.scrollTop
      this.$emit('scroll', e)
      if (this.finished || this.isLoading) { return false }
      this.pullUp && this.checkPullup()
    },

    // 检查是否触底
    checkPullup () {
      let wrapHeight = this.$refs.wrap.offsetHeight
      let boxHeight = this.$refs.box.offsetHeight // 内容盒子高度
      // 是否触底 = 内容盒子高度 - 窗口高度 - 滚动高度 === 0
      let offset = boxHeight - wrapHeight - this.scrollY
      if (offset <= 0) {
        this.isPullUp = true
        this.isLoading = true
        this.$emit('pull-up')
      }
    },

    // 开始触摸
    touchStart (e) {
      if (this.scrollY !== 0) { return false }
      this.isTop = false
      this.moveDistance = 0
      this.moveStart = e.touches[0].pageY
    },
    // 触摸中
    touchMove (e) {
      if (this.scrollY !== 0) { return false }
      let distance = e.touches[0].pageY - this.moveStart // 滑动距离
      if (distance <= 0) {
        return false // 上拉动作则取消后续行为
      } else {
        e.preventDefault() // 下拉动作则取消默认行为
      }
      let isMax = distance > this.pulldownHeight // 是否超过阀值
      let slow = (this.pulldownHeight + (distance - this.pulldownHeight) / 5) // 超过阀值后的缓动效果
      this.moveDistance = isMax ? slow : distance
      this.isPulldown = this.moveDistance >= this.pulldownHeight
    },
    // 触摸结束
    touchEnd () {
      // 如果超过下拉阀值
      if (this.moveDistance >= this.pulldownHeight) {
        this.isTop = true
        this.isLoading = true
        this.moveDistance = this.pulldownHeight
        this.$emit('pull-down')
      } else {
        this.moveDistance = 0
      }
    },

    // 重新计算所有高度
    refresh () {
      this.wrapHeight = this.$refs.wrap.offsetHeight
      this.pullupHeight = this.$refs.pullup.firstElementChild.offsetHeight
      this.pulldownHeight = this.$refs.pulldown.firstElementChild.offsetHeight
    },
    // 清空下拉、上拉状态
    forceUpdate () {
      this.moveDistance = 0
      this.isLoading = false
      this.isPullUp = false
      this.isPulldown = false
    },
    // 滚动到某个位置
    scrollTo (x, y) {
      this.$refs.wrap.scrollTop = y
      this.$refs.wrap.scrollLeft = x
    }
  },

  watch: {
    value () {
      this.forceUpdate()
    }
  },

  mounted () {
    this.init()
    this.refresh()
  },

  beforeDestroy () {
    let ele = this.$refs.wrap
    if (this.pullDown) {
      ele.removeEventListener('touchstart', this.touchStart)
      ele.removeEventListener('touchmove', this.touchMove)
      ele.removeEventListener('touchend', this.touchEnd)
    }
  }
}
</script>

<style lang="stylus" scoped>
.z-scroll-wrap {
  position: relative;
  height: 100%;
  overflow: auto;
  user-select: none;
  scroll-behavior: smooth;
}
.z-scroll-box { min-height: 100%; }
.z-scroll-pulldown, .z-scroll-pullup { overflow: hidden; }

.pulldown_wrap {
  position: absolute;
  top: -60px;
  width: 100%;
  font-size: 20px;
  padding: 20px 0;
}

.pullup_wrap { line-height: 40px; }
.pullup_wrap .spinner {
  width: 30px;
  height: 30px;
  margin: 5px auto;
  background-color: #333;
  border-radius: 100%;
  animation: scaleout 1.0s infinite ease-in-out;
}

@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
</style>
