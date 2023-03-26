import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import Layout from '../views/Layout.vue'
import LoginInfo from '../views/LoginInfo/index.vue'
import { useLoginStore } from '../stores/loginStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/project',
          name: 'Project',
          component: () => import('../views/ProjectInfo/index.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/tunnel',
          name: 'Tunnel',
          component: () => import('../views/TunnelInfo/index.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/work',
          name: 'Work',
          component: () => import('../views/WorkManage/index.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/build',
          name: 'Build',
          component: () => import('../views/BuildManage/index.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/geological',
          name: 'Geological',
          component: () => import('../views/GeologicalInfo/index.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/system',
          name: 'System',
          component: () => import('../views/SystemManage/index.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userCenter',
          name: 'UserCenter',
          component: () => import('../views/UserCenter/index.vue'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginInfo
    }
  ]
})
/**
 * 路由权限
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const loginStore = useLoginStore()
    //需要验证登录
    if (loginStore.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
export default router
