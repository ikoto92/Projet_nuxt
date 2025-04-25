<template>
  <div class="space-y-6 mx-[30px] my-6">
    <!-- 🔍 Barre de recherche combinée -->
    <SearchBar v-model="searchValue" v-model:date="searchDate" />

    <!-- 📤 Boutons d'export -->
    <div class="flex justify-center">
      <div class="flex flex-wrap gap-2 justify-center">
        <button @click="exportData('csv', false)" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          🔄 Export page (CSV)
        </button>
        <button @click="exportData('csv', true)" class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          📦 Export complet (CSV)
        </button>
        <button @click="exportData('xlsx', false)" class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          🔄 Export page (XLSX)
        </button>
        <button @click="exportData('xlsx', true)" class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          📦 Export complet (XLSX)
        </button>
      </div>
    </div>

    <!-- 🧾 Tableau météo -->
    <div class="relative flex flex-col w-full overflow-auto text-gray-700 bg-white shadow-md rounded-xl">
      <table class="w-full min-w-max text-left table-auto">
        <thead>
          <tr>
            <th class="p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600 uppercase">Jour</th>
            <th class="p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600 uppercase">Heure</th>
            <th class="p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600 uppercase">Température</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in paginatedHours"
            :key="index"
            class="hover:bg-gray-100 transition"
          >
            <td class="p-4 border-b border-gray-100">{{ entry.day }}</td>
            <td class="p-4 border-b border-gray-100">{{ entry.hour }}</td>
            <td class="p-4 border-b border-gray-100">
              <span
                :class="{
                  'text-blue-500': entry.temp <= 10,
                  'text-yellow-600': entry.temp > 10 && entry.temp < 25,
                  'text-red-600': entry.temp >= 25
                }"
                class="font-semibold"
              >
                {{ entry.temp }} °C
              </span>
            </td>
          </tr>

          <!-- ✅ Moyenne -->
          <tr v-if="paginatedHours.length" class="bg-gray-50 border-t">
            <td class="p-4 font-semibold text-gray-700">Moyenne</td>
            <td class="p-4 font-semibold text-gray-700">—</td>
            <td class="p-4 font-semibold text-gray-700">{{ moyenneTemp }} °C</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 🔄 Pagination -->
    <div class="flex items-center justify-between">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-sm"
      >
        ◀ Précédent
      </button>
      <span class="text-sm text-gray-600">Page {{ page }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="page >= totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
      >
        Suivant ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { useMeteoTable } from '~~/composables/useMeteoTable'
import { useExport } from '@/composables/useExport'

const props = defineProps<{ search: string; date: string }>()
const emit = defineEmits(['update:search', 'update:date'])

const searchValue = computed({
  get: () => props.search,
  set: (val) => emit('update:search', val)
})
const searchDate = computed({
  get: () => props.date,
  set: (val) => emit('update:date', val)
})

const {
  page,
  totalPages,
  paginated: paginatedHours,
  filtered: filteredHours,
  nextPage,
  prevPage
} = useMeteoTable(searchValue, searchDate)

const { exportToCSV, exportToXLSX } = useExport()

function exportData(type: 'csv' | 'xlsx', all: boolean) {
  const data = all ? filteredHours.value : paginatedHours.value
  const headers = ['day', 'hour', 'temp']
  const filename = all ? 'previsions_meteo_complet' : 'previsions_meteo_page'

  if (type === 'csv') exportToCSV(data, headers, filename)
  else exportToXLSX(data, headers, filename)
}

const moyenneTemp = computed(() => {
  const data = paginatedHours.value
  if (!data.length) return '—'
  const sum = data.reduce((acc, e) => acc + e.temp, 0)
  return (sum / data.length).toFixed(1)
})
</script>
