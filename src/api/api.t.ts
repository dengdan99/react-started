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

  interface getFeeds {
    spm?: string,
    page: number,
    longitude?: number,
    latitude?: number,
  }

  interface getBrands {
    page: number
    pageSize: number
    vehicle_type: 'car' | 'moto'
    is_need_all: 0 | 1
  }
}
