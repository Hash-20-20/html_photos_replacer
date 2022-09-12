import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './index.css'

import toast from '@/plugins/toast'
Vue.use(toast)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
