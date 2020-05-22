import axios from '../../axios-database'

const state = {
    index: []
}

const getters = {

}
const mutations = {
    setPosts(state, {posts}){
        state.index = posts
    }
}

const actions = {
    fetchComments({ commit }, authData) {
        axios.get('comments',
        {
            headers: {
                Authorization: `bearer ${authData.idToken}`
            }
        }
        ).then(response => {
            var posts = response.data.documents
            console.log(posts)
            commit('setPosts', { posts });
        })
    },
    registerComments({ commit }, authData){
        axios.post('comments',
            {fields: {name: { stringValue: authData.name},
                      comment: { stringValue: authData.comment}
                    }},
            {
                headers: {
                    Authorization: `bearer ${authData.idToken}`}
            }      
            ).then(response => {
                var posts = response.data.documents
                commit('setPosts', { posts });
            })
            .catch(error => {
                console.log(error);
            });
        this.name = "";
        this.comment = "";
    }
}

// export default {
//     state,
//     getters,
//     mutations,
//     actions
// }