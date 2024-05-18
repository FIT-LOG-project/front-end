<template lang="">
  <main class="border p-5 w-96 h-auto absolute z-50 left-1/2 top-1/2 -ml-48 -mt-32 shadow-xl rounded-xl">
    <form
      class="flex flex-col gap-5"
      @submit.prevent="requestNickName"
    >
      <h1 class="text-3xl">
        환영합니다!
      </h1>
      <p>
        사용할 닉네임을 입력해주세요. (2 ~ 10 자)
      </p>
      <p
        v-show="errorStore.isError"
        class="text-sm text-red-600 font-semibold"
      >
        {{ errorStore.errorMsg }}
      </p>
      <input
        :value="nickName"
        class="border-2 focus:outline-none focus:border-indigo-500 p-2"
        :class="{'border-red-600': errorStore.isError}"
        @input="(event) => (nickName = event.target.value)"
      >
      <button
        class="border border-indigo-500 bg-indigo-600 text-white p-2 text-xl rounded-lg" 
        type="submit"
        @click="requestNickName"
      >
        완료
      </button>
    </form>
  </main>
</template>
<script setup lang="ts">
const nickName = ref("")
const tokenStore = useTokenStore()
const userStore = useUserStore()
const errorStore = useErrorStore()
const errorCodeStore = useErrorCodeStore()

const requestNickName = async () => {
    await $fetch("/api/v1/nickname", {
      headers: {
        Authorization: tokenStore.getAccessToken()
      },
      method: "POST",
      body: {
        email: userStore.getEmail(),
        nickname: nickName.value,
        status: userStore.getStatus()
      }
    })
    .then((data: any) => {
      console.log(data.data)
      const userInfo: UserInfo = data.data
      userStore.setNickname(userInfo.nickname)
      userStore.setStatus(userInfo.status)
      navigateTo("/weight/" + userInfo.email)
    })
    .catch((error) => {
      console.log(error.data)
      const errorCodes: number[] = error.data.errorCodes

      if (errorCodes.includes(errorCodeStore.NICKNAME_FIELD.code)) {
        errorStore.createError(errorCodeStore.NICKNAME_FIELD.msg)
        return
      }

      if (errorCodes.includes(errorCodeStore.NICKNAME_DUPLICATE.code)) {
        errorStore.createError(errorCodeStore.NICKNAME_DUPLICATE.msg)
        return
      }
    })
}
</script>
<style lang="">
    
</style>