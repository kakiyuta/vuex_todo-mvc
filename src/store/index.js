import Vue from 'vue'
import Vuex from 'vuex'
import Tasks from './module/tasks.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks: Tasks
  }
})
