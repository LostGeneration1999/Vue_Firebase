<template>
    <div>
        <h3>マインドマップ投稿</h3>
        <label for='name'>ニックネーム：ユーザー</label>
        <br>
        <input id='name' v-model="name" type='text'>
        <br>
        <label for='comment' >結論</label>
        <textarea id='comment' v-model="comment"></textarea>
        <br>
        <button @click='createComment'>サーバーに送る</button>

        <div v-for='post in posts' :key='post.name'>
            <br>
            <div>名前： {{ post.fields.name.stringValue}}</div>
            <div>コメント： {{ post.fields.comment.stringValue}}</div>
            <br>
        </div>

    </div>
</template>

<script>
import axios from '../axios-database'

export default {
    data(){
        return{
            name: "",
            comment: "",
            posts: []
        }
    },
    computed: {
        idToken() {
            return this.$store.getters.idToken;
            }
        },
        created() {
            axios.get('comments',
            {
                headers: {
                    Authorization: `Bearer ${this.idToken}`
                }
            }
            ).then(response => {
                this.posts = response.data.documents;
                console.log(this.posts);
            })
        },
    methods: {
        createComment() {
            axios.post('comments',
            {
                fields: {
                    name: {stringValue: this.name},
                    comment: {stringValue: this.comment}
               }
            },
            {
                headers: {
                    Authorization: `Bearer ${this.idToken}`
                }
            }
            ).then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.name = "";
        this.comment = "";
        }
    }
}


</script>