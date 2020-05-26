<template>
    <v-app>
        <v-app-bar color="gray accent-4" dark app>
              <template v-if="isAuthenticated">
                <v-btn to='/' class='header-item'>Mind Map</v-btn>
                <v-btn to='/' class='header-item' @click='logout()'>ログアウト</v-btn>
                <!-- <v-btn @click='toUsers'>USERあああ</v-btn> -->
                <v-btn to='/posts'>投稿画面</v-btn>

              </template>

              <template v-if="isAuthenticated">
                <v-btn to='/login' class='header-item'>ログイン</v-btn>
                <v-btn to='/register' class='header-item'>登録</v-btn>
              </template>
        </v-app-bar>
    <router-view name='header'></router-view>
    <transition
       name='fade'
       mode='out-in'>
        <!-- @before-enter='beforeEnter' -->
      <router-view></router-view>
    </transition>
    </v-app>
</template>

<script>
export default {
  data (){
    return {
      displayName: null,
      userUID: null  
    }
  },
  compused: {
    showName(){
      return this.$store.getters.displayName;
    }
  },
  methods: {
    isAuthenticated(){
      return this.$store.getters.idToken !== null;
    },
    showAuth(){
      return this.$store.getters.idToken;
    },
    logout() {
      this.$store.dispatch('logout');
    },
    // toUsers() {
    //       console.log(this.$store.userUID)
    //       this.$router.push({name: 'users-id-profile', 
    //                          params: { id : this.$store.userUID }});
    // },
  }
}
</script>

<style scoped>
.header-item {
  padding: 10px;
  cursor: pointer;
}
.fade-enter,
.fade-leave-to{
   opacity: 0;
}

.fade-enter-active,
.fade-leave-active{
   transition: opacity 0.5s;
}

.link {
  margin-right: 5%;
}

.link--active {
  font-size: 10px
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
