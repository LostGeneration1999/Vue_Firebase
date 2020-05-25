<template>
    <div>
        <!-- <h3>マインドマップ投稿</h3>
        <label for='name'>ニックネーム：ユーザー{{ getUser }}</label> -->
        <router-link  :to="{name: 'users-id-posts',
                            params: {id: Number(id)}}">USER{{id}}の投稿ページへ</router-link>
        
        <router-view></router-view>

        <div style='height: 700px;'></div>
        <router-link id='next-user' 
                     :to="{name: 'users-id-profile',
                           params: {id: Number(id)+1}, 
                           query: {lang: 'ja', page: 2}, hash: '#next-user'}">
        
            次のページへ</router-link>
    </div>
</template>


<script>
export default {
    data() {
        return {
            displayName: null

        }
    },
    // computed: {
    //     getUser() {
    //         return this.$store.getters.displayName;
    //     }
    // }
};
</script>