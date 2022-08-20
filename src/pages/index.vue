<script setup lang="ts">
import { generateSchemas } from '../generators/schema'
import { generateTypeScript } from '../generators/typescript'
import { generateService } from '../generators/service'
import { generateTokens } from '../generators/token'
import { EnumToken } from '../generators/token/enumTokenizer'
import { ModelToken } from '../generators/token/modelTokenizer'
import Snackbar from '../components/core/Snackbar.vue'
import CodeViewer from '~/components/app/CodeViewer.vue'

const tokens = ref<{ enumTokens: EnumToken[]; modelTokens: ModelToken[] }>()
const schemas = ref<any[]>([])
const typescript = ref('')
const service = ref('')
const input = useLocalStorage('prisma:input', '')
const generatorType = useLocalStorage<'token' | 'schema' | 'typescript' | 'service' | 'mongodb'>('prisma:generatorType', 'schema')
const operationType = useLocalStorage<'create' | 'read' | 'update' | 'delete'>('prisma:operationType', 'read')
const { copy } = useClipboard()
const snackbar = ref<typeof Snackbar>()
const selectedModel = ref('')

const filteredSchema = computed(() => {
  if (selectedModel.value) {
    return schemas.value.filter(schema => {
      return schema.$id.replace(/(Create)|(Update)|(Delete)|(Input)|(Schema)/g, "") === selectedModel.value
    })
  }
  return schemas.value
})

const filteredEnumTokens = computed(() => {
  const enumTokens = tokens.value && tokens.value.enumTokens || []
  if (selectedModel.value) {
    return enumTokens.filter(token => {
      return token.name === selectedModel.value
    })
  }
  return enumTokens
})

const filteredTypeTokens = computed(() => {
  const modelTokens = (tokens.value && tokens.value.modelTokens || []).filter(token => token.type === 'type')
  if (selectedModel.value) {
    return modelTokens.filter(token => {
      return token.name === selectedModel.value
    })
  }
  return modelTokens
})

const filteredModelTokens = computed(() => {
  const modelTokens = (tokens.value && tokens.value.modelTokens || []).filter(token => token.type === 'model')
  if (selectedModel.value) {
    return modelTokens.filter(token => {
      return token.name === selectedModel.value
    })
  }
  return modelTokens
})

const copyToClipboard = (source: any) => {
  if (typeof source !== 'string') {
    source = JSON.stringify(source, null, 2)
  }
  copy(source)
  snackbar.value?.open({ text: 'Copied to clipboard!' })
}

const viewerClickHandler = (name: string) => {
  if (name) {
    selectedModel.value = name
  }
  // selectedModel.value = name || ''
}

watch([input, operationType, generatorType], async (v) => {
  tokens.value = await generateTokens(input.value)
  if (tokens.value && generatorType.value === 'schema') {
    schemas.value = generateSchemas(operationType.value, tokens.value.modelTokens, tokens.value.enumTokens)
  } else if (tokens.value && generatorType.value === 'typescript') {
    typescript.value = generateTypeScript(operationType.value, tokens.value.modelTokens, tokens.value.enumTokens)
  } else if (tokens.value && generatorType.value === 'service') {
    service.value = generateService(tokens.value.modelTokens)
  }
}, { immediate: true })


const codeEditor = ref()

const useExample = async () => {
  const results = await fetch('/example-schema.prisma')
  input.value = await results.text()
}

onMounted(async () => {
  if (!input.value) {
    useExample()
  }
})
</script>

<template>
  <teleport to="#actions">
    <div class="h-row h-14 justify-end items-end">
      <div class="tabs justify-end items-end h-10">
        <input type="radio" name="generator" value="token" data-title="Tokenized" class="tab mb-0"
          v-model="generatorType" />
        <input type="radio" name="generator" value="schema" :data-title="`JSON Schema`" class="tab"
          v-model="generatorType" />
        <input type="radio" name="generator" value="typescript" :data-title="`TS Typings`" class="tab"
          v-model="generatorType" />
        <input type="radio" name="generator" value="service" :data-title="`Service Layer`" class="tab"
          v-model="generatorType" />
        <input type="radio" name="generator" value="mongodb" :data-title="`MongoDB`" class="tab"
          v-model="generatorType" />
      </div>
    </div>
  </teleport>

  <div class="fixed top-14 pb-14 left-0 w-full h-screen flex bg-base">
    <div class="relative w-full h-full overflow-auto line-numbers">
      <div class="sticky top-0 w-full h-row p-2 z-1">
        <div class="flex-grow"></div>
        <!-- <button class="btn bg-base border-base" @click="selectedModel = ''">Clear Select Model</button> -->
        <button v-if="input" class="btn bg-base border-base" @click="input = ''">Clear</button>
        <button v-else="input" class="btn bg-base border-base" @click="useExample()">Use Prisma
          Example</button>
      </div>
      <CodeViewer ref="codeEditor" class="pb-8" v-model="input" :editable="true"
        @viewer:click="viewerClickHandler($event)" />
    </div>
    <div class="w-1 bg-highlight"></div>
    <div class="w-full h-full overflow-y-auto color-base">
      <div v-if="generatorType === 'schema' || generatorType === 'typescript'"
        class="sticky top-0 w-full tabs bg-base color-base border-b border-base z-1">
        <input type="radio" name="operation" value="create" data-title="Create" class="tab" v-model="operationType" />
        <input type="radio" name="operation" value="read" :data-title="`Read`" class="tab" v-model="operationType" />
        <input type="radio" name="operation" value="update" :data-title="`Update`" class="tab"
          v-model="operationType" />
        <input type="radio" name="operation" value="delete" :data-title="`Delete`" class="tab"
          v-model="operationType" />
        <div class="flex-grow"></div>
        <div class="px-4 font-bold text-light-blue-400">{{ selectedModel }}</div>
      </div>

      <!-- token -->
      <div v-if="generatorType === 'token'">
        <!-- <vue-json-pretty :data="tokens" /> -->
        <div v-if="!selectedModel || filteredEnumTokens.length">
          <div class="bg-highlight color-base p-4 py-2 text-sm uppercase font-bold">Enums</div>
          <div v-for="token in filteredEnumTokens">
            <div class="sticky top-0 h-row bg-base border-y border-base color-base px-4 p-2 gap-4">
              <div class="text-xs uppercase font-bold rounded bg-highlight px-3 py-1">Enum</div>
              <div class="font-bold">{{ token.name }}</div>
              <div class="flex-grow"></div>
              <button v-if="selectedModel" class="btn bg-base border-base" @click="selectedModel = ''">Show All</button>
              <button class="btn bg-base border-base btn-icon" @click="copyToClipboard(token)">
                <span class="i-tabler-clipboard text-lg"></span>
              </button>
            </div>
            <CodeViewer :modelValue="token" />
          </div>
        </div>
        <div v-if="!selectedModel || filteredTypeTokens.length">
          <div class="bg-highlight color-base p-4 py-2 text-sm uppercase font-bold">Types</div>
          <div v-for="token in filteredTypeTokens">
            <div class="sticky top-0 h-row bg-base border-y border-base color-base px-4 p-2 gap-4">
              <div class="text-xs uppercase font-bold rounded bg-highlight px-3 py-1">Type</div>
              <div class="font-bold">{{ token.name }}</div>
              <div class="flex-grow"></div>
              <button v-if="selectedModel" class="btn bg-base border-base" @click="selectedModel = ''">Show All</button>
              <button class="btn bg-base border-base btn-icon" @click="copyToClipboard(token)">
                <span class="i-tabler-clipboard text-lg"></span>
              </button>
            </div>
            <CodeViewer :modelValue="token" />
          </div>
        </div>
        <div v-if="!selectedModel || filteredModelTokens.length">
          <div class="bg-highlight color-base p-4 py-2 text-sm uppercase font-bold">Models</div>
          <div v-for="token in filteredModelTokens">
            <div class="sticky top-0 h-row bg-base border-y border-base color-base px-4 p-2">
              <div class="text-xs uppercase font-bold rounded bg-highlight px-3 py-1">Model</div>
              <div class="font-bold">{{ token.name }}</div>
              <div class="flex-grow"></div>
              <button v-if="selectedModel" class="btn bg-base border-base" @click="selectedModel = ''">Show All</button>
              <button class="btn bg-base border-base btn-icon" @click="copyToClipboard(token)">
                <span class="i-tabler-clipboard text-lg"></span>
              </button>
            </div>
            <CodeViewer :modelValue="token" />
          </div>
        </div>
      </div>

      <!-- schema -->
      <div v-else-if="generatorType === 'schema'">
        <div v-for="schema in filteredSchema" class="bg-base">
          <div class="sticky top-10 h-row bg-shade color-base border-y border-base px-4 p-2">
            <div class="font-bold">{{ schema.$id }}</div>
            <div class="flex-grow"></div>
            <button class="btn bg-base border-base btn-icon" @click="copyToClipboard(schema)">
              <span class="i-tabler-clipboard text-lg"></span>
            </button>
          </div>
          <CodeViewer :modelValue="schema" language="json" class="text-xs" />
        </div>
        <div v-if="filteredSchema.length === 0" class="text-center p-10 font-medium text-base">No <span
            class="font-bold text-light-blue-400">@{{ operationType.toLowerCase() }}</span> defined in <span
            class="font-bold text-light-blue-400">{{ selectedModel }}</span></div>
      </div>

      <!-- typescript -->
      <div v-else-if="generatorType === 'typescript' && typescript">
        <CodeViewer :modelValue="typescript" language="typescript" />
      </div>

      <!-- service -->
      <div v-else-if="generatorType === 'service' && service">
        <CodeViewer :modelValue="service" language="typescript" />
        <button class="absolute top-4 right-4 btn bg-base border-base btn-icon" @click="copyToClipboard(service)">
          <span class="i-tabler-clipboard text-lg"></span>
        </button>
      </div>

      <div v-else-if="generatorType === 'mongodb'">
        <div class="p-10 text-center">When available, will provide indexing commands to ensure MongoDB is in sync with
          Prisma schema. Currently in development.</div>
      </div>
    </div>
  </div>

  <Snackbar ref="snackbar" v-slot="slotProps">
    <div class="snackbar-content gap-2">
      <span class="i-tabler-check text-green-400 text-xl"></span>
      <span>{{ slotProps.text }}</span>
    </div>
  </Snackbar>
</template>

<style>
.vjs-value__string {
  color: #00843c;
}
</style>