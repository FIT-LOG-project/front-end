export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    /**
     * /login, /sign-up 이 아닌 url 값이 들어 온 경우 인증 되지 않은 사용자면 /login로 이동
     */
    if (to.fullPath != "/login" && to.fullPath != "/sign-up") {
        
        // 로그인 하지 않은 사용자
        if (!authStore.getIsAuthentication()) {
            return navigateTo('/login')
        }

        /**
         * "/"를 요청하면 "/training"으로 이동한다.
         */
        if (to.fullPath == "/") {
            return navigateTo("/weight")
        }
    }
})