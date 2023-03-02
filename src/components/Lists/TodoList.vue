<script setup lang="ts">
import type { ITodoItemData } from "@/types";
import TodoCard from "@/components/Card/TodoCard.vue";

export interface ITodoList {
  list: ITodoItemData[];
}

defineProps<ITodoList>();

const emit = defineEmits<{
  (e: "on-todo-toggle", item: ITodoItemData): void;
  (e: "on-todo-remove", item: ITodoItemData): void;
}>();

const itemToggleClick = ({ id, description, completed }: ITodoItemData) => {
  emit("on-todo-toggle", { id, description, completed });
};

const itemRemoveClick = ({ id, description, completed }: ITodoItemData) => {
  emit("on-todo-remove", { id, description, completed });
};
</script>

<template>
  <div :class="$style.todoListWrapper">
    <div v-if="list.length" :class="$style.todoList">
      <TodoCard
        v-for="todo in list"
        :key="todo.id"
        :description="todo.description"
        :completed="todo.completed"
        @on-toggle="() => itemToggleClick(todo)"
        @on-remove="() => itemRemoveClick(todo)"
      />
    </div>

    <div v-else :class="$style.todoEmptyHint">Add your first todo.</div>
  </div>
</template>

<style module lang="scss">
.todoListWrapper {
  width: 100%;
  padding: 10px 0;
  padding-bottom: calc(
    80px + 10px + 4px
  ); // (button height) + (wrapper padding) + (item gap size)
}

.todoList {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
}

.todoEmptyHint {
  color: $color-gray;
  font-family: $base-font;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
}
</style>
