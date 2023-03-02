<script setup lang="ts">
import { reactive } from "vue";
import AddButton from "@/components/Buttons/AddButton.vue";
import TodoList from "@/components/Lists/TodoList.vue";
import AddTodoModal from "@/components/Modals/AddTodoModal.vue";
import { useStorage } from "@vueuse/core";
import type { ITodoItemData } from "@/types";

const showAddTodo = reactive({ visible: false });
const todoList = useStorage<ITodoItemData[]>("todo-app-list", []);

const addTodoClick = () => {
  toggleAddTodoModal();
};

const toggleAddTodoModal = () => {
  showAddTodo.visible = !showAddTodo.visible;
};

const onTodoToggle = (data: ITodoItemData) => {
  const updatedTodo: ITodoItemData = {
    ...data,
    completed: !data.completed,
  };

  todoList.value = todoList.value.map((todo) => {
    if (todo.id === updatedTodo.id) {
      return updatedTodo;
    }

    return todo;
  });
};

const onTodoRemove = (data: ITodoItemData) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== data.id);
};
</script>

<template>
  <main :class="$style.main">
    <div :class="$style.todo">
      <div :class="$style.body">
        <div class="container">
          <TodoList
            :list="todoList"
            @on-todo-toggle="(data) => onTodoToggle(data)"
            @on-todo-remove="(data) => onTodoRemove(data)"
          />
        </div>
      </div>

      <div :class="$style.footer">
        <AddButton @on-click="addTodoClick" />
      </div>
    </div>
  </main>

  <AddTodoModal :visible="showAddTodo.visible" @on-close="toggleAddTodoModal" />
</template>

<style module lang="scss">
.main {
  height: 100%;
}

.todo {
  height: 100%;
}
.body {
  max-height: 100%;
  overflow-y: auto;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  place-items: center;
}
</style>
