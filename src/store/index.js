import Vue from 'vue'
import Vuex from 'vuex'
import globalData from './globalData'
//1 安装插件
Vue.use(Vuex)
//2 创建对象，取对象$store.state.变量
const store =new Vuex.Store({
  state:{
    // count: 1,
    // todos: [
    //   { id: 1, text: '...', done: true },
    //   { id: 2, text: '...', done: true }
    // ]
  },
  mutations:{
    // increment (state, n) {
    //   state.count += n
    // }
  },
  actions:{
    
  },
  getters:{
    /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // }
  },
  modules: {
    globalData
  }
});
//3 导出
export default store

//<div>获取vuex数据：{{this.$store.state.count}}---{{this.$store.getters.doneTodos}}</div>
//this.$store.commit('increment', 10);
