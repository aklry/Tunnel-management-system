<template>
    <div class="layout-container">
        <SliderNav />
        <div class="right-container">
            <TopNav />
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import SliderNav from '@/components/SliderNav/index.vue'
import TopNav from '@/components/TopNav/index.vue'
</script>
<style scoped>
.right-container {
    margin-left: 210px;
}
</style>