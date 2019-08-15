declare namespace ApiParams {
  interface getVerifyCode {
    tel: string
  }
  interface loginByTel {
    tel: string
    ver_code: string
    latitude?: number
    longitude?: number
    current_city: number
    fid?: number
    fuid?: number
    terminal?: number
  }
}
