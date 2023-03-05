// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/DefaultPage.vue'),
  },
  {
    path: '/nearbyGasStation',
    name: "nearbyGasStation",
    component: () => import('@/components/NearbyGastStation/GastStationMenu.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
