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
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    Task
  },
  data: function() {
    return {
      newTodo: "",
      editedTodo: null,
      visibility: "all"
    }
  },
  computed: {
    ...mapState({
      todos: state => state.tasks.todos,
      uuid: state => sate.tasks.uuid
    }),
    ...mapGetters('tasks', [
      'filteredTasks',
      'activeTodos'
    ]),
    filteredTodos: function () {
      return this.filteredTasks(this.visibility);
    },
    remaining: function() {
      return this.activeTodos.length;
    },
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.allChange(value);
      }
    },
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? "item" : "items";
    }
  },
  methods: {
    ...mapMutations('tasks', [
      'removeTodo',
      'removeCompleted',
      'allChange'
    ]),
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.$store.commit('addTodo', value);
      this.newTodo = "";
    },

    filtering: function(filterName) {
      this.visibility = filterName;
    }
  },
  beforeMount() {
    // for debug
  }
}
</script>

<style>
@import 'https://unpkg.com/todomvc-app-css@2.2.0/index.css';

v-cloak {
  display: none;
}
</style>
