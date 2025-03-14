<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Store</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="cart"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Store</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-searchbar placeholder="Search products" v-model="searchQuery"></ion-searchbar>

      <ion-segment v-model="selectedCategory">
        <ion-segment-button value="all">All</ion-segment-button>
        <ion-segment-button value="electronics">Electronics</ion-segment-button>
        <ion-segment-button value="clothing">Clothing</ion-segment-button>
        <ion-segment-button value="home">Home</ion-segment-button>
      </ion-segment>

      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="product in filteredProducts" :key="product.id">
            <ion-card :router-link="`/product/${product.id}`">
              <img :src="product.image" alt="Product image" />
              <ion-card-header>
                <ion-card-title>{{ product.name }}</ion-card-title>
                <ion-card-subtitle>${{ product.price }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-button expand="block" fill="clear">View Details</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar,
         IonSegment, IonSegmentButton, IonGrid, IonRow, IonCol, IonCard,
         IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
         IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { cart } from 'ionicons/icons';
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedCategory = ref('all');

const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'electronics',
    image: 'https://picsum.photos/id/3/200/200',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    category: 'electronics',
    image: 'https://picsum.photos/id/26/200/200',
    description: 'Track your fitness and stay connected with this smart watch.'
  },
  {
    id: 3,
    name: 'Laptop',
    price: 899.99,
    category: 'electronics',
    image: 'https://picsum.photos/id/48/200/200',
    description: 'Powerful laptop for work and entertainment.'
  },
  {
    id: 4,
    name: 'Smartphone',
    price: 699.99,
    category: 'electronics',
    image: 'https://picsum.photos/id/160/200/200',
    description: 'Latest smartphone with advanced camera features.'
  },
  {
    id: 5,
    name: 'T-Shirt',
    price: 19.99,
    category: 'clothing',
    image: 'https://picsum.photos/id/0/200/200',
    description: 'Comfortable cotton t-shirt for everyday wear.'
  },
  {
    id: 6,
    name: 'Jeans',
    price: 49.99,
    category: 'clothing',
    image: 'https://picsum.photos/id/1005/200/200',
    description: 'Classic denim jeans with a modern fit.'
  },
  {
    id: 7,
    name: 'Coffee Table',
    price: 149.99,
    category: 'home',
    image: 'https://picsum.photos/id/42/200/200',
    description: 'Elegant coffee table for your living room.'
  },
  {
    id: 8,
    name: 'Desk Lamp',
    price: 29.99,
    category: 'home',
    image: 'https://picsum.photos/id/96/200/200',
    description: 'Adjustable desk lamp with energy-efficient LED bulb.'
  }
]);

const filteredProducts = computed(() => {
  let result = products.value;
  
  if (selectedCategory.value !== 'all') {
    result = result.filter(product => product.category === selectedCategory.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  return result;
});
</script>

<style scoped>
ion-searchbar {
  padding: 10px;
}

ion-segment {
  padding: 0 10px;
}

ion-card {
  margin-bottom: 16px;
}

ion-card img {
  height: 150px;
  object-fit: cover;
  width: 100%;
}
</style>
