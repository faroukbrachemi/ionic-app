import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import StorePage from '../views/StorePage.vue'
import ProductPage from '../views/ProductPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import CartPage from '../views/CartPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/store',
    name: 'Store',
    component: StorePage
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
