<template>
    <v-app>
         <v-card width='90%' class="mx-auto mt-5">
            <v-card-title>
                <h2 class='display-1 item--center'>Post</h2>
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-select   :items="items"
                            v-model='theme'
                            label="投稿のテーマを選んでください"
                            ></v-select>
                <v-text-field id='title'
                              label='タイトル'
                              v-model='title'
                              type='text'/>     
                <v-textarea id='comment'
                              label='投稿の詳細'
                              v-model='comment'/>
            <input type="file" name="image"  @change="selectFile">
            </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn class='info item--center' @click='createMap'>投稿</v-btn>
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
            items: ['Product', 'MindMap', 'Hobby'],
            displayName: null,
            userUID: null,
            theme: null,
            number: null,
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
            var num = Math.ceil(Math.random()*4);
            db.collection('comments').add({
                name: this.title,
                comment: this.comment,
                theme: this.theme,
                number: num,
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

<style scoped>

.item--center {
    margin-left: auto;
    margin-right: auto;
}
</style>