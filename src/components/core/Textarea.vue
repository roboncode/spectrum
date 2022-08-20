<script setup lang="ts">
const props = defineProps(['id', 'name', 'type', 'label', 'placeholder', 'modelValue', 'validation', 'readonly', 'disabled', 'autocomplete', 'mask', 'inputClass', 'min', 'max'])
const emit = defineEmits(['update:modelValue'])
const hasErrors = computed(() => props.validation && props.validation.$dirty && props.validation.$silentErrors.length)
</script>

<template>
  <div class="space-y-2">
    <div v-if="$slots.name || label" class="flex items-center justify-between">
      <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <slot name="append:label" />
    </div>
    <div class="relative">
      <slot name="prepend" />
      <textarea :id="id" :type="type" :name="name" :placeholder="placeholder" :autocomplete="autocomplete"
        :disabled="disabled" :readonly="readonly" :min="min" :max="max"
        class="textinput" :class="hasErrors ? `${inputClass} border-red-500` : inputClass" :value="modelValue"
        @input="(evt: any) => emit('update:modelValue', evt.target.value)" />
      <slot name="append" />
    </div>
    <div v-if="hasErrors" class="text-red-500 text-sm">
      {{ validation.$silentErrors[0].$message }}
    </div>
  </div>
</template>
