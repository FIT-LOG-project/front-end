<template>
  <div class="flex justify-center items-center h-screen bg-blue-50">
    <main class="border-white h-96 w-80 p-4 flex flex-col justify-between shadow-2xl rounded bg-white">
      <img
        v-show="requestLoadingStore.getIsLoading()"
        src="/assets/progress_active.svg"
        class="animate-spin w-10 h-10 absolute z-50 left-1/2 -ml-5 top-1/2 -mt-5"
      >
      <header :class="{ 'blur-sm': requestLoadingStore.getIsLoading() }">
        <button
          v-if="!stepper.success"
          @click="onClickBackMove"
        >
          <img src="/assets/backNarrow.svg">
        </button>

        <div v-if="stepper.inputEmail">
          <h1 class="text-3xl">
            안녕하세요!
          </h1>
          <h2>회원 가입에는 이메일이 필요해요</h2>
        </div>
        <div v-else-if="stepper.emailAuth">
          <h1 class="text-3xl">
            인증 번호 발송!
          </h1>
          <h2>해당 이메일로 인증 번호를 보냈어요!</h2>
        </div>
        <div v-else-if="stepper.inputPassword">
          <h1 class="text-3xl">
            이제 끝나가요!
          </h1>
          <h2>비밀 번호를 입력해주세요!</h2>
        </div>
        <div v-else-if="stepper.passwordRecomfirm">
          <h1 class="text-3xl">
            마지막이에요!
          </h1>
          <h2>비밀 번호를 다시 한번 입력해주세요!</h2>
        </div>
        <div v-else-if="stepper.success">
          <h1 class="text-3xl">
            가입 완료!
          </h1>
          <h2>이제 로그인을 할 수 있어요!</h2>
        </div>
      </header>
      <div :class="{ 'blur-sm': requestLoadingStore.getIsLoading() }">
        <div
          v-show="errorStore.isError"
          class="text-red-500 text-xs font-semibold mb-2"
        >
          {{ errorStore.errorMsg }}
        </div>
        <form @submit.prevent="onClickNext">
          <inputComp
            v-if="stepper.inputEmail"
            v-model="userInfo.email"
            type="email"
            place-holder="이메일을 입력하세요."
            underline
            width="full"
            :class="{ 'border-red-500': errorStore.isError }"
          />
          <inputComp
            v-else-if="stepper.emailAuth"
            v-model="userInfo.otp"
            type="text"
            place-holder="인증 번호를 입력하세요."
            underline
            width="full"
            :class="{ 'border-red-500': errorStore.isError }"
          />
          <inputComp
            v-else-if="stepper.inputPassword"
            v-model="userInfo.password"
            type="password"
            place-holder="6 ~ 15 자리의 비밀번호를 입력하세요."
            underline
            width="full"
            :class="{ 'border-red-500': errorStore.isError }"
          />
          <inputComp
            v-else-if="stepper.passwordRecomfirm"
            v-model="userInfo.passwordRecomfirm"
            type="password"
            place-holder="6자리 이상의 문자를 입력하세요."
            underline
            width="full"
            :class="{ 'border-red-500': errorStore.isError }"
          />
        </form>
        <div
          v-show="stepper.emailAuth"
          class="text-xs flex justify-between mt-2"
        >
          <button
            class="border-b"
            @click="sendEmail"
          >
            인증 번호 재전송
          </button>
          <div>
            남은 시간: {{ expirationTimerStore.minute }}분 {{ expirationTimerStore.second }}초
          </div>
        </div>
      </div>
      <div class="w-full text-right">
        <buttonComp
          v-if="stepper.success"
          text="로그인 하러 가기"
          class="w-full"
          @click="onClickNext"
        />
        <buttonComp
          v-else
          text="다음"
          class="w-16"
          :disabled="requestLoadingStore.getIsLoading()"
          :class="{ 'blur-sm': requestLoadingStore.getIsLoading() }"
          @click="onClickNext"
        />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
const expirationTimerStore = useExpirationTimer()
const errorStore = useErrorStore()
const errorCodeStore = useErrorCodeStore()
const requestLoadingStore =  useRequestLoadingStore()

const stepper = reactive({
  inputEmail: true,
  emailAuth: false,
  inputPassword: false,
  passwordRecomfirm: false,
  success: false
})

const userInfo = reactive({
  email: "",
  password: "",
  passwordRecomfirm: "",
  otp: ""
})

// onCLick

const onClickBackMove = () => {
  if (stepper.inputEmail) {
    navigateTo('/login')
    errorStore.$reset()
  } else if (stepper.emailAuth) {
    errorStore.$reset()

    stepper.emailAuth = false
    stepper.inputEmail = true
  } else if (stepper.inputPassword) {
    errorStore.$reset()

    stepper.inputPassword = false
    stepper.emailAuth = true
  } else if (stepper.passwordRecomfirm) {
    errorStore.$reset()

    stepper.passwordRecomfirm = false
    stepper.inputPassword = true
  }
}

const onClickNext = () => {
  if (stepper.inputEmail) {
    sendEmail()
  } else if (stepper.emailAuth) {
    // 이메일 인증 후 비밀 번호 입력 화면으로 넘어가기

    reqCertifyOtp()
  } else if (stepper.inputPassword) {

    reqValidPassword()
  } else if (stepper.passwordRecomfirm) {

    // 가입 완료 화면으로 넘어가기
    reqCertifyPassword()
  } else if (stepper.success) {
    // router.push("/login")
    navigateTo("/login")
  }
}

// Function


// REST API

// 이메일 서버로 전송
const sendEmail = async () => {
  requestLoadingStore.start()
  errorStore.$reset()

  await $fetch('/api/v1/auth/locals/email', {
    onResponseError({ response }) {
      console.log(response)
      const errorCodes: number[] = response._data.errorCodes
      console.log(errorCodes)

      if (errorCodes.includes(errorCodeStore.EMAIL_FIELD.code)) {
        errorStore.createError(errorCodeStore.EMAIL_FIELD.msg)
      }

      if (errorCodes.includes(errorCodeStore.EMAIL_DUPLICATE.code)) {
        errorStore.createError(errorCodeStore.EMAIL_DUPLICATE.msg)
      }
    },
    method: 'POST',
    body: {
      email: userInfo.email
    }
  }).then((data: any) => {
    stepper.inputEmail = false
    stepper.emailAuth = true

    reqExpirationTime()
  }).catch(function (error) {
    console.log(error)
  }).finally(() => {
    requestLoadingStore.init()
  })
}

// 유효 시간 서버에 요청
const reqExpirationTime = async () => {

  await $fetch('/api/v1/auth/locals/email/expiration', {
    onResponseError({ response }) {
      const errorCodes: number[] = response._data.errorCodes
    },
    method: 'GET',
    params: {
      "email": userInfo.email
    }
  }).then((data: any) => {
    console.log(data)
    expirationTimerStore.realTime = data.data.expire

    expirationTimerStore.reduceExpiration()
  })
}

// 인증 번호 인증
const reqCertifyOtp = async () => {
  requestLoadingStore.start()
  errorStore.$reset()

  await $fetch('/api/v1/auth/locals/email/otp', {
    onResponseError({ response }) {
      const errorCodes: number[] = response._data.errorCodes

      if (errorCodes.includes(errorCodeStore.OTP_FIELD.code)) {
        errorStore.createError(errorCodeStore.OTP_FIELD.msg)
      }

      if (errorCodes.includes(errorCodeStore.OTP_NOT_AGREEMENT.code)) {
        errorStore.createError(errorCodeStore.OTP_NOT_AGREEMENT.msg)
      }

      if (errorCodes.includes(errorCodeStore.OTP_EXPIRED_TIME.code)) {
        errorStore.createError(errorCodeStore.OTP_EXPIRED_TIME.msg)
      }
    },
    method: 'POST',
    body: {
      email: userInfo.email,
      otp: userInfo.otp
    }
  }).then((data: any) => {
    stepper.emailAuth = false
    stepper.inputPassword = true
  }).finally(() => {
    requestLoadingStore.init()
  })
}

// 비밀 번호 유효성 검사
const reqValidPassword = async () => {
  requestLoadingStore.start()
  errorStore.$reset()

  await $fetch('/api/v1/auth/locals/password', {
    onResponseError({ response }) {
      const errorCodes: number[] = response._data.errorCodes

      if (errorCodes.includes(errorCodeStore.PASSWORD_FIELD.code)) {
        errorStore.createError(errorCodeStore.PASSWORD_FIELD.msg)
      }
    },
    method: "POST",
    body: {
      email: userInfo.email,
      password: userInfo.password
    }
  }).then((data: any) => {
    stepper.inputPassword = false
    stepper.passwordRecomfirm = true
  }).finally(() => {
    requestLoadingStore.init()
  })
}

// 비밀 번호 재확인
const reqCertifyPassword = async () => {
  requestLoadingStore.start()
  errorStore.$reset()

  await $fetch("/api/v1/auth/locals/password/reconfirmation", {
    onResponseError({ response }) {
      const errorCodes: number[] = response._data.errorCodes
      console.log(errorCodes)

      if (errorCodes.includes(errorCodeStore.PASSWORD_NEW_NOT_AGREEMENT.code)) {
        errorStore.createError(errorCodeStore.PASSWORD_NEW_NOT_AGREEMENT.msg)
      }

      if (errorCodes.includes(errorCodeStore.PASSWORD_FIELD.code)) {
        errorStore.createError(errorCodeStore.PASSWORD_FIELD.msg)
      }

      if (errorCodes.includes(errorCodeStore.PASSWORD_EXPIRED_TIME.code)) {
        errorStore.createError(errorCodeStore.PASSWORD_EXPIRED_TIME.msg)
      }
    },
    method: "POST",
    body: {
      email: userInfo.email,
      password: userInfo.passwordRecomfirm
    }
  }).then((data: any) => {
    requJoinMember()
    stepper.passwordRecomfirm = false
    stepper.success = true
  }).finally(() => {
    requestLoadingStore.init()
  })
}

const requJoinMember = async () => {
  await $fetch("/api/v1/auth/locals", {
    method: "POST",
    body: {
      email:userInfo.email,
      password:userInfo.password
    }
  }).then((data: any) => {
  }).catch((error: any) => {
    console.log(error)
  })
}
</script>
<style lang="">

</style>