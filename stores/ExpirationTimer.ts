import { defineStore } from "pinia";

export const useExpirationTimer = defineStore('expirationTimer', {
    state: () => ({
        realTime: 0,
        minute: 5,
        second: 0,
        timeoutId: undefined as NodeJS.Timeout | undefined
    }),
    getters: {
        reduce: (state) => state.realTime - 1,
        convertMinute: (state) => Math.floor(state.realTime / 60),
        convertSecond: (state) => state.realTime % 60
    },
    actions: {
        reduceExpiration() {
            if (this.timeoutId != undefined) {
                clearTimeout(this.timeoutId)
                this.timeoutId = undefined
            }

            this.realTime = this.reduce
            this.minute = this.convertMinute
            this.second = this.convertSecond

            if (this.realTime <= 0) {
                return
            }

            this.timeoutId = setTimeout(() => this.reduceExpiration(), 1000)
        }
    }
})