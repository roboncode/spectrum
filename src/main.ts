import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-java'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

createApp(App).use(router).mount('#app')
