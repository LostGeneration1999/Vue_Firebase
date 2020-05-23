import router from '../../router'
import firebase from 'firebase'

const state = {
    idToken: null
}

const getters = {
    idToken: state => state.idToken
}

const mutations = {
    updateIdToken(state, idToken){
        state.idToken = idToken;
        // state.username = user.name;
    }
}

const actions = {
    login({ commit }, authData) {
        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password
        ).then(response => {
            console.log(response);
            commit('updateIdToken', response.user.getIdToken().toString());
            router.push('/')
        })  
    },
    register({ commit }, authData) {
        firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password
        ).then(response => {
            console.log(response);
            commit('updateIdToken', response.user.getIdToken().toString());
            router.push('/')
        })  
    },
    logout({ commit }) {
        firebase.auth().signOut(
        ).then(function () {
            commit('updateIdToken', null);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}