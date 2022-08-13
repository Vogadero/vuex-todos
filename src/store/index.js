import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    // 文本框的值
    inputVal: '123',
    // 按钮样式关键字
    viewKey: 'all'
  },
  getters: {
    // 统计未完成的列表数
    unfinishedStatistics(state) {
      return state.list.filter(item =>
        item.done === false
      ).length
    },
    // 按样式关键字返回所需任务列表
    showList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(item =>
          item.done === false
        )
      } else if (state.viewKey === 'completed') {
        return state.list.filter(item =>
          item.done === true
        )
      } else {
        return state.list
      }
    },
  },
  mutations: {
    // 初始化list里的数据
    initList(state, list) {
      state.list = list
    },
    // 为state.inputVal赋值
    setInputVal(state, val) {
      state.inputVal = val
    },
    // 添加列表项
    addItem(state) {
      const item = {
        id: state.list.length,
        info: state.inputVal.trim(),
        done: false
      }
      state.list.push(item)
      state.inputVal = ''
    },
    // 根据id删除列表项
    removeItem(state, id) {
      // 1.根据id查找对应项的索引
      const itemIndex = state.list.findIndex((item) => {
        if (item.id == id) return true
      })
      // 2.根据索引删除对应项
      if (itemIndex != -1) {
        state.list.splice(itemIndex, 1)
      }
    },
    // 修改复选框的选中状态
    changeCheckboxStatus(state, param) {
      // 1.根据id查找对应项的索引
      const itemIndex = state.list.findIndex((item) => {
        if (item.id == param.id) return true
      })
      // 2.根据索引修改对应项的状态
      if (itemIndex != -1) {
        state.list[itemIndex].done = param.status
      }
    },
    // 清除已完成
    clearCompleted(state) {
      // 找到未完成的并赋值
      state.list = state.list.filter(item =>
        item.done === false
      )
    },
    // 修改按钮样式关键字
    changeStyleKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    // 异步获取list数据
    getList(context) {
      axios.get('/list.json').then((ret) => {
        context.commit('initList', ret.data)
      })
    }
  },
  modules: {}
})