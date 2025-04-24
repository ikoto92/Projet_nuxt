<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">🌤️ Prévisions horaires (Paris)</h2>

    <!-- 🔍 Barre de recherche -->
    <input
      v-model="search"
      type="text"
      placeholder="Filtrer une heure (ex: 12:00)"
      class="mb-6 p-2 border border-gray-300 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <!-- ⏳ Chargement -->
    <div v-if="store.loading" class="text-center text-gray-500 py-6">
      ⏳ Chargement des prévisions météo...
    </div>

    <!-- ❌ Erreur -->
    <div v-else-if="store.error" class="text-red-500 text-center py-6">
      ❌ Erreur : {{ store.error.message }}
    </div>

    <!-- ✅ Tableau -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full table-auto border border-gray-300 rounded-lg overflow-hidden shadow">
        <thead class="bg-gray-50 text-left">
          <tr>
            <th class="p-3 font-semibold text-gray-700">Heure</th>
            <th class="p-3 font-semibold text-gray-700">Température (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(hour, index) in paginatedHours"
            :key="index"
            class="hover:bg-gray-100 transition"
          >
            <td class="p-3 border-t border-gray-200">{{ hour }}</td>
            <td class="p-3 border-t border-gray-200">
              <span
                :class="{
                  'text-blue-500': store.temperature[index] <= 10,
                  'text-yellow-600': store.temperature[index] > 10 && store.temperature[index] < 25,
                  'text-red-600': store.temperature[index] >= 25
                }"
              >
                {{ store.temperature[index] }} °C
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
        v-if="!filteredHours.length && !store.loading && !store.error"
        class="text-center text-gray-400 mt-4"
      >
        Aucun résultat trouvé.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMeteoStore } from '@/stores/meteoStore'

const store = useMeteoStore()
onMounted(() => store.fetchMeteo())

const search = ref('')
const page = ref(1)
const perPage = 6

// 🔍 Filtrage
const filteredHours = computed(() =>
  store.time
    .map((t, i) => ({ time: t, temp: store.temperature[i] }))
    .filter(entry => entry.time.includes(search.value))
)

const totalPages = computed(() => Math.ceil(filteredHours.value.length / perPage))

const paginatedHours = computed(() =>
  filteredHours.value
    .slice((page.value - 1) * perPage, page.value * perPage)
    .map(entry => entry.time)
)

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}
</script>
