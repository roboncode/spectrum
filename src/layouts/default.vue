<script setup lang="ts">
import PrismaLogo from '~/components/app/PrismaLogo.vue';
const scrollLocked = useScrollLock(document.body)
const { y } = useScroll(window)
const appbarClass = computed(() => {
  if (y.value > 25) return 'drop-shadow-md'
  return ''
})

const showDrawer = ref(false)

const isDark = useDark({})
const toggleDark = useToggle(isDark)
</script>

<template>

  <!-- :: APP BAR :: -->
  <div name="appbar" class="sticky top-0 left-0 w-full h-14 flex border-base border-b gap-2 pl-4 z-10"
    :class="appbarClass">
    <div class="top-4 left-4 flex items-center gap-3 h-14 text-xl">
      <!-- <button class="flex rounded-full w-10 h-10 items-center justify-center" @click="showDrawer = !showDrawer">
        <span class="i-tabler-menu-2"></span>
      </button> -->
      <!-- <button class="flex rounded-full w-10 h-10 items-center justify-center" @click="toggleDark()">
        <span class="i-tabler-moon"></span>
      </button> -->
      <div class="i-simple-icons-prisma text-2xl text-light-blue-400"></div>
      <div class="hidden md:block font-bold whitespace-nowrap">Prisma Tools</div>
    </div>
    <div id="actions" class="w-full"></div>
  </div>

  <!-- :: NAVIGATION DRAWER :: -->
  <Drawer name="menu" v-model="showDrawer" right="false">
    <div class="flex items-center gap-1 h-10 p-4 pl-6 pr-2 pt-7 gap-3">
      <img src="/favicon-32x32.png" class="overflow-hidden rounded">
      <div class="font-bold flex-grow">CourtSoft</div>
      <button class="xl:hidden w-12 h-12 flex items-center justify-center rounded-full" @click="showDrawer = false">
        <span class="i-tabler-x text-2xl"></span>
      </button>
    </div>
    <div class="flex-grow pt-5 pr-4 min-w-80 max-w-50 overflow-y-auto">
      <router-link to="/" class="menu-item" active-class="menu-item-active" @click="showDrawer = false">
        <span class="i-tabler-home text-2xl"></span>
        <span>Home</span>
      </router-link>
    </div>
  </Drawer>

  <!-- :: MAIN :: -->
  <div name="content" class="flex">
    <!-- <main class="relative md:p-2 w-full flex flex-col items-center"> -->
    <router-view />
    <!-- </main> -->
    <div id="sidebar" @mouseover="scrollLocked = true" @mouseout="scrollLocked = false"></div>
  </div>
</template>

<style>
body {
  @apply bg-base color-base;
}
</style>
