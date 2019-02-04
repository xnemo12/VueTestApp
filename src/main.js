import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'
import Buefy from 'buefy'

import NProgress from 'nprogress'
import 'buefy/dist/buefy.css'

// styles
import 'nprogress/nprogress.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueResource)

Vue.http.options.root = `http://localhost:8000/api/`
Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next(() => {
    NProgress.done()
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
