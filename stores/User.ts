import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        _isAuthenctication: false,
        _accessToken:"Bearer ",
        _email:""
    }),
    getters: {

    },
    actions: {
        setIsAuthentication(isAuthentication: boolean) {
            this._isAuthenctication = isAuthentication
        },
        getIsAuthentication() {
            return this._isAuthenctication
        },
        setAccessToken(token: string) {
            this._accessToken = this._accessToken.concat(token)
        },
        getAccessToken() {
            return this._accessToken
        },
        setEmail(email: string) {
            this._email = email
        },
        getEmail() {
            return this._email
        }
    },
    persist: true
})