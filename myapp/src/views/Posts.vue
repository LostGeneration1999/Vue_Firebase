<template>
    <v-app>
         <v-card width='50%' class="mx-auto mt-5">
            <v-card-title>
                <h1 class='display-1'>マインドマップを投稿する</h1>
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field id='title'
                              label='マインドマップのテーマ'
                              v-model='title'
                              type='text'/>
                <v-textarea id='comment'
                              label='マインドマップの詳細'
                              v-model='comment'/>
                <!-- <v-file-input 
                              name='image'
                              type='file'
                              label="画像ファイルをアップロードしてください"
                              @change='selectFile' /> -->
            <input type="file" name="image"  @change="selectFile">
            </v-form>
            </v-card-text>
            
            <v-card-actions>
                <v-btn class='info' @click='createMap'>投稿</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import { db } from '../main'
import moment from  'moment'


export default {
    data(){
        return{
            displayName: null,
            userUID: null,
            email: null,
            title: null,
            comment: null,
            moment: null,
            imageURL: null,
            maps: {},
        }
    },
    computed: {
        idToken: function() {
            return this.$store.getters.idToken;
            },
        getUser: function() {
            return this.$store.getters.displayName;
            }
        },
    methods: {
        selectFile(e){
            this.$store.dispatch('selectFile',e)
            
        },
        createMap () {
            this.$store.dispatch('upload')
            this.moment = moment().format('YYYY-MM-DD')
            console.log(this);
            db.collection('comments').add({
                name: this.title,
                comment: this.comment,
                user: this.email,
                uid: this.userUID,
                moment: this.moment,
                imageURl: this.$store.getters.imageURL
            })
            .then(function (docRef){
                console.log(this);
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