import { ref, computed } from 'vue'
import { useGeolocation } from '@vueuse/core'

export function useLocation() {
  const { coords, isSupported } = useGeolocation()
  const lastKnownLocation = ref<{ lat: number; lng: number } | null>(null)

  // Calcular distancia entre dos puntos
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Formatear distancia
  const formatDistance = (distance: string | number) => {
    const dist = typeof distance === 'string' ? parseFloat(distance) : distance
    if (dist < 1) {
      return `${(dist * 1000).toFixed(0)}m`
    }
    return `${dist.toFixed(1)}km`
  }

  // Obtener distancia actual
  const getDistanceFromCurrentLocation = (targetLat: number, targetLng: number) => {
    if (!coords.value) return null
    return calculateDistance(
      coords.value.latitude,
      coords.value.longitude,
      targetLat,
      targetLng
    )
  }

  return {
    coords,
    isSupported,
    calculateDistance,
    formatDistance,
    getDistanceFromCurrentLocation,
    lastKnownLocation
  }
}