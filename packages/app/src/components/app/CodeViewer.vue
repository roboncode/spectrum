<script setup lang="ts">
import Prism from 'prismjs'

const viewer = ref()
const html = ref('')
const textarea = ref()
let text = ''

const props = defineProps({
    modelValue: {
        type: [String, Object],
    },
    language: {
        type: String,
        default: 'java'
    },
    editable: {
        type: Boolean,
        default: false
    },
})

const select = () => {
    viewer.value.focus()
}

defineExpose({
    select
})

const emit = defineEmits(['viewer:click', 'update:modelValue'])

const clickHandler = (e: any) => {
    if (`${e.target.classList}`.includes('clickable')) {
        emit('viewer:click', e.target.innerText)
    } else {
        emit('viewer:click', '')
    }
}

const textInputHandler = (e: any) => {
    text = ''
    html.value = ''
    emit('update:modelValue', e.target.value)
}

const ignoreClassList = ['String', 'Boolean', 'Int', 'BigInt', 'Float', 'DateTime', 'Json', 'Cascade']

const invalidate = useDebounceFn(() => {
    text = viewer.value.innerText.trim()
    emit('update:modelValue', text)
}, 1)

const decorateModels = useDebounceFn(() => {
    viewer.value.querySelectorAll('.class-name').forEach((el: any) => {
        if (ignoreClassList.includes(el.innerText)) {
            return
        }
        el.classList.add('clickable')
    }
    )
})

const keyDownHandler = (e: KeyboardEvent) => {
    if (e.code.toLowerCase() === 'backspace') {
        const selection = window.getSelection()
        if (selection?.anchorNode?.parentElement?.tagName.toLowerCase() === 'code') {
            e.preventDefault()
            e.stopPropagation()
            setTimeout(() => {
                emit('update:modelValue', '')
            })
            return
        }
    }
    invalidate()
}

const { copy } = useClipboard()

const cutHandler = (e: Event) => {
    const selection = window.getSelection()
    if (selection?.anchorNode?.parentElement?.tagName.toLowerCase() === 'code') {
        text = ''
        copy(`${props.modelValue || ''}`)
        emit('update:modelValue', text)
    }
}

const pasteHandler = (e: ClipboardEvent) => {
    emit('update:modelValue', e.clipboardData?.getData('text/plain'))
}

const highlight = useDebounceFn(() => {
    let val: any = props.modelValue
    if (typeof val !== 'string') {
        val = JSON.stringify(val, null, 2)
    }
    html.value = Prism.highlight(val, Prism.languages[props.language], props.language)
    code.value.innerHTML = html.value || ''
    decorateModels()
})

const code = ref()
watch(() => props.modelValue, useDebounceFn((v: any) => {
    if (text !== v) {
        if (v) {
            highlight()
        } else[
            html.value = ''
        ]
    }
    if (textarea.value) {
        textarea.value.focus()
    }
}, props.editable ? 50 : 0), { immediate: true })
</script>

<template>
    <div class="container" :class="{'editor': editable}">
        <pre ref="viewer" class="editor text-xs ring-0 p-4 w-full h-full" :class="{ hidden: !modelValue }"
            @keydown="keyDownHandler($event)" @cut="cutHandler($event)" @paste="pasteHandler($event)"
            @click="clickHandler($event)"><code ref="code" :contenteditable="editable" spellcheck="false" class="border-none focus:ring-0 focus:ring-offset-0 focus:outline-none min-w-full min-h-full"></code></pre>
        <textarea v-if="!modelValue" ref="textarea"
            class="w-full h-full bg-transparent p-4 text-sm color-base outline-none resize-none"
            v-model="modelValue" placeholder="Paste your code here..." @input="textInputHandler($event)"></textarea>
    </div>
</template>

<style>
.dark .container.editor {
    @apply absolute top-0 left-0 w-full h-full;
}

.dark .editor {
    color: #00ffeb;
}

.dark .token.boolean {
    color: #00ffa7;
}

.dark .token.string {
    color: #00ff2f
}

.dark .token.class-name {
    color: #f05eff;
}

.dark .token.clickable {
    color: #00a0fd;
    padding: 2px 4px;
}

.dark .token.clickable:hover {
    color: black;
    background-color: #00a0fd;
    border-radius: 4px;
    cursor: pointer;
}

.dark .token.property {
    color: #00b7ff;
}

.dark .token.operator {
    color: #ffa500;
    background-color: transparent;
}

.dark .token.number {
    color: #ffa600
}

.dark .token.function {
    color: #ffa600
}

.dark .token.keyword {
    color: #f05eff
}
</style>