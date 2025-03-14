import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  
  const count = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });
  
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });
  
  function addItem(product: any, quantity: number) {
    const existingItem = items.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
  }
  
  function removeItem(id: number) {
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }
  
  function updateQuantity(id: number, quantity: number) {
    const item = items.value.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      // Remove item if quantity is 0
      if (quantity <= 0) {
        removeItem(id);
      }
    }
  }
  
  function clearCart() {
    items.value = [];
  }
  
  return {
    items,
    count,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
});
