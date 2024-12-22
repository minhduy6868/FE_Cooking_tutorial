import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, profileRoute, adminRoute, notFoundRoute, postRoute } from './modules'
import { authGuard } from './auth-guard'
import MainLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

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
        path: '/postcooking',
        component: () => import('@/pages/postcooking/postcooking.vue'),
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
        path: '/post/detail/:id',
        name: 'post-detail',
        component: () => import('@/pages/post/detailpost.vue'),
        props: true,
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/profile/index.vue'),
      },
      {
        path: '/profile/:id',
        name: 'profileUser',
        component: () => import('@/pages/profile/profileUser.vue'),
        props: true,
      },
    ],
  },

  {
    path: '/auth',
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
    children: authRoute,
  },

  {
    path: '/loginadmin',
    name: 'loginadmin',
    component: () => import('@/pages/admin/loginadmin.vue'),
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
  },

  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: authGuard,
    children: [
      {
        path: '',
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
      {
        path: '/posts-manage',
        name: 'postsManage',
        component: () => import('@/pages/admin/postsmanage.vue'),
      },
    ],
  },

  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
  {
    path: '/pagenotfound',
    meta: {
      layout: 'NotFoundLayout',
    },
    children: notFoundRoute,
  },
  {
    path: '/post/view',
    meta: {
      layout: 'PostLayout',
    },
    children: postRoute,
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/pagenotfound',
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
