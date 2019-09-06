import {Md5} from "md5-typescript"
import * as ls from 'local-storage'
import { unique } from "mobx/lib/internal";

/**
 * 生成签名 和后端约定
 * @param obj 
 */
export function msgSign (obj: object) {
  const timestamp = new Date().getTime()
  const nonce = randomString(10)
  const secret = '6fwed2EPzQ7fyl4w'
  const signObj = objKeySort({
    ...obj,
    nonce: nonce.substring(0, 5),
    secret,
    timestamp
  })
  const signStr = Object.keys(signObj).map(key => signObj[key]).join('')
  return {
    ...obj,
    timestamp,
    nonce,
    sign: Md5.init(signStr),
  }
}

export function getToken (): string {
  return ls.get<string>('token')
}

/**
 * 产生随机字符
 * @param len 
 */
export function randomString (len: number) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'    // ****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****
  const maxPos = $chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

/**
 * object 按key 排序 升序
 * @param obj 
 */
export function objKeySort (obj: any) {
  var newkey = Object.keys(obj).sort()
  var newObj: any = {}
  newkey.forEach(nk => {
    newObj[nk] = obj[nk]
  })
  return newObj
}

/**
 * 去掉字符中的空格 isAll（头尾/所有）
 * isAll: 是否去掉所有空格
 */
export function trim (str: string, isAll?: boolean): string {
  if (isAll) {
    return str.replace(/\s+/g, '')
  }
  return str.replace(/^\s+|\s+$/g, '')
}

/**
 * 
 * @param array 
 * @param key 
 */
export function uniqueById<T extends {id: number}>(array: Array<T>): Array<T> {
  const hash: any = {}
  return array.reduce((item: T[], next) => {
    hash[next.id] ? '' : hash[next.id] = true && item.push(next);
    return item
  }, [])
}
