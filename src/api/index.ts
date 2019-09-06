import { remoteGet, remotePost } from "./config";
import { msgSign } from "../utils";

export function getEvents(): Promise<AjaxResponse> {
  return remoteGet('/feed/square/filter2')
}

export function getVerifyCode(data: ApiParams.getVerifyCode): Promise<AjaxResponse> {
  const signData = msgSign(data)
  return remoteGet('/publics/verify/send', signData)
}

export function loginByTel(data: ApiParams.loginByTel): Promise<AjaxResponse> {
  return remotePost('/account/login/tellogin', data)
}

export function getFeeds(data: ApiParams.getFeeds): Promise<AjaxResponse> {
  return remoteGet('/feed/square/square', data)
}

export function getBrands(data: ApiParams.getBrands): Promise<AjaxResponse> {
  return remoteGet('/car/brand/lists', data)
}

