import type { RouteRecordRaw } from 'vue-router'

export const postRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'create',
    component: () => import('@/pages/post/createpost.vue'),
  },
  {
    path: 'detail',
    name: 'detailpost',
    component: () => import('@/pages/post/detailpost.vue'),
  }
  
]
