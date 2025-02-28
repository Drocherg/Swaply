import { useStorage } from '@vueuse/core'
import type { Product } from '@/store/products'

export function useLocalStorage() {
  // Favoritos
  const favorites = useStorage<number[]>('swaply-favorites', [])
  
  // Historial de visualización
  const viewHistory = useStorage<number[]>('swaply-history', [])
  
  // Borradores de productos
  const productDrafts = useStorage<Partial<Product>[]>('swaply-drafts', [])

  // Añadir a favoritos
  const addToFavorites = (productId: number) => {
    if (!favorites.value.includes(productId)) {
      favorites.value.push(productId)
    }
  }

  // Quitar de favoritos
  const removeFromFavorites = (productId: number) => {
    favorites.value = favorites.value.filter(id => id !== productId)
  }

  // Añadir al historial
  const addToHistory = (productId: number) => {
    if (!viewHistory.value.includes(productId)) {
      viewHistory.value.unshift(productId)
      // Mantener solo los últimos 20 items
      if (viewHistory.value.length > 20) {
        viewHistory.value.pop()
      }
    }
  }

  // Guardar borrador
  const saveDraft = (draft: Partial<Product>) => {
    productDrafts.value.push(draft)
  }

  // Eliminar borrador
  const removeDraft = (index: number) => {
    productDrafts.value.splice(index, 1)
  }

  return {
    favorites,
    viewHistory,
    productDrafts,
    addToFavorites,
    removeFromFavorites,
    addToHistory,
    saveDraft,
    removeDraft,
  }
}