import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, dashboardRoute, profileRoute, aboutRoute, adminRoute, notFoundRoute, demoRoute, postRoute} from './modules'
import { authGuard } from './auth-guard'
const { progress } = useIndicator()

const routes: RouteRecordRaw[] = [
  {
    path: '/c',
    // beforeEnter: [authGuard],
    component: () => import('@/pages/index.vue'),
    children: dashboardRoute,
  },
  {
    path: '/auth',
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
    beforeEnter: [authGuard],
    children: authRoute,
  },
  {
    path: '/admin', 
    meta: {
      layout: 'AdminLayout',
    }, 
    children: adminRoute,
  },
  {
    path: '/profile',
    meta: {
      layout: 'ProfileLayout',
    },
    // beforeEnter: [authGuard],
    children: profileRoute,
  },
  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
  {
    path: '/pagenotfound',
    // beforeEnter: [authGuard],
    meta: {
      layout: 'NotFoundLayout',
    },
    children: notFoundRoute,
  },
  {
    path: '/about', // Đường dẫn mới cho trang About
   meta: {
    layout: 'AboutLayout',
   }, 
   children: aboutRoute,
  },
  {
    path: '/demoapi', 
   meta: {
    layout: 'DemoLayout',
   }, 
   children: demoRoute,
  },
  {
    path: '/post', 
   meta: {
    layout: 'PostLayout',
   }, 
   children: postRoute,
  },

 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(() => {
  progress.value = 0.3
})

router.afterEach(() => {
  setTimeout(() => {
    progress.value = 1
  }, 100)
})

export default router
