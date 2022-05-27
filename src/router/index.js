import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/Auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: AuthView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    children: [
      {
        path: '',
        name: 'index',
        redirect: { name: 'Login' },
      },
      {
        path: 'login_in',
        name: 'Login',
        component: () => import('../views/Auth/Login.vue'),
      },
      {
        path: 'forgot_password',
        name: 'ForgotPassword',
        component: () => import('../views/Auth/ForgotPassword.vue'),
      },
    ],
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
