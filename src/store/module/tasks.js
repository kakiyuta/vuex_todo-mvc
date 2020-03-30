var TODOS = [
  {id: 0, title: "Study", completed: false},
  {id: 1, title: "Work", completed: false},
  {id: 2, title: "Meeting", completed: false}
];

export default {
  namespaced: true,
  state: {
    todos: TODOS,
    uuid: TODOS.length
  },
  getters: {
    allTodos (state) {
      return state.todos;
    },
    activeTodos (state, getters) {
      return getters.allTodos.filter(function (todo) {
        return !todo.completed;
      });
    },
    completedTodos (state, getters) {
      return getters.allTodos.filter(function (todo) {
        return todo.completed;
      });
    },
    filteredTasks: (state, getters) => (filter) => {
        switch (filter) {
          case "all":
            return getters.allTodos;
          case "active":
            return getters.activeTodos;
          case "completed":
            return getters.completedTodos;
          default:
            return [];
        }
    }
  },
  mutations: {
    addTodo (state, value) {
      state.todos.push({
        id: state.uuid++,
        title: value,
        completed: false
      });
    },
    removeTodo (state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },
    removeCompleted (state) {
      state.todos =  state.todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    allChange (state, value) {
      state.todos.forEach(function(todo) {
        todo.completed = value;
      });
    }
  },
  actions: {
  },
  modules: {
  }
}