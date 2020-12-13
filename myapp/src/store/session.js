import router from '@/router'
import firebase from 'firebase'
// import { auth } from '@/main'

const state = {
    user: {},
    status: false,
}

const getters = {
    user(state) {
        return state.user;
    },
    isSignedIn(state) {
        return state.status;
    }
}

const mutations = {
    onAuthStateChanged(state, user) {
        state.user = user;
    },
    onUserStatusChanged(state, status) {
        state.status = status;
    },
}

const actions = {
    login({ commit }) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            commit('onUserStatusChanged', result.user.uid ? true : false);
            commit('onAuthStateChanged', result.user);
            router.push('/')
        }).catch(() => alert('ログインに失敗しました'));
    },
    logout({ commit }) {
        firebase.auth().signOut().then(() => {
            commit('onAuthStateChanged', null);
            commit('onUserStatusChanged', false);
        })
    },
    onAuth({ commit }) {
        firebase.auth().onAuthStateChanged(user => {
            user = user ? user : {};
            commit('onAuthStateChanged', user);
            commit('onUserStatusChanged', user.uid ? true : false);
        });
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}