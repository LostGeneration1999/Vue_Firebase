<template>
  <v-app>
    <v-btn @click='toUsers()'>User</v-btn>
    <v-btn @click='toPost()'>投稿</v-btn>
  </v-app>
</template>

<script>
import { auth } from '../main'

export default {
  data (){
    return {
      user: auth.currentUser
    }
  },
  methods: {
    toUsers() {
      console.log(this.user);
      this.$router.push({name: 'users-id-profile', 
                            params: { id : this.user.email }});
    },
    toPost() {
      console.log(this.user);
      this.$router.push({name: 'users-id-posts',
                            params: { id : this.user.email }})
    },
  }

}
</script>