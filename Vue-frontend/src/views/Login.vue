<template>
  <div>
    <h2 class="subtitle">Login</h2>
    <form @submit.prevent="login" class="form">
      <label for="email">Email:</label><br>
      <input class="input" type="email" v-model="email" required><br><br>

      <label for="password">Password:</label><br>
      <input class="input" type="password" v-model="password" required><br><br>

      <button class="button_login" type="submit">Logga in</button><br><br>
    </form>
    Inget Konto?<a href="/create"> Skapa ett här</a>
  </div>
</template>

<script>
import DataService from '../components/DataService.vue';
// import axios from 'axios';


export default {
  mixins: [DataService],
  data() {
    return {
      input: {
        email: this.email,
        password: this.password,
      }
    };
  },
  methods: {
    login() {
      // Skicka inloggningsuppgifterna till Laravel backend
      this.loginUser({
        'email': this.email,
        'password':this.password})
      .then(response => {
        console.log(response.data.token); // Användaren har loggats in
          localStorage.setItem('access_token', response.data.token);
          this.$router.push('/');
      })
      .catch(error => {
        console.error('Fel vid inloggning:', error);
      });
    },
  },
};
</script>

<style scoped>
  .button_login {
    background-color: white;
    border: 1px solid #999999;
    border-radius: 4px;
    padding: 8px 13px;
  }
  .button_login:hover {
    background-color: #f1f1f1;
  }
  input {
    width: auto;
  }
</style>
