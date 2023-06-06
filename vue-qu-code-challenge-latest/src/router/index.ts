import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PlanetView from '../views/PlanetView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'planet',
    component: PlanetView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
