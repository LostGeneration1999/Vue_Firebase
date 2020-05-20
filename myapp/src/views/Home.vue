<template>
    <div>
        <h3>HOme</h3>
        <button @click='toUsers'>userへ行く</button>
    </div>
</template>

<script>
export default {
    methods: {
      toUsers() {
          this.$router.push({name: 'users-id-profile', 
                             params: { id : 1 }});
      }
    }
}
</script>