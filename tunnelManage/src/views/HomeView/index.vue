<template>
    <div class="card">
        <div class="box">
            <el-icon class="box-icon" style="color: #40c9c6">
                <Notification />
            </el-icon>
            <span class="box-title">隧道数量: 1000个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color: #36a3f7">
                <Compass />
            </el-icon>
            <span class="box-title">检验合格: 805个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color: #f4516c">
                <Bell />
            </el-icon>
            <span class="box-title">正在施工: 302个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color: #34bfa3">
                <Odometer />
            </el-icon>
            <span class="box-title">地质预报: 5000个</span>
        </div>
    </div>
    <div class="line" id="line"></div>
    <div class="charts">
        <div id="radar"></div>
        <div id="rose"></div>
        <div id="bar"></div>
    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from 'vue';
import api from '@/api/index.js'
const { proxy } = getCurrentInstance()

onMounted(() => {
    api.getLine().then(res => {
        if (res.data.status === 200) {
            proxy.$line('line', res.data.result.lines)
        }
       
    }).catch(error => console.log(error))

    //加载图表
    proxy.$radar('radar')
    proxy.$rose('rose')
    proxy.$bar('bar')
})
</script>
<style scoped>
.card {
    display: flex;
}

.card .box {
    flex: 1;
    height: 130px;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
}

.card .box:nth-child(1) {
    margin-left: 0;
}

.card .box:nth-child(4) {
    margin-right: 0;
}

.card .box .box-icon {
    display: block;
    font-size: 80px;
    color: #40c9c6;
    line-height: 130px;
    float: left;
    padding-left: 20px;
}

.box-title {
    display: block;
    font-size: 20px;
    line-height: 130px;
    float: right;
    padding-right: 20px;
}

.line {
    width: 100%;
    height: 300px;
    background-color: #fff;
}
.charts {
    display: flex;
}
.charts div {
    flex: 1;
    height: 450px;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
}
.charts div:nth-child(1) {
    margin-left: 0;
}

.charts div:nth-child(3) {
    margin-right: 0;
}
</style>