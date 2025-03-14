<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/cart"></ion-back-button>
        </ion-buttons>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Checkout</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="checkout-container">
        <ion-list>
          <ion-item-group>
            <ion-item-divider>
              <ion-label>Shipping Information</ion-label>
            </ion-item-divider>
            
            <ion-item>
              <ion-label position="stacked">Full Name</ion-label>
              <ion-input v-model="shippingInfo.fullName" placeholder="Enter your full name"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input v-model="shippingInfo.email" type="email" placeholder="Enter your email"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Phone</ion-label>
              <ion-input v-model="shippingInfo.phone" type="tel" placeholder="Enter your phone number"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Address</ion-label>
              <ion-input v-model="shippingInfo.address" placeholder="Enter your street address"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">City</ion-label>
              <ion-input v-model="shippingInfo.city" placeholder="Enter your city"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">State/Province</ion-label>
              <ion-input v-model="shippingInfo.state" placeholder="Enter your state or province"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Zip/Postal Code</ion-label>
              <ion-input v-model="shippingInfo.zipCode" placeholder="Enter your zip or postal code"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Country</ion-label>
              <ion-select v-model="shippingInfo.country" placeholder="Select your country">
                <ion-select-option value="us">United States</ion-select-option>
                <ion-select-option value="ca">Canada</ion-select-option>
                <ion-select-option value="uk">United Kingdom</ion-select-option>
                <ion-select-option value="au">Australia</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-item-group>
          
          <ion-item-group>
            <ion-item-divider>
              <ion-label>Payment Information</ion-label>
            </ion-item-divider>
            
            <ion-item>
              <ion-label position="stacked">Card Number</ion-label>
              <ion-input v-model="paymentInfo.cardNumber" placeholder="Enter your card number"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Name on Card</ion-label>
              <ion-input v-model="paymentInfo.nameOnCard" placeholder="Enter name on card"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Expiration Date</ion-label>
              <ion-input v-model="paymentInfo.expirationDate" placeholder="MM/YY"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">CVV</ion-label>
              <ion-input v-model="paymentInfo.cvv" type="password" placeholder="Enter CVV"></ion-input>
            </ion-item>
          </ion-item-group>
        </ion-list>
        
        <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>${{ shippingCost.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>${{ calculateTax().toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ calculateTotal().toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="checkout-buttons">
          <ion-button expand="block" @click="placeOrder" :disabled="!isFormValid">
            Place Order
          </ion-button>
          <ion-button expand="block" fill="outline" router-link="/cart">
            Return to Cart
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
         IonBackButton, IonList, IonItem, IonItemDivider, IonItemGroup,
         IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { useCartStore } from '../stores/cart';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();
const shippingCost = 5.99;
const taxRate = 0.08; // 8% tax rate

const shippingInfo = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'us'
});

const paymentInfo = ref({
  cardNumber: '',
  nameOnCard: '',
  expirationDate: '',
  cvv: ''
});

const isFormValid = computed(() => {
  // Basic validation - check if required fields are filled
  return (
    shippingInfo.value.fullName &&
    shippingInfo.value.email &&
    shippingInfo.value.phone &&
    shippingInfo.value.address &&
    shippingInfo.value.city &&
    shippingInfo.value.state &&
    shippingInfo.value.zipCode &&
    paymentInfo.value.cardNumber &&
    paymentInfo.value.nameOnCard &&
    paymentInfo.value.expirationDate &&
    paymentInfo.value.cvv
  );
});

const calculateTax = () => {
  return cartStore.total * taxRate;
};

const calculateTotal = () => {
  return cartStore.total + shippingCost + calculateTax();
};

const placeOrder = () => {
  // In a real app, this would send the order to a backend
  // For now, we'll just simulate a successful order
  
  // Create an order object with all the information
  const order = {
    id: generateOrderId(),
    items: cartStore.items,
    subtotal: cartStore.total,
    shipping: shippingCost,
    tax: calculateTax(),
    total: calculateTotal(),
    shippingInfo: { ...shippingInfo.value },
    date: new Date().toISOString()
  };
  
  // Store the order in localStorage for the confirmation page
  localStorage.setItem('lastOrder', JSON.stringify(order));
  
  // Clear the cart
  cartStore.clearCart();
  
  // Navigate to the confirmation page
  router.push('/order-confirmation');
};

const generateOrderId = () => {
  // Generate a random order ID
  return 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};
</script>

<style scoped>
.checkout-container {
  padding: 16px;
}

ion-item-divider {
  --background: #f4f5f8;
  --color: #92949c;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-top: 16px;
}

.order-summary {
  background: #f4f5f8;
  padding: 16px;
  margin: 24px 0;
  border-radius: 8px;
}

.order-summary h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
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
  margin-bottom: 24px;
}

.checkout-buttons ion-button {
  margin-bottom: 8px;
}
</style>
