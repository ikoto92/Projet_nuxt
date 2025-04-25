import { computed } from 'vue'
import type { Ref } from 'vue'
import type { ChartOptions } from 'chart.js'

export function useMeteoChart(data: Ref<{ time: string, temp: number }[]>) {
  const chartData = computed(() => ({
    labels: data.value.map(e => e.time),
    datasets: [
      {
        label: 'Température par heure (°C)',
        data: data.value.map(e => e.temp),
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

  return {
    chartData,
    chartOptions
  }
}
