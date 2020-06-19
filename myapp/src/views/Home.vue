<template>
        <v-content>
             <v-carousel
                    cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows-on-hover>
                    <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                    :src="images.src">
                    <v-sheet
                        height="100%">
                        <v-row
                        class="fill-height"
                        align="center"
                        justify="center">
                        <div class="display-3">{{ slide }} Slide</div>
                        </v-row>
                    </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            <v-layout text-xs-center mt-5 px-3   row wrap>
                <v-flex lg4 sm6 xs12 v-for='map in maps' text-xs-center :key='map.id' >
                    <v-card  class="ma-2" max-width="500px" center @click='getData(map);'>
                        <v-img  class="white--text align-end" height='200px'
                                :src="require(`../assets/${map.theme}_${map.number}.jpg`)">
                        <v-card-title aliign-center class="title headline">{{ map.name }}</v-card-title>
                        </v-img>
                        <v-card-text>
                            {{ map.comment }}
                        </v-card-text>
                        <v-divider class="mx-3"></v-divider>
                        <v-card-subtitle>{{ map.moment }}</v-card-subtitle>
                    </v-card>
                </v-flex>
                <v-dialog v-model="dialog" scrollable max-width="80%" max-height='100%'>
                    <img :src='image' height="100%" width="100%"/>
                </v-dialog> 
            </v-layout>
        </v-content>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
    data (){
        return {
            image: null,
            name: null,
            comment: null,
            moment: null,
            dialog: false,
            id: [],
            maps: [],
            images: [
                '@/assets/Hobby1',
                '@/assets/Mindmap1',
                '@/assets/src1'
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
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
        this.theme = map.theme;
        this.number = map.number;
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