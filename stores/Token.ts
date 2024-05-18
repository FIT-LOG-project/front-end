import { defineStore } from "pinia";

export const useTokenStore = defineStore('token', {
    state: () => ({
        _accessToken:"Bearer ",
    }),
    getters: {

    },
    actions: {
        setAccessToken(token: string) {
            if (this._accessToken != "Bearer ") {
                this._accessToken = "Bearer "
            }
            
            this._accessToken = this._accessToken.concat(token)
        },
        getAccessToken() {
            return this._accessToken
        },
    },
    persist: {
        storage: persistedState.sessionStorage
    }
})