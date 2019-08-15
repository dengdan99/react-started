import { observable, computed, action } from 'mobx'
import * as ls from 'local-storage'
import { loginByTel } from '../api';
import { History } from 'history';

class UserStore {
  @observable public nickname: string
  @observable public gender: number
  @observable public avatar: string
  @observable public token: string

  constructor () {
    this.nickname = ls.get('nickname')
    this.gender = parseInt(ls.get('gender'))
    this.avatar = ls.get('avatar')
    this.token = ls.get('token')
  }

  @computed
  get isLogin(): boolean {
    return !!(this.nickname && this.token)
  }
  
  @action
  signIn (data: ApiParams.loginByTel): Promise<any> {
    return new Promise((resolve, reject) => {
      loginByTel(data).then(res => {
        if (res.code === 0) {
          const _d = res.data.user_info
          this.saveUserInfo({
            nickname: _d.nick_name,
            gender: _d.sex,
            token: _d.token,
            avatar: _d.avatar,
          })
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      }).catch(err => reject(err))
    })
  }

  @action
  redirectLogin (history: History) {
    if (this.isLogin) return
    console.log(history.location)
  }

  @action
  saveUserInfo (data: any) {
    this.nickname = data.nickname
    this.gender = data.gender
    this.avatar = data.avatar
    this.token = data.token
    ls.set('nickname', data.nickname)
    ls.set('gender', data.gender)
    ls.set('avatar', data.avatar)
    ls.set('token', data.token)
  }

  @action
  logout = (): void => {
    this.token = ''
    ls.clear()
  }
}

export default UserStore
