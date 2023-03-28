<template>
    <!-- <iframe :src="pdfURL" width="100%" height="100%"></iframe> -->
    <VuePdf v-for="page in numOfPages" :key="page" :src="pdfURL" />
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
import api from '@/api/index.js'
const route = useRoute()
const pdfURL = ref('')
const numOfPages = ref(0)
onMounted(() => {
    api.getPDFPreView({
        id: route.params.id
    }).then(res => {
        if (res.data.status === 200) {
            pdfURL.value = `http://localhost:3000/${res.data.result.url}`
            const loadingTask = createLoadingTask(pdfURL.value)
            loadingTask.promise.then((pdf) => {
                numOfPages.value = pdf.numPages
            })
        } else {
            pdfURL.value = ''
        }
    }).catch(error => console.log(error))
})

</script>