<script setup lang="ts">
const props = defineProps({
  duration: {
    type: [Number, String],
    default: 3000
  },
})
const emit = defineEmits(['opened', 'closed'])
const show = ref(false)

const open = () => {
  console.log('you are here')
  show.value = true
  if(props.duration) {
    setTimeout(() => {
      close()
    }, Number(props.duration))
  }
  emit('opened')
}

const close = () => {
  show.value = false
  emit('closed')
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Transition name="reveal">
    <div v-if="show"
      class="absolute top-0 left-0 right-0 z-50">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.reveal-enter-active,
.reveal-leave-active {
  transition: all 300ms ease;
}

.reveal-enter-from,
.reveal-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>