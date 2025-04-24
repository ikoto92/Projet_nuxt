<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">🌤️ Prévisions horaires (Paris)</h2>

    <!-- 🔍 Recherche -->
    <input
      v-model="searchValue"
      type="text"
      placeholder="Filtrer une heure (ex: 14h00)"
      class="mb-4 p-2 border border-gray-300 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <!-- 📤 Export CSV -->
    <button
      @click="exportCSV"
      class="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      ⬇️ Exporter en CSV
    </button>

    <!-- ⏳ Chargement -->
    <div v-if="loading" class="text-center text-gray-500 py-6">
      ⏳ Chargement des prévisions météo...
    </div>

    <!-- ❌ Erreur -->
    <div v-else-if="error" class="text-red-500 text-center py-6">
      ❌ Erreur : {{ error.message }}
    </div>

    <!-- ✅ Tableau météo -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full table-auto border border-gray-300 rounded-lg overflow-hidden shadow">
        <thead class="bg-gray-50 text-left">
          <tr>
            <th class="p-3 font-semibold text-gray-700">Jour</th>
            <th class="p-3 font-semibold text-gray-700">Heure</th>
            <th class="p-3 font-semibold text-gray-700">Température (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in paginatedHours"
            :key="index"
            class="hover:bg-gray-100 transition"
          >
            <td class="p-3 border-t border-gray-200">{{ entry.day }}</td>
            <td class="p-3 border-t border-gray-200">{{ entry.hour }}</td>
            <td class="p-3 border-t border-gray-200">
              <span
                :class="{
                  'text-blue-500': entry.temp <= 10,
                  'text-yellow-600': entry.temp > 10 && entry.temp < 25,
                  'text-red-600': entry.temp >= 25
                }"
              >
                {{ entry.temp }} °C
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 🔄 Pagination -->
      <div class="flex items-center justify-between mt-6">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300 disabled:opacity-50"
        >
          ◀ Précédent
        </button>
        <span class="text-sm text-gray-600">Page {{ page }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="page >= totalPages"
          class="px-4 py-2 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          Suivant ▶
        </button>
      </div>

      <!-- 🕳️ Aucun résultat -->
      <div
        v-if="!filteredHours.length && !loading && !error"
        class="text-center text-gray-400 mt-4"
      >
        Aucun résultat trouvé.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useMeteoStore } from '@/stores/meteoStore'

const props = defineProps<{ search: string }>()
const emit = defineEmits(['update:search'])

const searchValue = computed({
  get: () => props.search,
  set: val => emit('update:search', val)
})

const store = useMeteoStore()
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const page = ref(1)
const perPage = 6

// 🕒 Format: "14h00"
const formatHeureFr = (heure: string) => `${heure.slice(0, 2)}h${heure.slice(3, 5)}`

// 📅 Format: "24-04-2025"
const formatDateFr = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')
  return `${day}-${month}-${year}`
}

const filteredHours = computed(() =>
  store.time
    .map((t, i) => {
      const [day, hour] = t.split('T')
      return {
        day: formatDateFr(day),
        hour: formatHeureFr(hour),
        temp: store.temperature[i]
      }
    })
    .filter(entry => entry.hour.includes(searchValue.value))
)

const totalPages = computed(() => Math.ceil(filteredHours.value.length / perPage))

const paginatedHours = computed(() =>
  filteredHours.value.slice((page.value - 1) * perPage, page.value * perPage)
)

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

function exportCSV() {
  const rows = [['Jour', 'Heure', 'Température']]
  filteredHours.value.forEach(entry => {
    rows.push([entry.day, entry.hour, `${entry.temp} °C`])
  })
  const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'previsions_meteo.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}
</script>
