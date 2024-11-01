import type { RouteRecordRaw } from 'vue-router'

export const demoRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'dashboard',
    component: () => import('@/pages/folderdemo/demoapi.vue'),
  },
]
