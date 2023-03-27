<template>
    <!-- 搜索与添加 -->
    <div class="search">
        <span>项目状态: </span>
        <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" placeholder="请输入搜索内容" size="large" />
        <el-button class="button" @click="searchHandler" size="large" type="primary" plain>搜索</el-button>
        <el-button class="button" size="large" type="primary" plain>添加</el-button>
    </div>
    <!-- 表格展示数据 -->
    <el-table :header-cell-style="headerClass" :data="projectInfo.list" style="width: 100%;">
        <el-table-column prop="name" label="项目名称" width="180" />
        <el-table-column prop="number" label="项目编码" width="120" />
        <el-table-column prop="money" label="项目金额" width="120" />
        <el-table-column prop="address" label="项目地址" width="150" />
        <el-table-column prop="duration" label="项目工期(月)" width="120" />
        <el-table-column prop="startTime" :formatter="value => dateFormatter(Number(value.startTime))" label="开工时间"
            width="150" />
        <el-table-column prop="endTime" :formatter="value => dateFormatter(Number(value.endTime))" label="终止时间"
            width="150" />
        <el-table-column prop="quantity" label="隧道质量" width="120" />
        <el-table-column prop="status" label="项目状态" width="120">
            <template #default="scope">
                <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{ statusHandle(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="remark" show-overflow-tooltip label="备注">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
            </template>
        </el-table-column>
        <el-table-column width="135" label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import api from '@/api/index.js';
import { dateFormatter } from '@/utils/utils.js'
import { onMounted, reactive, ref } from 'vue';
const projectInfo = reactive({
    list: []
})
onMounted(() => {
    http(1)
})
//搜索初始化状态
const searchInfo = ref('')
const http = (page) => {
    api.getProject({ page }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        }
    }).catch(error => console.log(error))
}
/**
 * 隧道状态文本
 * @param {状态} status 
 */
const statusHandle = (status) => {
    return status === '1' ? '施工中' : '已完结'
}
/**
 * 设置表格头部样式
 */
const headerClass = () => {
    return {
        backgroundColor: '#dcdcdc',
        color: '#999',
        fontWeight: 700
    }
}

/**
 * 编辑
 */
const handleEdit = (index, row) => {
    console.log(index, row)
}
/**
 * 删除
 */
const handleDelete = (index, row) => {
    console.log(index, row)
}

/**
 * 搜索
 */
const searchHandler = () => {
    api.getSearch({
        search: searchInfo.value
    }).then(res => {
        if (res.data.status === 200) {
            projectInfo.list = res.data.result
        } else {
            projectInfo.list = []
        }
    }).catch(error => console.log(error))
}
</script>
<style scoped>
.search {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background-color: #fff;
}

.search span {
    font-weight: 700;
}

.search .input {
    width: 300px;
}
</style>