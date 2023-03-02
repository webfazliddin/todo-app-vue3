<script setup lang="ts">
import classnames from "classnames";

export interface ITodoCard {
  description: string;
  completed: boolean;
}

withDefaults(defineProps<ITodoCard>(), {
  completed: false,
});

const emit = defineEmits<{
  (e: "on-toggle"): void;
  (e: "on-remove"): void;
}>();

const toggleClick = () => {
  emit("on-toggle");
};

const toggleRemove = () => {
  emit("on-remove");
};
</script>

<template>
  <div
    :class="classnames($style.todoCard, { [$style.isCompleted]: completed })"
  >
    <div :class="$style.action">
      <button :class="$style.toggleButton" type="button" @click="toggleClick">
        <span v-if="completed">✓</span>
      </button>
    </div>

    <div :class="$style.description">{{ description }}</div>

    <div>
      <button :class="$style.removeButton" type="button" @click="toggleRemove">
        <span>✗</span>
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.todoCard {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 6px;
}
.description {
  color: $color-black;
  font-family: $base-font;
  overflow: hidden;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggleButton {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $color-green;
  font-size: 1.5rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid $color-lightgray;
  margin-right: 10px;

  &:hover {
    background-color: rgba(lightgray, 0.1);
  }
}
.removeButton {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $color-white;
  font-size: 1.5rem;
  width: 30px;
  height: 30px;
  background-color: $color-red;

  &:hover {
    background-color: rgb(181, 3, 3);
  }
}

.isCompleted {
  .description {
    color: $color-gray;
    text-decoration: line-through;
  }
}
</style>
