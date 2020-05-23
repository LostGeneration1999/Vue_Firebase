import firebase from 'firebase'

const state =  {
    imageURL: null,
    uploadFile: null,
    infoMsg: null,
    getImg : null,
}

const getters = {
    imageURL: state => state.imageURL,
    uploadFile: state => state.uploadFile,
    infoMsg: state => state.infoMsg,
    getImg: state => state.getImg
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
        state.getImg = null;
    },
    getimage (state, URL){
        var spaceRef = firebase.storage().ref().child(URL);
        this.getImg = spaceRef;
    }
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
    getimage: function({ commit }, URL){
        commit('getimage', URL)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}