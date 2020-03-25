<template>
  <li
    :class="{ completed: todo.completed, editing: todo == editedTodo }"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="$emit('remove-todo', $event)"></button>
    </div>
    <input
      class="edit"
      type="text"
      v-model="todo.title"
      v-todo-focus="todo == editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.esc="cancelEdit(todo)"
    />
  </li>
</template>

<script>
export default {
  name: "tree-item",
  props: {
    todo: Object
  },
  data: function () {
    return {
      editedTodo: null,
      beforeEditCache: null,
    }
  },
  methods: {
    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        // this.removeTodo(todo);
        this.$emit("remove-todo", todo);
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus;
      }
    }
  }
}
</script>


<style>

</style>