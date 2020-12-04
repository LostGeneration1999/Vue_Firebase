import Vue from 'vue'
import Vuex from 'vuex'
import session from './store/session'
import comments from './store/comments'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        session,
        comments
    }
});
