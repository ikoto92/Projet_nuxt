<template>
  <div class="my-6">
    <div v-if="!chartData.labels.length" class="text-center text-gray-500 py-6">
      ⏳ Chargement du graphique...
    </div>

    <!-- ✅ Conteneur responsif avec hauteur contrôlée -->
    <div class="w-full overflow-x-auto">
      <div class="min-w-[700px] max-w-full h-[400px]"> <!-- 👈 hauteur FIXE ici -->
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed, toRef } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'
import { useMeteoChart } from '@/composables/useMeteoChart'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = withDefaults(defineProps<{
  data?: { time: string; temp: number }[]
}>(), {
  data: () => []
})

const chartInput = toRef(props, 'data')
const { chartData, chartOptions } = useMeteoChart(chartInput)
</script>
