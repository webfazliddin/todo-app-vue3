<script setup lang="ts">
import { ref, watch } from "vue";
import classnames from "classnames";
import type { VNodeRef } from "vue";
import { onClickOutside, useStorage } from "@vueuse/core";
import type { ITodoItemData } from "@/types";

export interface IAddTodoModal {
  visible: boolean;
}

const emit = defineEmits<{
  (e: "on-close"): void;
}>();

const formTarget = ref<VNodeRef | null>(null);

const todoDescription = ref("");
const error = ref("");

const todoList = useStorage<ITodoItemData[]>("todo-app-list", []);

onClickOutside(formTarget, () => {
  emit("on-close");
});

const props = defineProps<IAddTodoModal>();

const addNewTodo = () => {
  if (todoDescription.value) {
    const nextId = todoList.value.length + 1;

    todoList.value.push({
      id: nextId,
      description: todoDescription.value,
      completed: false,
    });

    todoDescription.value = "";
    emit("on-close");
  } else {
    error.value = "* Please add some text";
  }
};

watch(todoDescription, (newValue, _) => {
  if (newValue) {
    // Reset error when user started typing and input value is more 1 character
    error.value = "";
  }
});

watch(
  () => props.visible,
  (newValue, _) => {
    // Reset error
    if (!newValue && error.value !== "") {
      error.value = "";
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" :class="$style.addTodoModal">
      <div class="container">
        <div ref="formTarget" :class="$style.addTodoForm">
          <div :class="$style.top">
            <button
              :class="$style.topButton"
              type="button"
              @click="emit('on-close')"
            >
              <span>✗</span>
            </button>
          </div>

          <div :class="classnames($style.row, { [$style.hasError]: error })">
            <input
              v-model="todoDescription"
              :class="$style.input"
              type="text"
              placeholder="Add your to do here"
              @keypress.enter="addNewTodo"
            />

            <div :class="$style.inputError">{{ error }}</div>
          </div>

          <div :class="$style.row">
            <button :class="$style.button" type="button" @click="addNewTodo">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style module lang="scss">
.addTodoModal {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(black, 0.5);
}
.top {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
}
.topButton {
  all: unset;
  cursor: pointer;
  font-size: 2rem;
  color: rgb(109, 108, 108);
}
.title {
  font-family: $base-font;
  text-align: center;
  margin-bottom: 1rem;
}
.addTodoForm {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  max-width: 768px;
  min-height: 300px;
  padding: 1rem;
  background-color: white;
}
.row {
  width: 100%;
  margin-bottom: 1rem;
}

.button {
  cursor: pointer;
  color: $color-white;
  background-color: $color-lightgreen;
  border: none;
  transition: box-shadow 0.15s ease-in-out;
  padding: 18px;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.16);
  }
}
.hasError {
  .input {
    border: 2px solid red;
  }
  .inputError {
    display: block;
  }
}

.input {
  width: 100%;
  padding: 16px;
  border: 2px solid lightgray;
  border-radius: 6px;
}

.inputError {
  display: none;
  color: red;
  padding: 0 6px;
  margin-top: 6px;
}
.input,
.button {
  font-family: $base-font;
  width: 100%;
  font-size: 14px;
  border-radius: 8px;
}
</style>
