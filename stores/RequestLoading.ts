import { defineStore } from "pinia";

export const useRequestLoadingStore = defineStore('requestLoading', {
    state: () => ({
        isLoading: false
    }),
    getters: {

    },
    actions: {
        getIsLoading() {
            return this.isLoading;
        },
        start() {
            this.isLoading = true;
        },
        init() {
            this.isLoading = false;
        }
    }
})