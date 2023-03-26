const manage = {
    path: '/work',
    name: 'Work',
    component: () => import('../views/WorkManage/index.vue'),
    meta: {
        requireAuth: true,
        key: '工作监督管理'
    }
}
export default manage
