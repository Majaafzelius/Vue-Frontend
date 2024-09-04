<template>
  <header class="header is-flex is-justify-content-center is-flex-direction-column">
    <h1 class="title">Lager</h1>

    <nav class="navbar">
      <a v-if="!isLoggedIn" @click="goToLogin" class="navbar-item">Logga in</a>
      <a v-if="isLoggedIn" @click="logout" class="navbar-item">Logga ut</a>

      <a class="navbar-item" href="/">Hem</a>
      <a class="navbar-item" href="/clothes">Kläder</a>
      <a class="navbar-item" href="/access">Accessoarer</a>
    </nav>
  </header>

  
  <main class="view">
    <router-view>

    </router-view>
  </main>

  <footer class="footer">
    <div>
      <p>Skapad HT2023 för kursen DT193G, Fullstack-utveckling med ramverk, Av Maja Afzelius.</p>
    </div>
  </footer>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      localStorage.removeItem('access_token');
      this.isLoggedIn = false;
      this.$router.push('/');
    },
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    this.isLoggedIn = !!token;
  },
};
</script>

<style>

  .view {
    margin: 5% 11%;

  }
  .header {
    border-bottom: 2px solid #d3d2d2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3% 0;
    padding-bottom: 3%;
  }
  .navbar {
    text-align: center;
  }
  .is-desktop {
    margin: 0 auto; /* Centrera innehållet på desktop */
  }
</style>
