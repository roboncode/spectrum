<script setup lang="ts">
defineProps(['title'])
</script>

<template>
  <div class="grid gap-2 text-center">
    <div v-if="title" class="text-3xl font-medium">{{ title }}</div>
    <div class="text-gray-600">
      <slot></slot>
    </div>
  </div>
</template>