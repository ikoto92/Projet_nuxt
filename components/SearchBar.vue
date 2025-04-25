<template>
  <form class="flex flex-col md:flex-row gap-2 max-w-xl mx-auto" @submit.prevent>
    <!-- Heure -->
    <input
      v-model="searchValue"
      type="text"
      placeholder="Heure (ex : 14h)"
      class="p-2 border rounded w-full"
    />

    <!-- Date -->
    <input
      v-model="searchDate"
      type="date"
      class="p-2 border rounded w-full"
    />
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: string; date: string }>()
const emit = defineEmits(['update:modelValue', 'update:date'])

const searchValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const searchDate = computed({
  get: () => props.date,
  set: (val) => emit('update:date', val)
})
</script>
