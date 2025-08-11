import axios from 'axios'
import { config } from '../utils/config';
import bus from '../utils/bus';
import { useUserStore } from '@/stores/user';
import pinia from '../stores/pinia';
import LocalUtil from '../utils/LocalUtil';
import I18n from '../utils/I18n';
import { decryptPKCS1v15, encryptPKCS1v15 } from './key';
import { showToast } from 'vant';
const useKey = false
const userLang = navigator.language || navigator.languages[0];
const defaultLang = userLang.includes('zh') ? 'zh' : 'en';
let userStore;
// let cancel: Canceler
const axiosIns = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    "Content-Type": 'application/json'
  },
  maxRedirects: 3
  // cancelToken: new axios.CancelToken((c) => {
  //     // 存储取消函数
  //     cancel = c;
  // })
})


let noKeyUrl = ['/app/upload', '/user/recharge']

//请求拦截器
axiosIns.interceptors.request.use((requestConfig): any => {
  requestConfig.baseURL = process.env.NODE_ENV === 'production' ? config.proBaseURL : config.devBaseURL
  userStore = useUserStore(pinia);
  requestConfig.headers = {
    "token": userStore.token,
    "Accept-Language": LocalUtil.stringForKey("lang", defaultLang),
    "Content-Type": 'application/json' //'application/x-www-form-urlencoded' application/json
  }
  if (useKey) {
    if (requestConfig.method === 'post' && requestConfig.data && noKeyUrl.includes(requestConfig.url as string) === false) {
      let { ciphertext, error } = encryptPKCS1v15(JSON.stringify(requestConfig.data))
      if (error) {
        return Promise.reject(error)
      }
      requestConfig.data = {
        data: ciphertext
      }
    }

    // else if (requestConfig.method === 'get' && requestConfig.params) {
    //     let { ciphertext, error } = encryptPKCS1v15(JSON.stringify(requestConfig.params))
    //     if (error) {
    //         return Promise.reject(error)
    //     }
    //     requestConfig.url = requestConfig.url + '?data=' + ciphertext
    //     requestConfig.params = {}
    // }
  }
  return requestConfig
}, (error) => {
  showToast({
    message: '网络错误,请切换网络后刷新页面!',
    position: 'top',
  })
  return Promise.reject(error)
})
//  响应拦截器
axiosIns.interceptors.response.use(async (res): Promise<any> => {
  if (useKey) {
    let { plaintext, error } = decryptPKCS1v15(JSON.stringify(res.data))
    if (error) {
      return Promise.reject(error)
    }
    res.data = JSON.parse(plaintext)
  }

  if (res.data.code != 200) {
    console.log("错误：：：", res.config.url, res.data)
    if (res.data.code == 201 || res.data.code == 202) {
      bus.emit('logout')
      // ElMessage.closeAll();ElMessage.error(I18n.t(error.response.data))
    } else {
      showToast({
        message: res.data.msg,
        position: 'top',
      })
    }
    return Promise.reject(res.data)
  }
  return res.data
}, (error) => {
  if (error.status == 201 || error.status == 202) {
    bus.emit('logout')
  } else {
    showToast({
      message: `网络错误,请切换网络后刷新页面!`,
      position: 'top',
    })
  }
  return Promise.reject(error)
})
export default axiosIns
