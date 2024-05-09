export default defineNuxtRouteMiddleware((to, from) => {
    const errorStore = useErrorStore()

    errorStore.$reset()
})