import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store.js'
import Posts from '@/views/Posts.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

Vue.use(Router)
Vue.use(VueAxios, axios)


export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        components: {
            default: Home,
        },
    },
    {
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters.isSignedIn) {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: '/register',
        component: Register,
        beforeEnter(to, from, next) {
            if (store.getters.isSignedIn) {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: '/posts',
        component: Posts,
        beforeEnter(to, from, next) {
            if (store.getters.isSignedIn) {

                next();
            } else {
                next('/login');
            }
        }
    },
    { path: '/*', redirect: '/' }],
});