// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    // devProxy: {
    //   '/api':{
    //     target: 'http://192.168.45.173:8080',
    //     changeOrigin: true
    //   }
    // }
    // routeRules: {
    //   '/api': {
    //     proxy: 'http://192.168.45.173:8080'
    //   }
    // },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss", 
    '@pinia/nuxt'
  ],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://192.168.45.173:8080',
          changeOrigin: true
        }
      }
    }
  }
})