<template>
    <div class="uploadForm">
        <p>画像アップロード</P>
        <input id='name' v-model="name" type='text'>
        <br>
        <input type="file" name="image"  @change="selectFile">
        <button @click="upload" type="submit">アップロード</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            uploadFile: null,
            infoMsg: null,
            commentId: null,
            name: '',
            comment: "",
            imageURL: "",
        }
    },
    computed: {
        idToken() {
            return this.$store.getters.idToken;
        }
    },
    methods: {
        selectFile: function(e){
            this.$store.dispatch('selectFile',e)
        },
        upload: function() {
            this.$store.dispatch('upload')
        }
        // selectFile: function (e) {
        //     e.preventDefault();
        //     let files = e.target.files;
        //     this.uploadFile = files[0];
        // },
        // upload: function () {
        //     if (!this.uploadFile) {
        //         this.infoMsg = '選択してください'
        //         return;
        //     }
        //     var storageRef = firebase.storage().ref().child('tmp/' + this.uploadFile.name);
        //     storageRef.put(this.uploadFile).then(function (snapshot) {
        //         console.log('Uploaded a blob or file!');
        //         console.log(snapshot)
        //     });
        // }
    }
}
</script>