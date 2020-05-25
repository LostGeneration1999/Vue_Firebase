import router from '../../router'
import firebase from 'firebase'
import { auth } from '../../main'

const state = {
    idToken: null,
    displayName: null,
    userUID: null,
}

const getters = {
    idToken: state => state.idToken,
    displayName: state => state.displayName
}

const mutations = {
    updateIdToken(state, idToken){
        state.idToken = idToken;
    },
    getUserData(state){
        state.displayName =  auth.currentUser.displayName;
        state.userUID = auth.currentUser.uid;
        console.log( state.displayName);
        console.log(state.userUID)
    }
}

const actions = {
    login({ commit }, authData) {
        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password
        ).then(response => {
            console.log(response);
            commit('getUserData');
            commit('updateIdToken', response.user.getIdToken().toString());
            router.push('/')
        })
    },
    register({ commit }, authData) {
        firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password
        ).then(response => {
            console.log(authData.displayName);
            commit('updateIdToken', response.user.getIdToken().toString());
            return response.user.updateProfile({
                displayName: authData.displayName,
            }) 
        }).then(res => {
            commit('getUserData');
            console.log(res);
            router.push('/');
        }) 
    },
    logout({ commit }) {
        firebase.auth().signOut(
        ).then(function () {
            commit('updateIdToken', null);
            commit('getUserData');
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}