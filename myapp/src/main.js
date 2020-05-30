import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify,{
  iconfont: 'md',
})
Vue.config.productionTip = false

// Firebase設定
let firebaseConfig = {
}

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()

new Vue({
  vuetify : new Vuetify(),
  router,
  store,
  render: h => h(App),
}).$mount('#app')
