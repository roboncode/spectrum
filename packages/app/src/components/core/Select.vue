<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Object, String, Number, Boolean],
  },
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  defaultOption: {
    type: Object,
    default: () => null,
  },
  itemLabel: {
    type: String,
    default: 'label',
  },
  itemValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])

const changeHandler = (evt: any) => {
  let value = evt.target.value as any
  if (typeof value === 'object') {
    if (props.itemValue) {
      value = value[props.itemValue]
    }
  }
  emit('update:modelValue', JSON.parse(value))
}
</script>

<template>
  <div>
    <div class="w-full space-y-2">
      <label class="pl-1 text-sm font-medium">{{ label }}</label>
      <div class="w-full relative">
        <select class="w-full border px-3 py-2 border-gray-300 rounded-md appearance-none truncate pr-7"
          :value="JSON.stringify(modelValue)" @change="changeHandler">
          <option v-if="defaultOption" :value="JSON.stringify(defaultOption)">{{
              defaultOption[itemLabel]
          }}</option>
          <option v-for="item in items" :key="item" :value="JSON.stringify(item)">{{
              item[itemLabel]
          }}</option>
        </select>
        <span class="i-tabler-chevron-down absolute right-2 top-50% -translate-y-50% pointer-events-none"></span>
      </div>
    </div>
  </div>
</template>
