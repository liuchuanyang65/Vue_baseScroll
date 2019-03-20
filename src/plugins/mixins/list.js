/**
 * 适用于有表格的组件混入文件 - 封装了排序，筛选，分页等功能
 */

const mixinTable = {
  data () {
    return {
      listApi: '', // API 名称
      listName: '', // 后台返回的数据列表名称
      filter: {}, // 筛选条件数据
      cloneFilter: {}, // 克隆的初始筛选条件数据，用于重置
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      isFinish: false, // 是否已加载完所有数据
      perSize: 10, // 每页数据条数
      totalPage: 0 // 数据总页数
    }
  },
  methods: {
    // 获取表格数据
    getList () {
      this.beforeGetList()
      // 请求配置对象
      let option = {
        api: this.listApi,
        params: {
          page: this.currentPage,
          perSize: this.perSize
        }
      }
      // 发送请求
      return this.$http(option, this.filter).then(res => {
        let key = this.listName
        if (res.code === 0 && res.info) {
          let data = key ? res.info[key] : res.info
          data = data || []
          this.tableData = this.currentPage === 1 ? data : this.tableData.concat(data)
          // 处理分页相关
          res.info.page && (this.totalPage = res.info.page.totalPage)
          this.isFinish = this.totalPage === this.currentPage
          // 触发钩子函数
          this.afterGetList(res)
        } else {
          this.isFinish = true
        }
        return res
      }).catch(() => {
        this.isFinish = true
      })
    },

    // 加载下一页数据
    getNext () {
      if (this.currentPage >= this.totalPage) {
        this.isFinish = true
        return false
      }
      this.currentPage += 1
      this.getList()
    },
    // 重置页码
    getByFilter () {
      this.currentPage = 1
      this.isFinish = false
      this.getList()
    },
    // 重置筛选条件和页码
    resetList () {
      this.filter = Object.assign({}, this.cloneFilter)
      this.getByFilter()
    },

    // 钩子函数：发起请求获取数据前
    beforeGetList () {
      return true
    },
    // 钩子函数：获取到数据后，列表赋值前
    afterGetList (res) {
      return res
    }
  },

  created () {
    this.cloneFilter = Object.assign({}, this.filter)
  }
}
export default mixinTable
