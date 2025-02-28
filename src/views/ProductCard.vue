import { useImage } from '@vueuse/core'
import { ref, watch } from 'vue'

export function useProductImage(url: string) {
  // Estado de la imagen actual
  const currentImage = ref(url)
  
  // Usar useImage correctamente
  const { state: imageState, isLoading, error } = useImage({
    src: url,
  })

  // Manejar errores y actualización de imagen
  watch(imageState, (newState) => {
    if (newState) {
      currentImage.value = url
    } else if (error.value) {
      currentImage.value = '/placeholder.jpg'
    }
  })

  // Manejar errores de carga
  const handleError = () => {
    currentImage.value = '/placeholder.jpg'
  }

  return {
    currentImage,
    isLoading,
    error,
    handleError,
  }
}