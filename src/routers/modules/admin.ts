import type { RouteRecordRaw } from 'vue-router'

export const adminRoute: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/admin/inforadmin.vue'),
  },
  {
    path: '',
    name: 'login-admin',
    component: () => import('@/pages/admin/loginadmin.vue'),
  },
]
