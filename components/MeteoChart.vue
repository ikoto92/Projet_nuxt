<template>
  <div class="my-6">
    <div v-if="!chartData.labels.length" class="text-center text-gray-500 py-6">
      ⏳ Chargement du graphique...
    </div>
    <Bar v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'
import type { ChartOptions } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = withDefaults(defineProps<{
  data?: { time: string; temp: number }[]
}>(), {
  data: () => []
})

const chartData = computed(() => ({
  labels: props.data.map(e => e.time),
  datasets: [
    {
      label: 'Température par heure (°C)',
      data: props.data.map(e => e.temp),
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }
  ]
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Température heure par heure (Paris)'
    }
  }
}
</script>
