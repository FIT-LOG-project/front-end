<template>
  <div class="h-screen flex flex-col justify-center items-center bg-blue-50">
    <main class="bg-white p-2 flex flex-col gap-2 shadow-2xl border-white rounded-md w-96 h-[]">
      <header class="mb-20">
        <h1 class="text-5xl text-center">
          LOGIN
        </h1>
      </header>
      <div>
        <div
          v-show="errorStore.isError"
          class="text-red-500 font-semibold text-sm"
        >
          {{ errorStore.errorMsg }}
        </div>
        <inputComp
          v-model="loginUser.email"
          type="email"
          place-holder="이메일을 입력하세요."
          width="full"
        />
      </div>
      <div>
        <inputComp
          v-model="loginUser.password"
          type="password"
          place-holder="비밀번호를 입력하세요."
          width="full"
        />
      </div>
      <div>
        <buttonComp
          text="로그인"
          class="w-full"
          @click="login"
        />
      </div>
      <div class="flex justify-between">
        <NuxtLink
          to="/sign-up"
          class="text-xs"
        >
          회원가입
        </NuxtLink>
        <router-link
          to=""
          class="text-xs"
        >
          비밀번호 찾기
        </router-link>
      </div>
      <div class="flex flex-col">
        <button>카카오 로그인</button>
        <button>네이버 로그인</button>
        <button>구글 로그인</button>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
const errorStore = useErrorStore()
const authStore = useAuthStore()
const tokenStore = useTokenStore()
const userStore = useUserStore()

const loginUser = reactive({
  email:"",
  password:""
})

const login = async () => {
  await $fetch('/api/v1/auth/local', {
    method: 'POST',
    body: {
      email: loginUser.email,
      password: loginUser.password
    },
    onResponseError({ response }) {
      const errorCodes: number[] = response._data.errorCodes
      console.log(errorCodes)
      errorStore.createError("이메일 또는 비밀 번호가 올바르지 않습니다.")
    },
    onResponse({ response }) {
      const httpCode = response.status

      if (httpCode === 200) {
        console.log("[RESPONSE:" + response._data.message + "]")

        const loginMemberInfo: UserInfo = response._data.data
        const accessToken: string | null = response.headers.get("Authorization")

        if (accessToken != null) {
          authStore.setIsAuthentication(true)
          userStore.setUser(loginMemberInfo.email, loginMemberInfo.nickname, loginMemberInfo.status)
          tokenStore.setAccessToken(accessToken)
        }
      }
    }
  }).then((data: any) => {
    const responseData: UserInfo = data.data;
    if (responseData.status == "NEW") {
      navigateTo("/new-info/" + responseData.email)
    } else if (responseData.status == "NORMAL") {
      navigateTo("/weight/" + responseData.email)
    }
  })
}
</script>
<style>
    
</style>