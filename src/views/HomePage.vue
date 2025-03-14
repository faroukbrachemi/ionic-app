<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>ShopEase</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ShopEase</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="hero-section">
        <h1>Welcome to ShopEase</h1>
        <p>Your one-stop shop for all your needs</p>
        <ion-button expand="block" router-link="/store">Shop Now</ion-button>
      </div>

      <div class="featured-section">
        <h2>Featured Products</h2>
        <ion-grid>
          <ion-row>
            <ion-col size="6" v-for="product in featuredProducts" :key="product.id">
              <ion-card router-link="/product/{{ product.id }}">
                <img :src="product.image" alt="Product image" />
                <ion-card-header>
                  <ion-card-title>{{ product.name }}</ion-card-title>
                  <ion-card-subtitle>${{ product.price }}</ion-card-subtitle>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, 
         IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, 
         IonCardSubtitle } from '@ionic/vue';
import { ref } from 'vue';

const featuredProducts = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://picsum.photos/id/3/200/200'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://picsum.photos/id/26/200/200'
  },
  {
    id: 3,
    name: 'Laptop',
    price: 899.99,
    image: 'https://picsum.photos/id/48/200/200'
  },
  {
    id: 4,
    name: 'Smartphone',
    price: 699.99,
    image: 'https://picsum.photos/id/160/200/200'
  }
]);
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
  margin-bottom: 1rem;
}

.hero-section h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.hero-section p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.featured-section {
  padding: 1rem;
}

.featured-section h2 {
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
}

ion-card {
  margin-bottom: 1rem;
}

ion-card img {
  height: 150px;
  object-fit: cover;
  width: 100%;
}
</style>
