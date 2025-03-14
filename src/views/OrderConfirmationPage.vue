<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Order Confirmation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Order Confirmation</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="confirmation-container" v-if="order">
        <div class="success-icon">
          <ion-icon :icon="checkmarkCircle"></ion-icon>
        </div>
        
        <h1>Thank You for Your Order!</h1>
        <p class="order-id">Order #{{ order.id }}</p>
        <p class="confirmation-message">
          We've received your order and are getting it ready. A confirmation email has been sent to your email address.
        </p>
        
        <div class="order-details">
          <h2>Order Details</h2>
          
          <div class="order-items">
            <div class="item" v-for="item in order.items" :key="item.id">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p>Qty: {{ item.quantity }}</p>
                <p class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          
          <div class="order-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${{ order.subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>${{ order.shipping.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <span>${{ order.tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="shipping-info">
            <h2>Shipping Information</h2>
            <p>{{ order.shippingInfo.fullName }}</p>
            <p>{{ order.shippingInfo.address }}</p>
            <p>{{ order.shippingInfo.city }}, {{ order.shippingInfo.state }} {{ order.shippingInfo.zipCode }}</p>
            <p>{{ getCountryName(order.shippingInfo.country) }}</p>
          </div>
        </div>
        
        <div class="confirmation-buttons">
          <ion-button expand="block" router-link="/home">
            Continue Shopping
          </ion-button>
          <ion-button expand="block" fill="outline" @click="trackOrder">
            Track Order
          </ion-button>
        </div>
      </div>
      
      <div v-else class="no-order">
        <ion-icon :icon="alertCircle"></ion-icon>
        <h2>No Order Found</h2>
        <p>We couldn't find any recent order information.</p>
        <ion-button expand="block" router-link="/store">
          Go to Store
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { checkmarkCircle, alertCircle } from 'ionicons/icons';
import { ref, onMounted } from 'vue';

const order = ref(null);

onMounted(() => {
  // Retrieve the order from localStorage
  const orderData = localStorage.getItem('lastOrder');
  if (orderData) {
    order.value = JSON.parse(orderData);
  }
});

const getCountryName = (countryCode: string) => {
  const countries = {
    'us': 'United States',
    'ca': 'Canada',
    'uk': 'United Kingdom',
    'au': 'Australia'
  };
  return countries[countryCode] || countryCode;
};

const trackOrder = () => {
  // In a real app, this would navigate to an order tracking page
  alert(`Tracking information for order ${order.value.id} will be sent to your email.`);
};
</script>

<style scoped>
.confirmation-container {
  padding: 24px 16px;
  text-align: center;
}

.success-icon {
  margin: 24px 0;
}

.success-icon ion-icon {
  font-size: 80px;
  color: #2dd36f;
}

h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.order-id {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}

.confirmation-message {
  margin-bottom: 32px;
  color: #666;
  line-height: 1.5;
}

.order-details {
  text-align: left;
  margin-bottom: 32px;
}

.order-details h2 {
  font-size: 18px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.order-items {
  margin-bottom: 24px;
}

.item {
  display: flex;
  margin-bottom: 16px;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 16px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-details h3 {
  font-size: 16px;
  margin: 0 0 4px 0;
}

.item-details p {
  margin: 0 0 4px 0;
  color: #666;
}

.item-price {
  font-weight: bold;
  color: #333;
}

.order-summary {
  background: #f4f5f8;
  padding: 16px;
  margin-bottom: 24px;
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

.shipping-info p {
  margin: 4px 0;
  color: #666;
}

.confirmation-buttons {
  margin-top: 32px;
}

.confirmation-buttons ion-button {
  margin-bottom: 8px;
}

.no-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  text-align: center;
}

.no-order ion-icon {
  font-size: 64px;
  color: #f44336;
  margin-bottom: 16px;
}

.no-order h2 {
  margin-bottom: 8px;
}

.no-order p {
  margin-bottom: 24px;
  color: #666;
}
</style>
