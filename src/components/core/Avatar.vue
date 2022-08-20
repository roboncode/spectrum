<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})

const initial = computed(() => {
  if (props.text)
    return props.text[0]
})
</script>

<template>
  <div>
    <img v-if="src" :src="src" :alt="text">
    <div v-else-if="text">
      {{ initial }}
    </div>
  </div>
</template>
