<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDone"
        />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <Task
            v-for="todo in filteredTodos"
            :todo="todo"
            class="todo"
            :key="todo.id"
            @remove-todo="removeTodo"
          ></Task>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong> {{remaining | pluralize}} left
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility == 'all' }" @click="filtering('all')">ALL</a>
          </li>
          <li>
            <a
              href="#/active"
              :class="{ selected: visibility == 'active' }"
              @click="filtering('active')"
            >Active</a>
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibility == 'completed' }"
              @click="filtering('completed')"
            >Completed</a>
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="todos.length > remaining"
        >Clear Completed</button>
      </footer>
    </section>
  </div>
</template>

<script>
import Task from './components/Task.vue'

var STORAGE_KEY = "todos-vuejs-2.0";
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

export default {
  name: 'app',
  components: {
    Task
  },
  data: function() {
    return {
      todos: todoStorage.fetch(),
      newTodo: "",
      editedTodo: null,
      visibility: "all"
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.todos.forEach(function(todo) { 
          todo.completed = value;
        });
      }
    },
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? "item" : "items";
    }
  },
  methods: {
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        title:value,
        completed: false
      });
      this.newTodo = "";
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos);
    },

    filtering: function(filterName) {
      this.visibility = filterName;
    }
  }
}
</script>

<style>
@import 'https://unpkg.com/todomvc-app-css@2.2.0/index.css';

v-cloak {
  display: none;
}
</style>
