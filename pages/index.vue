<template>
  <div class="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded shadow">
  <div class="mx-[20px] my-6">
    <h1 class="text-2xl font-bold mb-6">🌤️ Prévisions météo - Paris</h1>

    <!-- 📈 Graphique météo -->
    <MeteoChart v-if="filteredHours.length" :data="filteredHours" />

    <!-- 📋 Tableau météo -->
    <MeteoTable v-model:search="search" />

    <footer class="mt-12 text-center text-sm text-gray-500 border-t pt-4">
      © 2025 - Prévisions météo avec Nuxt 3 · Données fournies par
      <a
        href="https://open-meteo.com/"
        class="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open-Meteo
      </a>
    </footer>
  </div>
  </div>
</template>

<script setup>
import MeteoChart from '@/components/MeteoChart.vue'
import MeteoTable from '@/components/MeteoTable.vue'
import { useMeteoStore } from '@/stores/meteoStore'
import { ref, computed, onMounted } from 'vue'

const store = useMeteoStore()
onMounted(() => store.fetchMeteo())

const search = ref('')

const filteredHours = computed(() =>
  store.time
    .map((t, i) => ({ time: t, temp: store.temperature[i] }))
    .filter(entry => entry.time.includes(search.value))
)
</script>
