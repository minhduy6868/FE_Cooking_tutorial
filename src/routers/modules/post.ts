import type { RouteRecordRaw } from 'vue-router'

export const creatRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'create',
    component: () => import('@/pages/post/createpost.vue'),
  },
  
]
