<script setup lang="ts">
defineProps(['id', 'name', 'type', 'label', 'desc', 'placeholder', 'modelValue', 'errors', 'autocomplete', 'readonly', 'disabled', 'mask', 'min', 'max', 'inputClass'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="space-y-2">
    <div v-if="$slots.name || label" class="flex items-center justify-between">
      <label :for="name" class="pl-1 pt-1 text-sm font-medium text-gray-700">{{ label }}</label>
      <slot name="label" />
    </div>
    <div class="relative flex items-center gap-2">
      <slot name="prepend" />
      <input :id="id" :type="type" :name="name" :placeholder="placeholder" :autocomplete="autocomplete"
        :readonly="readonly" :disabled="disabled" :min="min" :max="max" class="textinput"
        :class="errors?.length ? `${inputClass} border-red-500` : inputClass" :value="modelValue"
        @focus="(evt: any) => evt.target.select()" @input="(evt: any) => emit('update:modelValue', evt.target.value)" />
      <slot name="append" />
    </div>
    <slot v-if="$slots.desc" name="desc" class="text-gray-500 text-sm pl-1" />
    <span v-for="error in errors" :key="error.$uid" class="text-red-500 text-sm">
      {{ error.$message }}
    </span>
  </div>
</template>
