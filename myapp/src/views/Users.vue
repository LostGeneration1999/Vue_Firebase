<template>
    <div>
        <h3>User</h3>
        <router-link to="/users/1">USER1のページへ</router-link>
        <hr>

        <h1>User No, {{ id }}</h1>
        <!-- <route-view></route-view> -->
        <router-link :to=" '/users/' + (Number(id)+1) +'/profile' ">次のページへ</router-link>
        <router-link :to="'/users/' + Number(id)+'/posts'">USER{{id}}の投稿ページへ</router-link>


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
    props: ['id'],
    watch: {
        $route(to, from){
            console.log(to);
            console.log(from);
        }
    }
};
</script>