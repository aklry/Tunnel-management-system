<template>
    <div class="layout-container">
        <DrawerSetting />
        <SliderNav />
        <div class="right-container" :style="{ marginLeft: menuStore.isCollapse ? '64px' : '210px' }">
            <TopNav />
           <div class="content">
                <router-view></router-view>
           </div>
        </div>
    </div>
</template>
<script setup>
import SliderNav from '@/components/SliderNav/index.vue'
import TopNav from '@/components/TopNav/index.vue'
import DrawerSetting from '@/components/DrawerSetting/index.vue'
import { useMenuStore } from '@/stores/menuStore.js';
import { useLoginStore } from '@/stores/loginStore.js'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/index.js'
import manage from '../router/dynamicRoute.js'
const menuStore = useMenuStore()
const loginStore = useLoginStore()
const router = useRouter()
/**
 * 用户权限的数据获取
 */
onMounted(() => {
    api.getRouter({
        user: loginStore.permission
    }).then(res => {
        if (res.data.status === 200) {
            menuStore.menus = res.data.menuData.menus
            //判断当前用户权限
            if (loginStore.permission === 'admin') {
                router.addRoute('Layout', manage)
            }
        }
    }).catch(error => console.log(error))
})
</script>
<style scoped>
.right-container {
    margin-left: 210px;
    transition: .3s ease-in;
}

.content {
    padding: 10px;
}
</style>