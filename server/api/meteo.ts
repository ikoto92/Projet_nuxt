// Prévisions météo pour Paris (modifiable)
export default defineEventHandler(async () => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&hourly=temperature_2m&timezone=auto'
    const res = await fetch(url)
    const data = await res.json()
  
    // Retourne uniquement les données utiles
    return {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m
    }
  })
  