<script setup lang="ts">
defineProps(['trackClass', 'thumbClass', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="switch flex items-center gap-2 cursor-pointer">
    <div class="select-none">
      <slot name="prepend" />
    </div>
    <div class="switch-track relative h-full aspect-2/1 box-content" :class="trackClass">
      <input :checked="modelValue" @input="(evt: any) => emit('update:modelValue', evt.target.checked)" type="checkbox" class="sr-only" />
      <div class="switch-thumb aspect-1/1 absolute top-50% h-90%" :class="thumbClass" />
    </div>
    <div class="select-none">
      <slot />
    </div>
  </label>
</template>

<style>
.switch-thumb {
  will-change: transform, left;
  transition: left 200ms ease, transform 200ms ease;
  transform: translate(10%, -50%);
}

.switch input:checked~.switch-thumb {
  transform: translate(110%, -50%);
}
</style>