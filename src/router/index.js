import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/Auth';
import { requiresGuest, requiresAuth } from './guard';

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
    beforeEnter: requiresGuest,
    children: [
      {
        path: '',
        name: 'index',
        redirect: { name: 'Login' },
        meta: { requiresAuth: false, },
      },
      {
        path: 'log_in',
        name: 'Login',
        meta: { requiresAuth: false, },
        component: () => import('../views/Auth/Login.vue'),
      },
      {
        path: 'sign_up',
        name: 'Register',
        meta: { requiresAuth: false, },
        component: () => import('../views/Auth/Register.vue'),
      },
      {
        path: 'forgot_password',
        name: 'ForgotPassword',
        meta: { requiresAuth: false, name: 'forgot_password' },
        component: () => import('../views/Auth/ForgotPassword.vue'),
      },
      {
        path: 'reset_password',
        name: 'ResetPassword',
        component: () => import('../views/Auth/ResetPassword.vue'),
      },
    ],
  },
  {
    path: '/private',
    name: 'private',
    beforeEnter: requiresAuth,
    component: () => import('../views/Private')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const store = userAuthStore();
//   const currentUser = store.currentUser;
//   if(!currentUser && !to.meta.requiresAuth) {
//     next();
//   } else {
//     next();
//   }
// });

export default router
