import type { RouteRecordRaw } from 'vue-router'

export const profileRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'profile',
    component: () => import('@/pages/profile/index.vue'),
  },
]
