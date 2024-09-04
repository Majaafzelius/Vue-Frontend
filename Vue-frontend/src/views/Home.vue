<template>
    <h2 class="subtitle">Start</h2>
    <p v-if="!isLoggedIn"> 
        Du är utloggad. <br>
        Vänligen logga in för att komma åt det fulla API:t
    </p>
    <p v-if="isLoggedIn">
        Välkommen! På denna sida har du tillgång till det fulla API:t för att hantera företagets lager
    </p>
</template>

<script>
export default {
data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    this.isLoggedIn = !!token;
  } }
    
</script>

<style>

</style>
