import type { RouteRecordRaw } from 'vue-router'

export const notFoundRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'pagenotfound',
    component: () => import('@/pages/pagenotfound.vue'),
  },
]
