<template>
  <div class="space-y-4">
    <!-- 🔍 Barre de recherche (déjà intégrée dans le parent via v-model) -->
    <SearchBar v-model="searchValue" />

    <!-- 📤 Export CSV -->
    <button
      @click="exportCSV"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      ⬇️ Exporter en CSV
    </button>

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
import { computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { useMeteoTable } from '~~/composables/useMeteoTable'

const props = defineProps<{ search: string }>()
const emit = defineEmits(['update:search'])

const searchValue = computed({
  get: () => props.search,
  set: (val) => emit('update:search', val)
})

const {
  page,
  totalPages,
  paginated: paginatedHours,
  filtered: filteredHours,
  nextPage,
  prevPage
} =  useMeteoTable(searchValue) // ✅ on passe bien un Ref


function exportCSV() {
  const rows = [['Jour', 'Heure', 'Température']]
  filteredHours.value.forEach(entry => {
    rows.push([entry.day, entry.hour, `${entry.temp} °C`])
  })
  const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'previsions_meteo.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>
