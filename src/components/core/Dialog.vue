<script setup lang="ts">
defineProps(["title", 'subtitle'])
const emit = defineEmits(['close:click', 'keypress:enter'])

const dialog = ref()
const content = ref()

const isLocked = useScrollLock(document.body, true)

const close = () => {
  emit('close:click')
}

onMounted(() => {
  dialog.value.showModal()
  onClickOutside(dialog.value, () => emit('close:click'))
})

onBeforeUnmount(() => {
  isLocked.value = false
})
</script>

<template>
  <dialog ref="dialog" class="p-0 rounded-lg drop-shadow-lg">

    <div ref="content" class="mt-14 px-6 py-4 gap-5 overflow-y-auto max-h-200">
      <div>
        <slot></slot>
      </div>
    </div>

    <div class="fixed top-0 left-0 w-full h-14 p-4 pr-0 border-b border-gray-200 bg-white flex items-center">
      <div>
        <div v-if="title" class="text-lg font-medium">{{ title }}</div>
        <div v-if="subtitle" class="whitespace-nowrap">{{ subtitle }}</div>
      </div>
      <div class="flex-grow"></div>

      <button class="min-w-12 min-h-12 flex items-center justify-center rounded-full hover:bg-light-400/10"
        @click="close">
        <span class="i-tabler-x text-xl"></span>
      </button>
    </div>

    <div v-if="$slots.footer"
      class="flex bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 flex items-center gap-3">
      <slot name="footer"></slot>
    </div>

  </dialog>
</template>
