import { defineStore } from 'pinia'

export const useMeteoStore = defineStore('meteo', {
  state: () => ({
    time: [] as string[],
    temperature: [] as number[],
    loading: false,
    error: null as Error | null
  }),
  actions: {
    async fetchMeteo() {
      this.loading = true
      try {
        const res = await fetch('/api/meteo')
        const data = await res.json()
        this.time = data.time
        this.temperature = data.temperature
      } catch (err) {
        this.error = err as Error
      } finally {
        this.loading = false
      }
    }
  }
})
