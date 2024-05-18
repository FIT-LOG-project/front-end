import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        _isAuthenctication: false,
    }),
    getters: {

    },
    actions: {
        setIsAuthentication(isAuthentication: boolean) {
            this._isAuthenctication = isAuthentication
        },
        getIsAuthentication() {
            return this._isAuthenctication
        }
    },
    persist: true
})