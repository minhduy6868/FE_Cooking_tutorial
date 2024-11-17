import type { RouteRecordRaw } from 'vue-router'

export const authRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue'),
  },
  {
    path: '/register',
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('@/pages/auth/register/register.vue'),
      },
    ],
  },
  {
    path: '/resetpass',
    name: 'password-reset',
    component: () => import('@/pages/auth/password/reset.vue'),
  },
  {
    path: '/password',
    name: 'password',
    children: [
      {
        path: '',
        name: 'password-forgot',
        component: () => import('@/pages/auth/password/forgot.vue'),
      },
      
    ],
  },
]
