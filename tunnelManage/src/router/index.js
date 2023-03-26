import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import Layout from '../views/Layout.vue'
import LoginInfo from '../views/LoginInfo/index.vue'
import { useLoginStore } from '../stores/loginStore.js'
import { useMenuStore } from '../stores/menuStore.js'
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
            requireAuth: true,
            key: '首页'
          }
        },
        {
          path: '/project',
          name: 'Project',
          component: () => import('../views/ProjectInfo/index.vue'),
          meta: {
            requireAuth: true,
            key: '项目基础信息'
          }
        },
        {
          path: '/tunnel',
          name: 'Tunnel',
          component: () => import('../views/TunnelInfo/index.vue'),
          meta: {
            requireAuth: true,
            key: '隧道设计信息'
          }
        },
        {
          path: '/build',
          name: 'Build',
          component: () => import('../views/BuildManage/index.vue'),
          meta: {
            requireAuth: true,
            key: '施工监控检测'
          }
        },
        {
          path: '/geological',
          name: 'Geological',
          component: () => import('../views/GeologicalInfo/index.vue'),
          meta: {
            requireAuth: true,
            key: '超前地质预报'
          }
        },
        {
          path: '/system',
          name: 'System',
          component: () => import('../views/SystemManage/index.vue'),
          meta: {
            requireAuth: true,
            key: '系统信息管理'
          }
        },
        {
          path: '/userCenter',
          name: 'UserCenter',
          component: () => import('../views/UserCenter/index.vue'),
          meta: {
            requireAuth: true,
            key: '个人中心'
          }
        },
        {
          path: '/plan',
          name: 'Plan',
          component: () => import('../views/BuildManage/PlanTest/index.vue'),
          meta: {
            requireAuth: true,
            key: '检测计划'
          }
        },
        {
          path: '/section',
          name: 'Section',
          component: () => import('../views/BuildManage/SectionTest/index.vue'),
          meta: {
            requireAuth: true,
            key: '切面检测'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginInfo
    },
    {
      // 404路径匹配规则
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound/index.vue')
    }
  ]
})
/**
 * 路由权限
 */
router.beforeEach((to, from, next) => {
  //存储路由路径
  localStorage.setItem('active', to.path)
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

router.afterEach((to, from) => {
  if (to.meta.key) {
    //存储key信息
    const menuStore = useMenuStore()
    menuStore.breadcrumb = to.meta.key
  }
})
export default router
