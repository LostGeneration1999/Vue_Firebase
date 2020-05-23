<template>
    <div>
        <h3>HOme</h3>
        <button @click='toUsers'>userへ行く</button>
        <button @click='toPost'>投稿する</button>
        <button @click='toUpload'>Uploadする</button>
        <br>

        <button @click='getMap'>サーバーから受け取る</button>
        <br>
        <h3>一覧</h3>

        <span v-for='map in maps' :key='map.comment'>
            <!-- <br>
            <div>{{ getimage_(map.imageURl) }}</div>
            <div>名前： {{ map.name }}</div>
            <dciv>コメント： {{ map.comment }}</div>
            <br> -->

            <!-- <router-link :to="'/maps/'+map.name">
                <span>{{ map.name }}</span>
             </router-link> -->
            <span class='header-item' @click='getData(map);'>{{ map.name }}</span>
            <br>
        </span>

        <span id="app0">
            <h1>{{ name }}</h1>
            <hr>
            <h2>{{  comment }}</h2>
            <img :src='image' height="200" width="200"/>
        </span>
        

    </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'


export default {
    el: "#app0",
    data (){
        return {
            user: auth.currentUser,
            image: null,
            name: null,
            comment: null,
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
            console.log(data);
            buff.push(data);
            });
        }).then(r => {
            console.log(r);
            this.maps = buff;  
        });
      },
     getData: function(map){
            this.name = map.name
            this.comment = map.comment
            this.$store.dispatch('getimage',map.imageURl);
            this.image = this.$store.getters.getImg;
            this.$store.dispatch.initialize;
            console.log(this.image);
    },
      toUsers() {
          this.$router.push({name: 'users-id-profile', 
                             params: { id : this.user.email }});
      },
       toPost() {
           this.$router.push({name: 'users-id-posts',
                              params: { id : this.user.email }})
       },
       toUpload() {
           this.$router.push({name: 'users-id-upload',
                              params: { id : this.user.email  }})
       }
    }
}
</script>

<style scoped>
.header-item {
  padding: 10px;
  cursor: pointer;
}
</style>