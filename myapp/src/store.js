import Vue from 'vue'
import Vuex from 'vuex'
import session from './store/modules/session'
import comments from './store/modules/comments'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        session,
        comments
    }
});
