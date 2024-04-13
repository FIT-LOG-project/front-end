import { defineStore } from "pinia";

export const useErrorCodeStore = defineStore('errorCode', {
    state: () => ({
        OTP_FIELD: {
            code: 70,
            msg: '6자리의 인증 번호를 입력하세요'
        },
        OTP_NOT_AGREEMENT: {
            code: 72,
            msg: '인증 번호가 일치하지 않습니다.'
        },
        OTP_EXPIRED_TIME: {
            code: 71,
            msg: '인증 번호가 만료되었습니다.'
        },
        EMAIL_FIELD: {
            code: 10,
            msg: '잘못된 이메일 형식입니다.'
        },
        EMAIL_DUPLICATE: {
            code: 11,
            msg: "이미 존재하는 이메일 입니다."
        },
        PASSWORD_FIELD: {
            code: 20,
            msg: "6 ~ 15 자리의 비밀 번호를 입력해주세요."
        },
        PASSWORD_EXPIRED_TIME: {
            code: 21,
            msg: "비밀 번호를 다시 입력해야 합니다."
        },
        PASSWORD_FAIL_AUTH: {
            code: 22,
            msg: "비밀 번호 인증에 실패했습니다."
        },
        PASSWORD_NEW_NOT_AGREEMENT: {
            code: 23,
            msg: "재확인 비밀 번호가 일치하지 않습니다."
        }
    })
})