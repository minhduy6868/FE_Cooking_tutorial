import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, dashboardRoute, profileRoute, aboutRoute, adminRoute, notFoundRoute, demoRoute, postRoute } from './modules'
import { authGuard } from './auth-guard'
import MainLayout from '@/layouts/DefaultLayout.vue'  // Đảm bảo rằng bạn đã import MainLayout

const { progress } = useIndicator()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,  
    children: [
      {
        path: '',
        component: () => import('@/pages/home/home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/about/about.vue'),
      },
      {
        path: '/post',
        name: 'post',
        component: () => import('@/pages/post/createpost.vue'),
      },
      {
        path: '/profile',
        name: 'post',
        component: () => import('@/pages/profile/index.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/profile/index.vue'),
      },
    ],
  },

  // Các route khác sử dụng layout khác như GuestLayout, AdminLayout, v.v.
  {
    path: '/auth',
    meta: {
      layout: 'GuestLayout',  // Chỉ định layout là GuestLayout
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
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
  {
    path: '/pagenotfound',
    meta: {
      layout: 'NotFoundLayout',  // Layout NotFound
    },
    children: notFoundRoute,
  },
  {
    path: '/demoapi',
    meta: {
      layout: 'DemoLayout',  // Layout Demo
    },
    children: demoRoute,
  },
  {
    path: '/post/view',  // Thay đổi path để tránh trùng với '/post'
    meta: {
      layout: 'PostLayout',  // Layout Post
    },
    children: postRoute,
  },

  // Route catch-all (bắt tất cả các đường dẫn không hợp lệ)
  {
    path: '/:catchAll(.*)',  // Bắt tất cả các route không khớp
    name: 'notfound',        // Tên route
    component: () => import('@/pages/Pagenotfound.vue'),  // Trang lỗi
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Set up loading progress bar
router.beforeEach(() => {
  progress.value = 0.3
})

router.afterEach(() => {
  setTimeout(() => {
    progress.value = 1
  }, 100)
})

export default router
