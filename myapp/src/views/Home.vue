<template>
    <v-app>
        <v-content>
            <h1>投稿一覧</h1>
            <v-layout text-xs-center mt-5 px-3 py-3  row wrap>
                <v-flex lg4 sm6 xs12 v-for='map in maps' :key='map.id' >
                    <v-card dark class="ma-2" @click='getData(map);'>
                        <v-card-title aliign-center class="title headline">{{ map.name }}</v-card-title>
                        <v-card-subtitle>{{ map.moment }}</v-card-subtitle>
                        <v-divider class="mx-3"></v-divider>
                        <v-card-text>
                            {{ map.comment }}
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-dialog v-model="dialog" scrollable max-width="80%">
                    <img :src='image' height="100%" width="100%"/>
                </v-dialog> 
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
    data (){
        return {
            user: null,
            image: null,
            name: null,
            comment: null,
            moment: null,
            dialog: false,
            id: [],
            maps: []
        }
    },
    created() {
            // コメント取得
             {
                var buff = [];
                db.collection("comments").get().then(function(querySnapshot) {
                    querySnapshot.forEach(doc =>  {
                    console.log(doc.id, " => ", doc.data());
                    var data = doc.data();
                    data['id'] = doc.id;
                    buff.push(data);
                    });
                }).then(r => {
                    console.log(r);
                    this.maps = buff;
                });
      }
    },
    methods: {
    // 画像データの取得
    getData: function(map){
        this.image = null,
        this.name = map.name;
        this.comment = map.comment;
        this.moment = map.moment;
        console.log(this.name);

        var spaceRef = firebase.storage().ref().child(map.imageURl);
        spaceRef.getDownloadURL().then(url => {
                this.image = url;
                this.dialog = true;
        })
    },
      toUsers() {
          console.log(this.$store.userUID)
          this.$router.push({name: 'users-id-profile', 
                             params: { id : this.$store.userUID }});
      },
    }
}
</script>

<style scoped>
.title {
    text-align: center;
}
.header-item {
  padding: 10px;
  cursor: pointer;
}
</style>