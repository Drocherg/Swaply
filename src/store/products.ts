import { defineStore } from 'pinia';
export interface Product {
    id: number;
    title: string;
    price: string;
    image: string;
    description: string;
    distance: string | number;
    userId: number;
  }
  
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      { id: 1, title: 'Producto 1', price: '10€', description: 'Descripción 1', image: 'https://via.placeholder.com/150',distance: '4.5Km' , userId: 1 },
      { id: 2, title: 'Producto 2', price: '20€', description: 'Descripción 2', image: 'https://via.placeholder.com/150',distance: '3.5Km' , userId: 2 }
    ]
  }),

  getters: {
    getUserProducts: (state) => (userId: number): Product[] => {
      return state.products.filter((product) => product.userId === userId);
    }
  },
  

  actions: {
    updateProduct(updatedProduct: Product) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        Object.assign(this.products[index], updatedProduct);
      }
    }
  }  
});
