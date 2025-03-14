<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/store"></ion-back-button>
        </ion-buttons>
        <ion-title>Product Details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-if="product" class="product-container">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <div class="product-price">${{ product.price }}</div>
          
          <div class="product-rating">
            <ion-icon :icon="star" v-for="i in 5" :key="i" :color="i <= product.rating ? 'warning' : 'medium'"></ion-icon>
            <span>({{ product.reviews }} reviews)</span>
          </div>
          
          <div class="product-description">
            <h2>Description</h2>
            <p>{{ product.description }}</p>
          </div>
          
          <div class="product-quantity">
            <ion-label>Quantity</ion-label>
            <ion-button fill="clear" @click="decrementQuantity">
              <ion-icon :icon="removeCircle"></ion-icon>
            </ion-button>
            <span>{{ quantity }}</span>
            <ion-button fill="clear" @click="incrementQuantity">
              <ion-icon :icon="addCircle"></ion-icon>
            </ion-button>
          </div>
          
          <ion-button expand="block" @click="addToCart">Add to Cart</ion-button>
        </div>
        
        <div class="product-details">
          <ion-segment v-model="selectedTab">
            <ion-segment-button value="details">Details</ion-segment-button>
            <ion-segment-button value="reviews">Reviews</ion-segment-button>
          </ion-segment>
          
          <div v-if="selectedTab === 'details'" class="tab-content">
            <h3>Product Specifications</h3>
            <ion-list>
              <ion-item v-for="(value, key) in product.specifications" :key="key">
                <ion-label>
                  <h3>{{ key }}</h3>
                  <p>{{ value }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </div>
          
          <div v-if="selectedTab === 'reviews'" class="tab-content">
            <h3>Customer Reviews</h3>
            <ion-list>
              <ion-item v-for="review in product.reviewList" :key="review.id">
                <ion-label>
                  <h3>{{ review.user }}</h3>
                  <div class="review-rating">
                    <ion-icon :icon="star" v-for="i in 5" :key="i" :color="i <= review.rating ? 'warning' : 'medium'"></ion-icon>
                  </div>
                  <p>{{ review.comment }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </div>
        </div>
      </div>
      
      <div v-else class="loading-container">
        <ion-spinner></ion-spinner>
        <p>Loading product details...</p>
      </div>
      
      <ion-toast
        :is-open="showToast"
        message="Item added to cart"
        :duration="2000"
        position="bottom"
        :buttons="[
          {
            text: 'View Cart',
            handler: () => router.push('/cart')
          }
        ]"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
         IonBackButton, IonButton, IonIcon, IonSegment, IonSegmentButton,
         IonList, IonItem, IonLabel, IonSpinner, IonToast } from '@ionic/vue';
import { star, addCircle, removeCircle } from 'ionicons/icons';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const productId = Number(route.params.id);
const quantity = ref(1);
const selectedTab = ref('details');
const showToast = ref(false);

// In a real app, this would come from an API
const product = ref({
  id: productId,
  name: 'Wireless Headphones',
  price: 99.99,
  rating: 4,
  reviews: 42,
  image: 'https://picsum.photos/id/3/500/500',
  description: 'High-quality wireless headphones with noise cancellation. Experience crystal-clear sound and comfort for hours of listening pleasure. Features Bluetooth 5.0 connectivity and 30-hour battery life.',
  specifications: {
    'Brand': 'AudioTech',
    'Model': 'WH-1000X',
    'Color': 'Black',
    'Battery Life': '30 hours',
    'Connectivity': 'Bluetooth 5.0',
    'Weight': '250g'
  },
  reviewList: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Best headphones I\'ve ever owned! The sound quality is amazing.' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great headphones, very comfortable for long listening sessions.' },
    { id: 3, user: 'Mike T.', rating: 3, comment: 'Good sound but the battery doesn\'t last as long as advertised.' }
  ]
});

// In a real app, this would fetch the product from an API
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    // This would be replaced with actual API data
  }, 500);
});

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  cartStore.addItem(product.value, quantity.value);
  showToast.value = true;
  
  // Hide toast after 2 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};
</script>

<style scoped>
.product-container {
  padding: 16px;
}

.product-image {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.product-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.product-info {
  margin-bottom: 30px;
}

.product-info h1 {
  font-size: 24px;
  margin-bottom: 8px;
}

.product-price {
  font-size: 22px;
  font-weight: bold;
  color: #2dd36f;
  margin-bottom: 12px;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.product-rating span {
  margin-left: 8px;
  color: #666;
}

.product-description {
  margin-bottom: 20px;
}

.product-description h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.product-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-quantity ion-label {
  margin-right: 10px;
}

.tab-content {
  padding: 16px 0;
}

.review-rating {
  margin: 8px 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
