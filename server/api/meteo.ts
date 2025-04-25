// Prévisions météo pour Paris (modifiable)
export default defineEventHandler(async () => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&hourly=temperature_2m&timezone=auto'
    try{

      const res = await fetch(url)
      const data = await res.json()
    
      return {
        time: data.hourly.time,
        temperature: data.hourly.temperature_2m
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error)
      return {
        error: 'Erreur lors de la récupération des données météo'
      }
    }
    // Retourne uniquement les données utiles
  })
  