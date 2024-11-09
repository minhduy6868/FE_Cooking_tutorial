import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, profileRoute, adminRoute, notFoundRoute, demoRoute, postRoute } from './modules'
import { authGuard } from './auth-guard'
import MainLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue' // Import AdminLayout

const { progress } = useIndicator()

const routes: RouteRecordRaw[] = [
  // Route chính với MainLayout
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
        path: '/post/create',
        name: 'post-create',
        component: () => import('@/pages/post/createpost.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/profile/index.vue'),
      },
    ],
  },

  // Các route với layout khác
  {
    path: '/auth',
    meta: {
      layout: 'GuestLayout', // Layout cho trang đăng nhập, đăng ký
      public: true,
    },
    beforeEnter: [authGuard],
    children: authRoute,
  },
  
  // Đảm bảo AdminLayout được áp dụng cho các route trong admin
  {
    path: '/admin',
    component: AdminLayout, // Sử dụng AdminLayout cho các route dưới đây
    children: [
      {
        path: '/admin/dashboard',
        component: () => import('@/pages/admin/dashboard.vue'),
      },
      {
        path: '/inforadmin',
        name: 'information',
        component: () => import('@/pages/admin/inforadmin.vue'),
      },
      {
        path: '/users-manage',
        name: 'usersManage',
        component: () => import('@/pages/admin/usersmanage.vue'),
      },
    ]
  },
  
  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
  {
    path: '/pagenotfound',
    meta: {
      layout: 'NotFoundLayout', // Layout cho trang không tìm thấy
    },
    children: notFoundRoute,
  },
  {
    path: '/demoapi',
    meta: {
      layout: 'DemoLayout', // Layout Demo
    },
    children: demoRoute,
  },
  {
    path: '/post/view', // Thay đổi path để tránh trùng với '/post'
    meta: {
      layout: 'PostLayout', // Layout Post
    },
    children: postRoute,
  },

  // Route catch-all (bắt tất cả các đường dẫn không hợp lệ)
  {
    path: '/:catchAll(.*)',
    redirect: '/pagenotfound',
  },
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
