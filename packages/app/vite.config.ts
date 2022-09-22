import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import path from 'path'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import transformerDirective from '@unocss/transformer-directives'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false,
    port: 8765,
    watch: {
      ignored: ['files/**', 'api/**']
    }
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        // 'vue-i18n',
        // '@vueuse/head',
        '@vueuse/core',
        // 'vitest',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // allow auto load of component located in these directories
      dirs: ['./src/components'],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),
    Pages(),
    Layouts(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
      theme: {
        colors: {
          primary: '#3B82F6',
          highlight: '#F9FAFB',
          danger: '#EF4444',
        },
      },
      shortcuts: {
        'border-base': 'border-gray-200 dark:border-dark-200',
        'bg-base': 'bg-white dark:bg-dark-700',
        'bg-shade': 'bg-gray-100/50 dark:bg-dark-500',
        'bg-highlight': 'bg-gray-100 dark:bg-dark-300',
        'color-base': 'text-gray-900 dark:text-gray-300',
        'color-fade': 'text-gray-900:50 dark:text-gray-300:50',
        'input-base': 'text-gray-900 dark:text-light-blue-400',
        'textinput': 'w-full border px-3 py-2 border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-400 resize-none',
        "btn-primary": 'flex items-center justify-center px-6 py-3 space-x-1 text-sm font-semibold leading-4 text-center transition-colors duration-300 bg-primary rounded hover:bg-blue-600 text-blue-50',
        "btn-danger": 'flex items-center justify-center px-6 py-3 space-x-1 text-sm font-semibold leading-4 text-center transition-colors duration-300 bg-danger rounded hover:bg-red-600 text-blue-50',
        'btn-disabled': 'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-default disabled:pointer-events-none disabled:drop-shadow-none disabled:select-none',
        "btn": 'inline-flex whitespace-nowrap items-center justify-center px-6 py-2 space-x-2 text-sm font-semibold text-center text-gray-200 border border-gray-200 bg-white rounded-md hover:bg-highlight hover:drop-shadow-sm disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-default disabled:pointer-events-none disabled:drop-shadow-none disabled:select-none',
        "btn-sm": 'py-1 px-3 text-sm',
        "btn-icon": 'p-2 text-lg',
        "btn-outline-primary": 'border-primary text-primary',
        "btn-outline-success": 'border-green-600 text-green-600',
        "link": "font-semibold text-primary hover:underline cursor-pointer",
        "avatar": "flex items-center justify-center uppercase font-bold bg-primary text-white text-xl w-12 h-12 overflow-hidden rounded-full border-4 border-white",
        "menu-item": "flex items-center gap-4 cursor-pointer p-2 px-5 text-gray-600 hover:bg-highlight hover:rounded-r-full text-sm font-medium",
        "menu-item-active": "text-primary !bg-blue-50 rounded-r w-full",
        "snackbar-content": "flex items-center gap-1 px-5 py-3 bg-black rounded text-white text-sm font-bold drop-shadow-lg",
        "sidebar": "fixed top-18 bottom-0 w-100",
        "card": "bg-white border-1 border-gray-200 md:rounded-lg overflow-hidden",
        "card-content": "p-2 md:p-6",
        "card-header": "flex items-center gap-3 py-3 pl-8 pr-4 border-b border-gray-200 font-bold",
        "card-footer": "py-4 px-6 flex items-center border-t border-t-gray-200",
        "card-info": "border-none md:border-1 md:border-primary bg-blue-50 text-primary px-4 md:px-6 py-3",
        "h-row": "flex items-center flex-wrap gap-2",
        "row-hover": "hover:bg-gray-50 hover:cursor-pointer",
        "ring-status": "w-4 h-4 rounded-full border-4",
        "table-scrollable": "relative block max-h-96 border border-gray-200 rounded overflow-y-auto",
        "table-header-sticky": "bg-gray-50 border-b border-gray-200 sticky top-0 z-1",
        "table-row-link": "hover:bg-gray-50 font-medium cursor-pointer",
        "center-center": "hover:bg-gray-50",
        "transform-center": "absolute top-50% left-50% -translate-50%",
      },
      transformers: [
        transformerDirective(),
      ],
    }),
  ],
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      // '@vueuse/head',
    ],
    exclude: ['vue-demi'],
  },
})
