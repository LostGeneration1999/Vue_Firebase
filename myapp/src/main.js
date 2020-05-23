import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

// Firebase設定
let firebaseConfig = {
}

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
