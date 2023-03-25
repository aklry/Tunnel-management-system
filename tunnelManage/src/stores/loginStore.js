import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            token: '',
            permission: '',
            username: ''
        }
    }
})