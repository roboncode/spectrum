<script setup lang="ts">
const props = defineProps({
  'modelValue': {
    type: Boolean,
    default: false
  },
  "right": {
    type: [Boolean, String],
    default: false
  },
  "blockerClass": {
    type: String,
    default: 'bg-black/10'
  },
  "drawerClass": {
    type: String,
    default: 'bg-white'
  },
})
const emit = defineEmits(['update:modelValue'])

const scrollLocked = useScrollLock(document.body)
const className = computed(() => {
  let drawerClass = props.drawerClass + ' '
  if(props.right.toString() === 'true') {
    drawerClass +=  props.modelValue ? 'translate-x-0 right-0' : 'translate-x-100% right-0'
  } else {
    drawerClass += props.modelValue ? '-translate-x-0 left-0' : '-translate-x-100% left-0'
  }
  return drawerClass
})

watch(() => props.modelValue, (val: boolean) => scrollLocked.value = val, { immediate: true })

const close = () => emit('update:modelValue', false)
const router = useRouter()
router.beforeEach(() => {
  close()
  scrollLocked.value = false
})
</script>

<template>
  <div>
    <Transition>
      <div v-if="modelValue" class="fixed top-0 left-0 w-screen h-screen z-20" :class="blockerClass"  @click="close()"></div>
    </Transition>
    <div
      class="fixed top-0 flex flex-col h-screen w-full md:max-w-80 overflow-hidden drop-shadow-lg z-20 duration-250"
      :class="className">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>