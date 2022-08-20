<script setup lang="ts">
const props = defineProps({
  duration: {
    type: [Number, String],
    default: 4000
  },
})
const emit = defineEmits(['opened', 'closed'])
const text = ref('')
const show = ref(false)

const open = (opts?: { text: ''}) => {
  text.value = opts?.text || ''
  show.value = true
  if (props.duration) {
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
    <div v-if="show" class="fixed bottom-3 right-3 text-sm">
      <slot :text="text"></slot>
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
  transform: translateY(10px);
}
</style>