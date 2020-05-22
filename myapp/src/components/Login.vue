<template>
    <div>
        <h3>ログイン</h3>
        <label for='email'>Email:</label>
        <br>
        <input id='email' v-model="email" type='email'>
        <br>
        <label for='password'>Password:</label>
        <br>
        <input id='password' v-model="password" type='password'>
        <br>
        <button @click='login'>サーバーに送る</button>

    </div>
</template>

<script>

export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login(){
            this.$store.dispatch('login',{
                email: this.email,
                password: this.password
            })
            this.email = '',
            this.password = ''
        }
    }
}
</script>