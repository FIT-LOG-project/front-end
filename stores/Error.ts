import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
    state: () => ({
        isError: false,
        errorMsg: ''
    }),
    getters: {

    },
    actions: {
        createError(msg: string) {
            this.isError = true
            this.errorMsg = msg
        },
    }
})