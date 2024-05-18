export default defineNuxtPlugin((nuxtApp) => {
    const errorCodeStore = useErrorCodeStore()
    const userStore = useUserStore()
    const authStore = useAuthStore()
    const tokenStore = useTokenStore()

    nuxtApp.hook('vue:error', (error: any) => {
        const errorCodes: number[] = error.data.errorCodes

        /**
         * 액세스 토큰 만료된 경우, 재발급을 요청한다.
         * 에러 코드: 62
         */
        if(errorCodes.includes(errorCodeStore.EXPIRED_ACCESS_TOKEN.code)) {
            console.log(errorCodeStore.EXPIRED_ACCESS_TOKEN.msg)
            
            useFetch("/api/v1/auth/refresh-token", {
                method: "POST",
                body: {
                    email: userStore.getEmail()
                },
                headers: {
                    Authorization: tokenStore.getAccessToken()
                }
            })
            return
        }

        /**
         * 올바르지 않은 토큰으로 서버에 요청했을 경우
         * 에러 코드: 63
         */
        if(errorCodes.includes(errorCodeStore.INCORRECT_TOKEN.code)) {
            console.log(errorCodeStore.INCORRECT_TOKEN.msg)

            tokenStore.$reset
            authStore.$reset
            const authCookie = useCookie("auth")
            authCookie.value = null
            navigateTo("/login")
            return
        }
    })
  })
  