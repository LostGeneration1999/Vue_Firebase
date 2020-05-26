<template>
    <v-app>
        <v-content>
            <v-layout text-xs-center px-3 py-3  row wrap>
                <v-btn @click='getMap'>サーバーから受け取る</v-btn>
                    <v-card lg4 sm12 xs12 v-for='map in maps' :key='map.id' @click='getData(map);'>
                        <v-flex>
                        <div>名前： {{ map.name }}</div>
                        <br>
                        <div>コメント： {{ map.comment }}</div>
                        <div>作成日：{{ map.moment }}</div> 
                        <span class='header-item'>{{ map.id }}</span>
                        </v-flex>
                    </v-card>

                    <v-dialog v-model="dialog" scrollable max-width="80%">
                        <v-card>
                        <img :src='image' height="200" width="200"/>
                        <v-card-title>{{ name }}</v-card-title>
                        <v-card-text>{{ comment }}</v-card-text>

                        </v-card>
                    </v-dialog> 
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>
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
            maps: [],
        }
    },
    // composed: {
    //     getimage_: function(imageurl){
    //         this.$store.dispatch('getimage',imageurl);
    //         this.image = this.$store.getters.getImg;
    //         this.$store.dispatch.initialize;
    //     }
    // },
    methods: {
     getMap: function() {
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
      },
     getData: function(map){
            this.name = map.name;
            this.comment = map.comment;
            this.moment = map.moment;
            console.log(this.name);
            // console.log(map.imageURl);
            this.$store.dispatch('getimage',map.imageURl);
            this.image = this.$store.getters.getImg;
            this.$store.dispatch.initialize;
            console.log(this.image);
            this.dialog = true;
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
.header-item {
  padding: 10px;
  cursor: pointer;
}
</style>