import { defineStore } from "pinia";

export interface UserInfo {
    email: string | null,
    nickname: string | null,
    status: string | null
}

export const useUserStore = defineStore('user', {
    state: () => ({
        _email: "" as string | null,
        _nickname:"" as string | null,
        _status:"" as string | null
    }),
    getters: {

    },
    actions: {
        setUser(email: string | null, nickname: string | null, status: string | null) {
            this._email = email
            this._nickname = nickname,
            this._status = status
        },
        setEmail(email: string | null) {
            this._email = email
        },
        getEmail() {
            return this._email;
        },
        setNickname(nickname: string | null) {
            this._nickname = nickname
        },
        getNickname() {
            return this._nickname
        },
        setStatus(status: string | null) {
            this._status = status
        },
        getStatus() {
            return this._status
        }
    },
    persist: {
        storage: persistedState.sessionStorage
    }
})