import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import Layout from '../views/Layout.vue'
import LoginInfo from '../views/LoginInfo/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/project',
          name: 'Project',
          component: () => import('../views/ProjectInfo/index.vue')
        },
        {
          path: '/tunnel',
          name: 'Tunnel',
          component: () => import('../views/TunnelInfo/index.vue')
        },
        {
          path: '/work',
          name: 'Work',
          component: () => import('../views/WorkManage/index.vue')
        },
        {
          path: '/build',
          name: 'Build',
          component: () => import('../views/BuildManage/index.vue')
        },
        {
          path: '/geological',
          name: 'Geological',
          component: () => import('../views/GeologicalInfo/index.vue')
        },
        {
          path: '/system',
          name: 'System',
          component: () => import('../views/SystemManage/index.vue')
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

export default router
