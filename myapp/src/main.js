import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

// Firebase設定
let firebaseConfig = {
  apiKey: "AIzaSyCxrSkpsTwCm5CPT6bMCy_EZ0kw6smJloQ",
  authDomain: "mindmap-app-d9302.firebaseapp.com",
  databaseURL: "https://mindmap-app-d9302.firebaseio.com",
  projectId: "mindmap-app-d9302",
  storageBucket: "mindmap-app-d9302.appspot.com",
  // messagingSenderId: "xxxxxxxxxx",
  // appId: "xxxxxxxxxx"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
