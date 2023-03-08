import Vue from 'vue'
import store  from './store/index'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  store:store,
  render: h => h(App),
}).$mount('#app')
