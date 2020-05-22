<template>
    <nav>
    <h2>Header Home</h2>
      <router-link
        to='/' 
        active-class='link--active'
        exact
        class='link'>Home</router-link>
      <router-link 
         :to="{name: 'users-id-profile',
                           params: {id: 1}, 
                           query: {lang: 'ja', page: 2}, hash: '#next-user'}"
        active-class='link--active'
        class='link'>Users</router-link>
      <button @click='increment'>+1</button>
      <button @click='decrement'>-1</button>
    </nav>    
</template>
<script>
//    import { mapMutations } from 'vuex'
    export default {
    
        methods: {
            // ...mapMutations(['increment', 'decrement'])

            increment(){
                // this.$store.state.count++;
                this.$store.commit('increment', 10);
            },
            decrement(){
                // this.$store.state.count--;
                this.$store.commit('decrement', 10);
            }
        }
}
</script>