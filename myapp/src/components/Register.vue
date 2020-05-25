<template>
   <v-app>
        <v-card width='50%' class="mx-auto mt-5">
            <v-card-title>
                <h1 class='display-1'>登録</h1>
            </v-card-title>
            <v-card-text>
            <v-form>
                 <v-text-field prepend-icon="mdi-account-circle" 
                              id='name' 
                              label='ユーザー名'
                              v-model="displayName" 
                              type='text' />
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
                <v-btn class='info' @click='register'>登録</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            email: "",
            password: "",
            displayName: ""
        }
    },
    methods: {
        register() {
            this.$store.dispatch('register', {
                email: this.email,
                password: this.password,
                displayName: this.displayName
            })
            this.email = '',
            this.password = '',
            this.displayName = ''
        }
    }
}
</script>