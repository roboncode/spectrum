<script setup lang="ts">
import Prism from 'prismjs'

const textInput = ref()
const html = ref('')

const props = defineProps({
    code: {
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
    textInput.value.focus()
}

defineExpose({
    select
})

const emit = defineEmits(['viewer:click'])

const inputHandler = (e: any) => {
    html.value = Prism.highlight(e.target.innerText, Prism.languages[props.language], props.language)
}

const clickHandler = (e: any) => {
    if (`${e.target.classList}`.includes('class-name')) {
        emit('viewer:click', e.target.innerText)
    } else {
        emit('viewer:click', '')
    }
}

watch(() => props.code, (v: any) => {
    if (v) {
        if (typeof v !== 'string') {
            v = JSON.stringify(v, null, 2)
        }
        html.value = Prism.highlight(v, Prism.languages[props.language], props.language)
    } else[
        html.value = ''
    ]

    nextTick(() => {

    })
}, { immediate: true })
</script>

<template>
    <pre ref="textInput" class="editor text-xs ring-0 p-4 w-full h-full"
        @click="clickHandler($event)"><code v-html="html" :contenteditable="editable" class="border-none focus:ring-0 focus:ring-offset-0 focus:outline-none" @input="inputHandler($event)"></code></pre>
</template>

<style>
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
    padding: 5px;
}

.dark .token.class-name:hover {
    color: black;
    background-color: #00a0fd;
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