<script setup lang="ts">
import { useImageToDataUrl } from './composables/image'
const props = defineProps({
  width: {
    type: [String, Number],
    default: 48,
  },
  height: {
    type: [String, Number],
    default: 48,
  },
  src: {
    type: [File, String],
    default: '',
  },
})

const emit = defineEmits(['change'])
const source = ref()
const dataUrl = ref()

watch(
  () => props.src,
  async (val) => {
    if (val instanceof File) {
      if (
        val.type === 'image/jpeg'
        || val.type === 'image/png'
        || val.type === 'image/gif'
        || val.type === 'image/svg+xml'
        || val.type === 'image/webp'
      ) {
        source.value = URL.createObjectURL(val)
        dataUrl.value = await useImageToDataUrl(val, Number(props.width), Number(props.height))
        emit('change', dataUrl.value)
      }
    } else {
      emit('change', val)
      return val
    }
  },
  { immediate: true },
)

</script>

<template>
  <img :src="dataUrl" class="bg-contain">
</template>
