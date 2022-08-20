<script setup lang="ts">
const { y } = useWindowScroll()
const { width } = useWindowSize()
const content = ref<HTMLDivElement>()
const stickyOffset = ref('0px')
const appBar = document.querySelector('[name=appbar]') as HTMLElement
const teleportHeaderEnabled = ref(false)


watch([y, width], () => {
  teleportHeaderEnabled.value = y.value >= 100
  stickyOffset.value = (Number(content.value?.offsetHeight || 0) * -1 + appBar.offsetHeight -2) + 'px'
})
</script>

<template>
  <div class="card sticky z-5" :style="{ top: stickyOffset }" :class="{ 'rounded-none border-b-3': teleportHeaderEnabled }">
    <div ref="content">
      <slot></slot>
    </div>

    <teleport v-if="teleportHeaderEnabled" to="#header">
      <slot name="teleport"></slot>
    </teleport>
    <slot name="sticky"></slot>
  </div>
</template>