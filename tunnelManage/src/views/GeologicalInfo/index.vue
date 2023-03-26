<template>
    <div class="china" id="china"></div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance()
onMounted(() => {
    proxy.$china('china')
})
</script>
<style scoped>
.china {
    width: 500px;
    height: 500px;
    background-color: #fff;
}
</style>