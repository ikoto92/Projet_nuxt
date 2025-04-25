import { ref, computed, watch, onMounted } from 'vue'
import { useMeteoStore } from '@/stores/meteoStore'
import type { Ref } from 'vue'

export function useMeteoTable(searchValue: Ref<string>, searchDate: Ref<string>) {
  const store = useMeteoStore()
  const page = ref(1)
  const perPage = 6

  const formatDateFr = (date: string) => {
    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  }

  const formatHeureFr = (hour: string) => `${hour.slice(0, 2)}h${hour.slice(3, 5)}`

  const filtered = computed(() =>
    store.time.map((time, i) => {
      const [datePart, hourPart] = time.split('T')
      return {
        day: formatDateFr(datePart),
        hour: formatHeureFr(hourPart),
        temp: store.temperature[i]
      }
    }).filter(entry => {
      const matchesHour = searchValue.value ? entry.hour.includes(searchValue.value) : true
      const matchesDate = searchDate.value ? entry.day === formatDateFr(searchDate.value) : true
      return matchesHour && matchesDate
    })
  )

  const totalPages = computed(() => Math.ceil(filtered.value.length / perPage))

  const paginated = computed(() =>
    filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
  )

  function nextPage() {
    if (page.value < totalPages.value) page.value++
  }

  function prevPage() {
    if (page.value > 1) page.value--
  }

  async function exportPDF() {
    const element = document.querySelector('#pdf-section') as HTMLElement
    if (!element) return

    const html2canvas = await import('html2canvas')
    const jsPDF = await import('jspdf')
    const canvas = await html2canvas.default(element)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF.jsPDF()
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0)
    pdf.save('meteo.pdf')
  }

  return {
    page,
    totalPages,
    paginated,
    filtered,
    nextPage,
    prevPage,
    exportPDF
  }
}
