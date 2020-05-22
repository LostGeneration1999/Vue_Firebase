<template>
    <div>
        <h3>登録</h3>
        <label for='email'>Email:</label>
        <br>
        <input id='email' v-model="email" type='email'>
        <br>
        <label for='username'>ユーザー名</label>
        <br>
        <input id='username' v-model="username" type='text'>
        <br>
        <label for='password'>Password:</label>
        <br>
        <input id='password' v-model="password" type='password'>
        <br>
        <button @click='register'>サーバーに送る</button>

    </div>
</template>

<script>

export default {
    data() {
        return {
            email: "",
            password: "",
            username: ""
        }
    },
    methods: {
        register() {
            this.$store.dispatch('register', {
                email: this.email,
                password: this.password,
                username: this.username
            })
            this.email = '',
            this.password = '',
            this.username = ''
        }
    }
}
</script>