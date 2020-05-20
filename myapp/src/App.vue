<template>
  <div style='width: 70%; mergin auto; padding-top: 10%;' id="app">
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
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  methods: {
    // beforeEnter(){
    //   this.$root.$emit('triggerScroll')
    // }
  }
}
</script>

<style scoped>
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
