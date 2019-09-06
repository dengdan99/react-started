import { observable, computed, action } from 'mobx'
import { getBrands } from '../../api';
import { uniqueById } from '../../utils';

export interface brand {
  id: number
  name: string
  icon: string
  ext?: any
}

class BrandStore {
  @observable public brands: brand[] = []
  @observable public fetchBrandParams: ApiParams.getBrands
  @observable public fetchLoading = false

  constructor () {
    this.fetchBrandParams = {
      page: 1,
      pageSize: 10000,
      vehicle_type: 'car',
      is_need_all: 1,
    }
  }

  fetchBrands (): Promise<AjaxResponse> {
    return new Promise((resovle, reject) => {
      if (this.fetchLoading) return reject(new Error('重复获取'))
      this.fetchLoading = true
      getBrands(this.fetchBrandParams).then(res => {
        if (res.code === 0) {
          const _d = (res.data as any[]).map(item => ({
            id: item.brand_id,
            icon: item.brand_logo,
            name: item.brand_name,
            ext: item,
          }))
          this.brands = uniqueById(_d)
          return resovle(res)
        }
        reject(res)
      }).finally(() => this.fetchLoading = false)
    })
    
  }
}

export default BrandStore
