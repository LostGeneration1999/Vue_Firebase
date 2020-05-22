import router from '../../router'
import axios from '../../axios-auth'

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
        axios.post('/accounts:signInWithPassword?key=AIzaSyCxrSkpsTwCm5CPT6bMCy_EZ0kw6smJloQ',
        {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        }
        ).then(response => {
            console.log(response);
            commit('updateIdToken', response.data.idToken);
            router.push('/')

        })  
    },
    register({ commit }, authData) {
        axios.post('/accounts:signUp?key=AIzaSyCxrSkpsTwCm5CPT6bMCy_EZ0kw6smJloQ',
        {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        }
        ).then(response => {
            console.log(response);
            commit('updateIdToken', response.data.idToken);
            router.push('/')
        })  
    },
    logout({ commit }) {
        commit('updateIdToken', null);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}