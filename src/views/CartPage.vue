<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/store"></ion-back-button>
        </ion-buttons>
        <ion-title>Shopping Cart</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Shopping Cart</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="cartStore.items.length > 0">
        <ion-list>
          <ion-item v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <ion-thumbnail slot="start">
              <img :src="item.image" :alt="item.name" />
            </ion-thumbnail>
            <ion-label>
              <h2>{{ item.name }}</h2>
              <p class="price">${{ item.price }}</p>
            </ion-label>
            <div class="quantity-control">
              <ion-button fill="clear" size="small" @click="decrementQuantity(item)">
                <ion-icon :icon="removeCircle"></ion-icon>
              </ion-button>
              <span>{{ item.quantity }}</span>
              <ion-button fill="clear" size="small" @click="incrementQuantity(item)">
                <ion-icon :icon="addCircle"></ion-icon>
              </ion-button>
            </div>
            <ion-button fill="clear" color="danger" @click="removeFromCart(item.id)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>$5.99</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ (cartStore.total + 5.99).toFixed(2) }}</span>
          </div>
        </div>

        <div class="checkout-buttons">
          <ion-button expand="block" router-link="/checkout">
            Proceed to Checkout
          </ion-button>
          <ion-button expand="block" fill="outline" @click="continueShopping">
            Continue Shopping
          </ion-button>
        </div>
      </div>

      <div v-else class="empty-cart">
        <ion-icon :icon="cartOutline" class="empty-cart-icon"></ion-icon>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <ion-button expand="block" @click="continueShopping">
          Start Shopping
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
         IonBackButton, IonList, IonItem, IonThumbnail, IonLabel, IonButton,
         IonIcon } from '@ionic/vue';
import { addCircle, removeCircle, trash, cartOutline } from 'ionicons/icons';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const incrementQuantity = (item: any) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

const decrementQuantity = (item: any) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  } else {
    removeFromCart(item.id);
  }
};

const removeFromCart = (id: number) => {
  cartStore.removeItem(id);
};

const continueShopping = () => {
  router.push('/store');
};

// Removed the checkout function as we're using router-link now
</script>

<style scoped>
.cart-item {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

ion-thumbnail {
  --size: 80px;
  margin-right: 16px;
}

.price {
  font-weight: bold;
  color: #2dd36f;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.quantity-control span {
  min-width: 24px;
  text-align: center;
}

.cart-summary {
  background: #f4f5f8;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.total {
  font-weight: bold;
  font-size: 18px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #ddd;
}

.checkout-buttons {
  padding: 16px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  text-align: center;
}

.empty-cart-icon {
  font-size: 80px;
  color: #ccc;
  margin-bottom: 16px;
}

.empty-cart h2 {
  margin-bottom: 8px;
  color: #333;
}

.empty-cart p {
  margin-bottom: 24px;
  color: #666;
}
</style>
