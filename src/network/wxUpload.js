import axios from "axios";

const APP_ID = ''
const APP_SECRET = ''

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
