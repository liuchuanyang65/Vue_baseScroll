import axios from 'axios'
import wx from 'weixin-js-sdk'

export default function getWXSign () {
  return new Promise((resolve, reject) => {
    const jsApiList = [
      'chooseWXPay',
      'getLocation',
      'openLocation',
      'hideMenuItems',
      'miniProgram',
      'chooseImage',
      'uploadImage',
      'closeWindow',
      'onMenuShareAppMessage',
      'scanQRCode'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    axios
      .post(process.env.VUE_APP_WX_API, {
        url: window.location.href.split('#')[0]
      })
      .then(function (res) {
        const data = res.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.sign, // 必填，签名，见附录1
          jsApiList: jsApiList
        })
        wx.ready(function (res) {
          axios
            .get(process.env.VUE_APP_BASE_API + '/h5/invitation/link', {
              params: { token: window.sessionStorage.getItem('token') }
            })
            .then(res => {
              wx.onMenuShareAppMessage({
                title: res.data.info.nickName + '发现商机，分享优惠券就能赚钱', // 分享标题
                desc: res.data.info.userNum + '小伙伴累计获得佣金' + res.data.info.totalMoney + '元快来加入吧！',
                link: window.location.href.split('/#')[0] + '?speriorId=' + res.data.info.speriorId,
                imgUrl: 'https://oss.kdwaimai.com/jkb/1551237390144_022468.png', // 分享图标
                // type: '', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              })
              resolve(wx)
            })
        })

        wx.error(function (res) {
          reject(res)
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
