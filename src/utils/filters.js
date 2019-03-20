// 枚举值
export default {
  // 处理时间  格式默认2018/02/27 19:56:40  type = 1 2018/02/27 19:56  type = 2  2018/02/27
  formatTime: function (date, type) {
    let formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    if (date) {
      date = typeof date === 'object' ? date : new Date(date)
    } else {
      date = new Date()
    }

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let result = [year, month, day].map(formatNumber).join('/')
    if (!type) {
      result += ' ' + [hour, minute, second].map(formatNumber).join(':')
      return result
    }
    if (type === 1) {
      result += ' ' + [hour, minute].map(formatNumber).join(':')
      return result
    }
    if (type === 2) {
      return result
    }
    if (type === 3) {
      result = [year, month, day].map(formatNumber).join('/')
      return result
    }
    if (type === 4) {
      result += ' ' + [hour, minute].map(formatNumber).join(':')
      return result
    }
    if (type === 5) {
      result = [year, month, day].map(formatNumber).join('-')
      return result
    }
    if (type === 6) {
      result = formatNumber(hour) + ':' + formatNumber(minute)
      return result
    }
  }
}
