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

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            name: "",
            comment: "",
        }
    },
    methods: {
        createComment() {
            axios.post('https://firestore.googleapis.com/v1/projects/mindmap-app-d9302/databases/(default)/documents/comments',
            {fields: {name: { stringValue: this.name},
                      comment: { stringValue: this.comment}
                    }}
            )
            .then(response => {
                alert(response.data.origin);
            })
            .catch(error => {
                alert(error);
            });
        // this.name = "";
        // this.comment = "";
        }
    }
}


</script>