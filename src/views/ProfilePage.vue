<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="profile-header">
        <div class="avatar">
          <img src="https://picsum.photos/id/64/200/200" alt="Profile picture" />
        </div>
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
      </div>

      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Account</ion-label>
          </ion-item-divider>
          
          <ion-item button detail>
            <ion-icon :icon="person" slot="start"></ion-icon>
            <ion-label>Personal Information</ion-label>
          </ion-item>
          
          <ion-item button detail>
            <ion-icon :icon="lockClosed" slot="start"></ion-icon>
            <ion-label>Security</ion-label>
          </ion-item>
          
          <ion-item button detail>
            <ion-icon :icon="card" slot="start"></ion-icon>
            <ion-label>Payment Methods</ion-label>
          </ion-item>
          
          <ion-item button detail>
            <ion-icon :icon="location" slot="start"></ion-icon>
            <ion-label>Addresses</ion-label>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider>
            <ion-label>Orders</ion-label>
          </ion-item-divider>
          
          <ion-item button detail>
            <ion-icon :icon="bagCheck" slot="start"></ion-icon>
            <ion-label>Order History</ion-label>
          </ion-item>
          
          <ion-item button detail>
            <ion-icon :icon="returnDownBack" slot="start"></ion-icon>
            <ion-label>Returns</ion-label>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider>
            <ion-label>Preferences</ion-label>
          </ion-item-divider>
          
          <ion-item>
            <ion-icon :icon="notifications" slot="start"></ion-icon>
            <ion-label>Notifications</ion-label>
            <ion-toggle v-model="preferences.notifications"></ion-toggle>
          </ion-item>
          
          <ion-item>
            <ion-icon :icon="moon" slot="start"></ion-icon>
            <ion-label>Dark Mode</ion-label>
            <ion-toggle v-model="preferences.darkMode"></ion-toggle>
          </ion-item>
        </ion-item-group>
      </ion-list>

      <div class="logout-button">
        <ion-button expand="block" color="danger" @click="logout">
          <ion-icon :icon="logOut" slot="start"></ion-icon>
          Logout
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
         IonItem, IonItemDivider, IonItemGroup, IonLabel, IonIcon,
         IonToggle, IonButton } from '@ionic/vue';
import { person, lockClosed, card, location, bagCheck, returnDownBack,
         notifications, moon, logOut } from 'ionicons/icons';
import { ref } from 'vue';

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890'
});

const preferences = ref({
  notifications: true,
  darkMode: false
});

const logout = () => {
  // In a real app, this would handle logout logic
  alert('Logged out successfully');
};
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 3px solid white;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-header h2 {
  margin: 0 0 5px 0;
  font-size: 22px;
}

.profile-header p {
  margin: 0;
  opacity: 0.9;
}

ion-item-divider {
  --background: #f4f5f8;
  --color: #92949c;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

.logout-button {
  padding: 20px;
  margin-top: 20px;
}
</style>
