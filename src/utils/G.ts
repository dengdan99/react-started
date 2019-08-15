import { createBrowserHistory } from 'history'

interface G {
  history: History
  gotoSignIn: () => void // 跳转登陆
  getQuery: () => any // 获取url query参数
  encodeQuery: (object: object) => any // object 编码成 url query 字符
}

const history = createBrowserHistory()

/**
 * 设置全局变量G
 */
const G = {
  history,
  gotoSignIn,
  getQuery,
  encodeQuery,
};

function gotoSignIn() {
  const {
    location: { pathname },
  } = window;
  G.history.replace({
    pathname: '/login',
    search: `?from=${pathname}`,
  })
}


function getQuery() {
  const href = window.location.href;
  const result: any = {};
  const regKey = /(\w+)=/g;
  const regValue = /=((\w|[\u4e00-\u9fa5]|%)+)/g;
  let key = regKey.exec(href);
  while (key) {
    const k = key[1];
    const v = regValue.exec(href);
    result[k] = v ? v[1] : null;
    key = regKey.exec(href);
  }
  return result;
}

function encodeQuery(params: any): string {
  let result = '';
  if (!params) {
    return '';
  }
  result = '?';
  Object.keys(params)
    .filter(k => !!params[k])
    .forEach((p, idx) => {
      if (idx !== 0) {
        result += '&';
      }
      result = `${result + p}=${params[p]}`;
    });
  return result;
}

window.G = G
