<template>
    <form class="form" @submit.prevent="addUser">
        <label for="email">Email: </label>
        <input class="input" v-model="userData.email" name="email" type="email">
        <span v-if="errors.email" class="error-message">{{ errors.email[0] }}</span><br>

        <label for="name">Namn: </label>
        <input class="input" v-model="userData.name" name="name" type="text">
        <span v-if="errors.name" class="error-message">{{ errors.name[0] }}</span><br>

        <label for="password">Lösenord: </label>
        <input class="input" v-model="userData.password" name="password" type="password">
        <span v-if="errors.password" class="error-message">{{ errors.password[0] }}</span><br>

        <label for="con_password">Bekräfta Lösenord: </label>
        <input class="input" v-model="userData.confirmPassword" name="con_password" type="password">
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword[0] }}</span><br>


        <label for="remember">Kom ihåg mig? </label>
        <input v-model="userData.remember" name="remember" type="checkbox"><br>

        <button class="button_user" type="submit">Lägg till</button>
    </form>
</template>
 

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
            userData: {
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                remember: false,
            },
            errors: {},
            };
        },
        methods: {
            addUser() {
                if (this.userData.password !== this.userData.confirmPassword) {
                    this.errors.confirmPassword = ['Passwords must be a match!'];
                    return;
                }
                if (this.userData.password.length < 8) {
                    this.errors.password = ['Lösenordet måste va minst 8 tecken']
                    return
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.userData.email)) {
                    this.errors.email = ['Ogiltigt email-format'];
                    return
                }

            // Skicka användardata till Laravel API
                axios.post('http://localhost:8000/api/register', this.userData)
                    .then(response => {
                    console.log(response.data); // Visa API-svaret i konsolen

                    // Återställ formuläret efter att användaren har lagts till
                    this.userData.email = '';
                    this.userData.name = '';
                    this.userData.password = '';
                    this.userData.confirmPassword = '';
                    this.userData.remember = false;
                    this.errors = {}; // Nollställ fel efter en framgångsrik post
                    this.$router.push('/login');
                })
                    .catch(error => {
                    // Om felkoden är 422 (valideringsfel)
                    if (error.response && error.response.status === 422) {
                        this.errors = error.response.data.errors || {};
                    } else {
                        console.error('Fel vid läggning till användare:', error);
                    }
                });
            },
        },
    };
</script>

<style>
    .error-message {
        color: red;
        font-size: 14px;
        margin-top: 4px;
        display: block;
    }
    .button_user {
    background-color: white;
    border: 1px solid #999999;
    border-radius: 4px;
    padding: 8px 13px;
  }
  .button_user:hover {
    background-color: #f1f1f1;
  }
</style>