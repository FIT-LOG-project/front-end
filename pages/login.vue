<template>
  <div class="h-screen flex flex-col justify-center items-center bg-blue-50">
    <main class="bg-white p-2 flex flex-col gap-2 shadow-2xl border-white rounded-md w-80 h-96">
      <header class="mb-20">
        <h1 class="text-5xl text-center">
          FIT-LOG
        </h1>
      </header>
      <div>
        <inputComp
          type="email"
          place-holder="이메일을 입력하세요."
          width="full"
        />
      </div>
      <div>
        <inputComp
          type="password"
          place-holder="비밀번호를 입력하세요."
          width="full"
        />
      </div>
      <div>
        <buttonComp
          text="로그인"
          class="w-full"
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

</script>
<style>
    
</style>