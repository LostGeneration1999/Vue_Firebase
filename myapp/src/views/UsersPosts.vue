<template>
    <div>
        <h3>マインドマップ投稿</h3>
        <label for='name'>ニックネーム：ユーザー{{ user.email }}</label>
        <br>
        <input id='name' v-model="name" type='text'>
        <br>
        <label for='comment' >結論</label>
        <textarea id='comment' v-model="comment"></textarea>
        <br>
        <p>画像アップロード</P>
        <input id='name' v-model="name" type='text'>
        <br>
        <input type="file" name="image"  @change="selectFile">
        <br>

        <button @click='createMap'>サーバーに送る</button>
    </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'


export default {
    data(){
        return{
            user: auth.currentUser,
            name: null,
            comment: null,
            user_uid: null,
            user_email: null,
            imageURL: null,
            maps: {},
        }
    },
    computed: {
        idToken: function() {
            return this.$store.getters.idToken;
            }
        },
    methods: {
        selectFile(e){
            this.$store.dispatch('selectFile',e)
        },
        createMap () {
            this.$store.dispatch('upload')
            db.collection('comments').add({
                name: this.name,
                comment: this.comment,
                user: this.user.email,
                uid: this.user.uid,
                imageURl: this.$store.getters.imageURL
            })
            .then(function (docRef){
                console.log("Document written with ID: ", docRef.id);
                this.$store.dispatch('initialize');
            })
            .catch(function (error) {
                console.log("error", error);
            })
        }
    } 
}


</script>