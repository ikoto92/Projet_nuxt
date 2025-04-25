<template>
    <form class="flex items-center max-w-sm mx-auto" @submit.prevent>
      <label for="simple-search" class="sr-only">Rechercher</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          v-model="searchValue"
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Rechercher une heure (ex : 14h00)"
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span class="sr-only">Rechercher</span>
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue'
  
  const props = defineProps<{ modelValue: string }>()
  const emit = defineEmits(['update:modelValue'])
  
  const searchValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  </script>
  