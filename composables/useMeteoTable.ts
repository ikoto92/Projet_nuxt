import { ref, computed } from 'vue'
import { useMeteoStore } from '@/stores/meteoStore'
import type { Ref } from 'vue'

export function useMeteoTable(search: Ref<string>) {
  const store = useMeteoStore()
  const page = ref(1)
  const perPage = ref(6) // ✅ maintenant c'est un Ref

  const formatDateFr = (d: string) => {
    const [y, m, day] = d.split('-')
    return `${day}-${m}-${y}`
  }

  const formatHeureFr = (h: string) => `${h.slice(0, 2)}h${h.slice(3, 5)}`

  const filtered = computed(() =>
    store.time.map((t, i) => {
      const [d, h] = t.split('T')
      return {
        day: formatDateFr(d),
        hour: formatHeureFr(h),
        temp: store.temperature[i]
      }
    }).filter(e => e.hour.includes(search.value))
  )

  const totalPages = computed(() => Math.ceil(filtered.value.length / perPage.value))

  const paginated = computed(() =>
    filtered.value.slice((page.value - 1) * perPage.value, page.value * perPage.value)
  )

  const nextPage = () => {
    if (page.value < totalPages.value) page.value++
  }

  const prevPage = () => {
    if (page.value > 1) page.value--
  }

  return {
    page,
    totalPages,
    paginated,
    nextPage,
    prevPage,
    filtered
  }
}
