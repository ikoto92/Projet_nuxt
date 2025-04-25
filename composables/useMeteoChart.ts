import { computed } from 'vue'
import type { Ref } from 'vue'
import type { ChartOptions } from 'chart.js'

export function useMeteoChart(data: Ref<{ time: string, temp: number }[]>) {
  const firstDay = computed(() => {
    const firstTime = data.value[0]?.time
    return firstTime ? firstTime.split('T')[0] : null
  })

  const filteredData = computed(() =>
    data.value.filter(e => e.time.startsWith(firstDay.value ?? ''))
  )

  const chartData = computed(() => ({
    labels: filteredData.value.map(e => {
      const date = new Date(e.time)
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit'
      }).replace(':00', 'h')
    }),
    datasets: [
      {
        label: 'Température (°C)',
        data: filteredData.value.map(e => e.temp),
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }
    ]
  }))

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Température du ${firstDay.value?.split('-').reverse().join('/')} (Paris)`
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            const raw = items[0].label
            const date = new Date(filteredData.value[items[0].dataIndex].time)
            return date.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            }).replace(':', 'h')
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure',
          font: {
            size: 14
          }
        },
        ticks: {
          font: {
            size: 12 // ✅ taille plus lisible pour les heures
          }
        }
      },
      y: {
        min: 0,
        max: 45,
        title: {
          display: true,
          text: 'Température (°C)',
          font: {
            size: 14
          }
        },
        ticks: {
          stepSize: 5,
          autoSkip: false,
          font: {
            size: 12 // ✅ taille lisible pour les °C
          },
          callback: value => `${value} °C`
        }
      }
    }
  }

  return { chartData, chartOptions }
}
