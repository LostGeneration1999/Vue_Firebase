<template>
  <div style='width: 100%; mergin auto; padding-top: 10%;' id="app">
    <header>

      <template v-if="isAuthenticated">
       <router-link to='/' class='header-item'>HOME</router-link>
       <span to='/' class='header-item' @click='logout'>ログアウト</span>
      </template>

      <template v-if="isAuthenticated">
        <router-link to='/login' class='header-item'>ログイン</router-link>
        <router-link to='/register' class='header-item'>登録</router-link>
      </template>

    </header>
    <router-view name='header'></router-view>
    <transition
       name='fade'
       mode='out-in'>
        <!-- @before-enter='beforeEnter' -->
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>


export default {
  name: 'App',
  methods: {
    isAuthenticated(){
      console.log(this.$store.getters.idToken)
      return this.$store.getters.idToken !== null;
    },
    logout() {
      this.$store.dispatch('logout');
    }
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
