import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/apply-account',
    name: 'ApplyAccount',
    component: () => import('../views/auth/ApplyAccountView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('../views/auth/ChangePasswordView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 白名单路由（无需登录即可访问）
const whiteList = ['/login', '/apply-account']

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = localStorage.getItem('token')

  // 白名单路由直接放行
  if (whiteList.includes(to.path)) {
    // 如果已登录，跳转首页
    if (token && to.path === '/login') {
      next('/')
    } else {
      next()
    }
    return
  }

  // 未登录，跳转登录页
  if (!token) {
    next('/login')
    return
  }

  // 已登录，放行
  next()
})

export default router
