/*
 * 全局指令
 * @Author: chuanyangliu
 * @Date: 2019-01-30 10:39:27
 * @Last Modified by: chuanyangliu
 * @Last Modified time: 2019-01-30 21:48:41
 */

export default {
  focus: {
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  },
  // 页面滚动
  scroll: {
    bind: function (el, binding, vnode) {
      window.addEventListener('scroll', vnode.context.loadMore)
    },
    unbind: function (el, binding, vnode) {
      window.removeEventListener('scroll', vnode.context.loadMore)
    }
  },
  // 安卓手机防止键盘弹起
  footers: {
    inserted: function (el, binding, vNode) {
      const elStyle = el.style
      let active = false
      let originalHeight = document.body.clientHeight
      const reset = () => {
        if (!active) {
          return
        }
        elStyle.display = 'block'
        // let app = document.getElementById('apps')
        // app.style.borderBottom = '1.33rem solid transparent'
        active = false
      }
      const hang = () => {
        if (active) {
          return
        }
        elStyle.display = 'none'
        // let app = document.getElementById('apps')
        // app.style.borderBottom = 0
        active = true
      }
      const getCurrHeight = () => {
        const getHeight = document.body.clientHeight
        return getHeight
      }
      const check = () => {
        let currHeight = getCurrHeight()
        // alert((currHeight/originalHeight),'pppppppppppppp')
        if (currHeight / originalHeight < 0.7) {
          hang()
        } else {
          reset()
        }
      }
      let listenAction = () => {
        check()
      }
      window.addEventListener('resize', listenAction)
    },
    update: function (el, binding, vNode) {
      const elStyle = el.style
      let active = false
      let originalHeight = document.body.clientHeight
      const reset = () => {
        if (!active) {
          return
        }
        elStyle.display = 'block'
        active = false
      }
      const hang = () => {
        if (active) {
          return
        }
        elStyle.display = 'none'
        const app = document.getElementById('apps')
        app.style.paddingBottom = 0
        active = true
      }
      const getCurrHeight = () => {
        const getHeight = document.body.clientHeight
        return getHeight
      }
      const check = () => {
        let currHeight = getCurrHeight()
        if (currHeight / originalHeight < 0.7) {
          hang()
        } else {
          reset()
        }
      }
      let listenAction = () => {
        check()
      }
      window.addEventListener('resize', listenAction)
    }
  }
}
