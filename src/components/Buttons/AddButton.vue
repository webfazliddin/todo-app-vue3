<script setup lang="ts">
const emit = defineEmits<{
  (e: "on-click"): void;
}>();

const handleButtonClick = () => {
  emit("on-click");
};
</script>

<template>
  <button type="button" :class="$style.addButton" @click="handleButtonClick">
    <span>+</span>
  </button>
</template>

<style module lang="scss">
.addButton {
  all: unset;
  position: fixed;
  cursor: pointer;
  font-size: 3rem;
  color: #43be88;
  background-color: #50e3a3;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  bottom: 0;

  &:active {
    background-color: #49d89a;
  }
}
</style>
