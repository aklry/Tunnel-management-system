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

const menuStore = useMenuStore()
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