<template>
    <div class="tunnel-container">
        <div class="tunnel-list">
            <h3>选择断面</h3>
            <el-tree lazy :load="loadNode" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
        <div class="tunnel-content">
            <el-table :data="content.data" style="100%">
                <el-table-column label="序号" prop="id" />
                <el-table-column label="隧道名称" prop="tunnelname" />
                <el-table-column label="图名" prop="imagename" />
                <el-table-column label="图号" prop="num" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger"
                            @click="preViewHandler(scope.$index, scope.row)">预览</el-button>
                        <el-button size="small" type="success"
                            @click="uploadHandler(scope.$index, scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import api from '@/api/index.js'
const defaultProps = reactive({
    children: 'children',
    label: 'name',
})
const content = reactive({
    data: []
})
const handleNodeClick = (data) => {
    api.getTunnelContent({
        content: data.content
    }).then(res => {
        if (res.status === 200) {
            content.data = res.data.result
        } else {
            content.data = []
        }
    }).catch(error => console.log(error))
}

const loadNode = (node, resolve) => {
    //一级结点
    if (node.level === 0) {
        api.getTunnelList().then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        }).catch(error => console.log(error))
    }
    //二级结点
    if (node.level === 1) {
        api.getTunnelListChild({
            cid: node.data.cid
        }).then(res => {
            if (res.data.status === 200) {
                resolve(res.data.result)
            } else {
                resolve([])
            }
        }).catch(error => console.log(error))
    }
    //大于二级结点
    if (node.level > 1) {
        resolve([])
    }
}
/**
 * 预览事件
 */
const preViewHandler = (index, row) => {
    console.log(index, row)
}
/**
 * 上传事件
 */
const uploadHandler = (index, row) => {
    console.log(index, row)
}
</script>
<style scoped>
.tunnel-container {
    display: flex;
}

.tunnel-list {
    width: 250px;
    background-color: #fff;
    padding: 10px;
    margin-right: 20px;
}

.tunnel-list h3 {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0;
}

.tunnel-content {
    flex: 1;
}
</style>