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
        <!-- <span v-for='map in maps' :key='map.name'>
            <br>
            <div>名前： {{ map.fields.name.stringValue}}</div>
            <div>コメント： {{ map.fields.comment.stringValue}}</div>
            <br>
        </span> -->
        

    </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'


export default {
    data (){
        return {
            user: auth.currentUser,
            image: null,
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
        db.collection("comments").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            // console.log(doc.data().imageURl);
            // console.log(this);
            // console.log(this.$store);
            // this.getimage_(doc.data().imageURl);
            });
        });
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