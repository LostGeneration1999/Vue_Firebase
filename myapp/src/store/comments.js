import firebase from 'firebase'

const state =  {
    imageURL: null,
    uploadFile: null,
    infoMsg: null,
}

const getters = {
    imageURL: state => state.imageURL,
    uploadFile: state => state.uploadFile,
}

const mutations = {
    uploadFile (state, uploadFile){
        state.uploadFile = uploadFile
    },
    upload (state){
        if (!state.uploadFile) {
            state.infoMsg = '選択してください'
            return;
        }
        state.imageURL = 'tmp/' + state.uploadFile.name
        var storageRef = firebase.storage().ref().child(state.imageURL);
        storageRef.put(state.uploadFile).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
            console.log(snapshot)
        });
    },
    initialize (state) {
        state.imageURL = null;
        state.uploadFile = null;
    },
}

const actions = {
    selectFile: function ({ commit }, e) {
        e.preventDefault();
        let files = e.target.files;
        commit('uploadFile', files[0])
    },
    upload: function ({ commit },) {
        commit('upload');
    },
    initialize: function({ commit }){
        commit('initialize')
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}