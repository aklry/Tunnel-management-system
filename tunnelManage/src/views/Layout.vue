<template>
    <div class="layout-container">
        <SliderNav />
        <div class="right-container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import SliderNav from '@/components/SliderNav/index.vue'
</script>
<style scoped>
.right-container {
    margin-left: 210px;
}
</style>