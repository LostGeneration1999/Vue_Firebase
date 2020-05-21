<template>
    <div>
        <h3>HOme</h3>
        <button @click='toUsers'>userへ行く</button>
        <button @click='toPost'>投稿する</button>
        <p>{{ myComponentDoubleCount }}</p>
        <p>{{ tripleCount }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    methods: {
      toUsers() {
          this.$router.push({name: 'users-id-profile', 
                             params: { id : 1 }});
      },
       toPost() {
           this.$router.push({name: 'users-id-posts',
                              params: { id : 1 }})
       },
    computed:  mapGetters({
        myComponentDoubleCount: 'doubleCount'   
    }),
    // computed: {
    //     ...mapGetters(['doubleCount', 'tripleCount'])
    // },
}
}
</script>