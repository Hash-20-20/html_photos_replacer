import axios from "axios";

const APP_ID = 'wx38ae2537fc91ef3a'
const APP_SECRET = '8b433f04be204ce720acdaa48b60e8db'

axios.interceptors.response.use(res => res.data)

export function getToken() {
  return axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid: APP_ID,
      secret: APP_SECRET
    }
  })
}
