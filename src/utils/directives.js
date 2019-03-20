export default {
  focus: {
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  },
  scroll: {
    bind: function (el, binding, vnode) {
      window.addEventListener('scroll', vnode.context.loadMore)
    },
    unbind: function (el, binding, vnode) {
      window.removeEventListener('scroll', vnode.context.loadMore)
    }
  },
  footer: {
    inserted: function (el, binding, vNode) {
      const elStyle = el.style
      let active = false
      const originalHeight = document.body.clientHeight
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
        const currHeight = getCurrHeight()
        // alert((currHeight/originalHeight),'pppppppppppppp')
        if (currHeight / originalHeight < 0.7) {
          hang()
        } else {
          reset()
        }
      }
      const listenAction = () => {
        check()
      }
      window.addEventListener('resize', listenAction)
    },
    update: function (el, binding, vNode) {
      const elStyle = el.style
      let active = false
      const originalHeight = document.body.clientHeight
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
        const currHeight = getCurrHeight()
        if (currHeight / originalHeight < 0.7) {
          hang()
        } else {
          reset()
        }
      }
      const listenAction = () => {
        check()
      }
      window.addEventListener('resize', listenAction)
    }
  }
}
