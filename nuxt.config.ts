// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    https: {
      key: "./localhost-key.pem",
      cert: "./localhost.pem"
    },
    host: "localhost",
    port:3001
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss", 
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://192.168.45.173:8081',
          // target: "https://localhost:8080",
          changeOrigin: true,
          secure: false
    
        }
      },
      hmr: {
        protocol: 'wss',
        host: 'localhost'
      }
    },
    
  }
})