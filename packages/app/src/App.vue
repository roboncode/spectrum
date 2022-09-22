<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-size: 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus Ring */

:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.8);
}

::-moz-selection { /* Code for Firefox */
  color: white;
  background: #007bcc;
}

::selection {
  color: white;
  background: #007bcc;
}

/* Tooltip */
.v-popper__popper {
  font-size: 0.8rem;
}

/* Tabs */
.tabs {
  @apply flex items-center select-none gap-2 text-sm
}

.tabs input[type='radio'] {
  appearance: none;
}

.tabs input[type='radio']:before {
  content: attr(data-title);
}

.tabs .tab {
  @apply border-b-3 border-transparent px-4 py-2 cursor-pointer;
}

.tabs .tab:hover {
  @apply border-base
}

.tabs .tab[disabled] {
  @apply color-base;
}

.tabs:not(.tabs-outline) .tab-active,
.tabs:not(.tabs-outline) .tab:checked,
.tabs:not(.tabs-outline) .tab:checked+label {
  @apply border-b-light-blue-400 font-bold;
}

.tabs .tab:focus {
  box-shadow: none;
}


/* Button Group */
.btn-group {
  @apply flex items-center select-none gap-2
}

.btn-group input[type='radio'] {
  appearance: none;
}

.btn-group input[type='radio']:before {
  content: attr(data-title);
}

.btn-group:not(.btn-group-outline) .btn-active,
.btn-group:not(.btn-group-outline) .btn:checked,
.btn-group:not(.btn-group-outline) .btn:checked+label {
  @apply text-light-blue-400 color-base;
}

.btn-group-circle .btn {
  @apply cursor-pointer rounded-full;
}
</style>
