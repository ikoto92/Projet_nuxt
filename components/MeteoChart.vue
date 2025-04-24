<template>
  <div class="my-6">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { useMeteoStore } from '@/stores/meteoStore'
import { computed, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import type { ChartOptions } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useMeteoStore()
onMounted(() => store.fetchMeteo())

const chartData = computed(() => ({
  labels: store.time.slice(0, 24),
  datasets: [
    {
      label: 'Température par heure (°C)',
      data: store.temperature.slice(0, 24),
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }
  ]
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Température heure par heure (Paris)'
    }
  }
}
</script>
