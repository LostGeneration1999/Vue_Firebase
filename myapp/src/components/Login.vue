<template>
    <v-app>
        <v-card width='50%' class="mx-auto mt-5">
            <v-card-title>
                <h1 class='display-1'>ログイン</h1>
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field prepend-icon="mdi-account-circle" 
                              id='email' 
                              label='E-mail'
                              v-model="email" 
                              type='email' />
                <v-text-field prepend-icon="mdi-lock" 
                              append-icon="mdi-eye-off" 
                              id='password' 
                              label='パスワード'
                              v-model="password" 
                              type='password' />
            </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn class='info' @click='login'>ログイン</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
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