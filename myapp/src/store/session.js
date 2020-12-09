import router from '@/router'
import firebase from 'firebase'
import { auth } from '@/main'

const state = {
    idToken: null,
    displayName: null,
    userID: null,
}

const getters = {
    idToken: state => state.idToken,
    displayName: state => state.displayName,
    userID: state => state.userID
}

const mutations = {
    updateIdToken(state, idToken) {
        state.idToken = idToken;
    },
    getUserData(state) {
        state.displayName = auth.currentUser.displayName;
        state.userID = auth.currentUser.uid;
    },
    getUserLogout(state) {
        state.displayName = null;
        state.userID = null;
    }
}

const actions = {
    login({ commit }, authData) {
        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password
        ).then(response => {
            commit('getUserData');
            commit('updateIdToken', response.user.getIdToken().toString());
            router.push('/');
        }).catch(() => {
            alert('サインインに失敗しました');
            router.push('/login');
        })
    },
    register({ commit }, authData) {
        firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password
        ).then(response => {
            commit('updateIdToken', response.user.getIdToken().toString());
            return response.user.updateProfile({
                displayName: authData.displayName,
            })
        }).then(() => {
            commit('getUserData');
            router.push('/');
        }).catch(() => {
            alert('サインアップに失敗しました');
            router.push('/register');
        })
    },
    logout({ commit }) {
        firebase.auth().signOut(
        ).then(function () {
            commit('getUserLogout');
            commit('updateIdToken', null);
            router.go('/');
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}