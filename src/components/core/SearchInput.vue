<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <Textfield :placeholder="placeholder" class="w-full lg:w-sm" input-class="rounded-full px-5" v-model="modelValue"
    @input="(evt: any) => emit('update:modelValue', evt.target.value)">
    >
    <template #append>
      <button v-if="modelValue" class="absolute right-2 btn btn-sm px-1 rounded-full " @click="emit('update:modelValue', '')">
        <span class="i-tabler-x"></span>
      </button>
    </template>
  </Textfield>
</template>