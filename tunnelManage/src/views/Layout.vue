<template>
    <div class="layout-container">
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
import { useMenuStore } from '@/stores/menuStore.js';
import { useLoginStore } from '@/stores/loginStore.js'
import { onMounted } from 'vue';
import api from '@/api/index.js'

const menuStore = useMenuStore()
const loginStore = useLoginStore()
/**
 * 用户权限的数据获取
 */
onMounted(() => {
    api.getRouter({
        user: loginStore.permission
    }).then(res => {
        if (res.data.status === 200) {
            menuStore.menus = res.data.menuData.menus
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