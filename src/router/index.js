import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/Auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AuthView
  },
  {
    path: '/private',
    name: 'private',
    component: () => import('../views/Private')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
