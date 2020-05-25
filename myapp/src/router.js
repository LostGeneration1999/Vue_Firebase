import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import Users from './views/Users.vue'
import Home from './views/Home.vue'
import store from './store.js'
import Posts from './views/Posts.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'


Vue.use(Router)
Vue.use(VueAxios, axios) 


//サーバーに行く前
const interceptorRequest = axios.interceptors.request.use(
    config => {
        console.log('intercepters rewuest', config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
//サーバーからとってきた後
axios.interceptors.response.use(
    response => {
        console.log('intercepters response', response)
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.request.eject(interceptorRequest);
axios.interceptors.response.eject(interceptorRequest);

export default new Router({
    mode: 'history',
    routes: [{  path: '/', 
                components: {
                    default: Home,
             },
                beforeEnter(to, from ,next){
                    if (store.getters.idToken){
                        next();
                    } else {
                        next('/login');
                    }
                }
            },
             { 
                path: '/login',
                component: Login,
                beforeEnter(to, from ,next){
                    if (store.getters.idToken){
                        next('/');
                    } else {
                        next();
                    }
                }
            },
             { 
                path: '/register',
                component: Register,
                beforeEnter(to, from ,next){
                    if (store.getters.idToken){
                        next('/');
                    } else {
                        next();
                    }
                }
             },
             {
                 path: '/posts',
                 component: Posts,
                 beforeEnter(to, from ,next){
                if (store.getters.idToken){
                        next();
                    } else {
                        next('/login');
                    }
                 }
             },
             {
                 path: '/users/:id', 
                 components: {
                 default: Users},
                 props: true,
                //children: [
                // { path: 'profile/', component: UsersProfile , name: 'users-id-profile'}
                // ],
                beforeEnetr(to, from, next){
                    if (store.getters.idToken){
                        next();
                    }else {
                        next('/login');
                    }
                }
             },
             { path: '/*',  redirect: '/'}],
});