<template>
    <div>
      <h2 class="subtitle">Lägg till Accessoar</h2>
      <form class="form" @submit.prevent="addAccess">
        <label class="label" for="name">Namn: </label>
        <input class="input" type="text" id="name" v-model="newAccess.name" required><br>

        <label class="label" for="description">Beskrivning: </label>
        <input class="input" type="text" id="description" v-model="newAccess.description" required><br>

        <label class="label" for="price">Pris: </label>
        <input class="input" type="number" id="price" step="0.01" min="0" v-model="newAccess.price" required><br>

        <label class="label" for="type">Typ Av accessoar: </label>
        <select class="select" id="type" v-model="newAccess.type">
          <option value="Halsband">Halsband</option>
          <option value="Ring">Ring</option>
          <option value="Armband">Armband</option>
          <option value="Örhänge">Örhänge</option>
          <option value="Klocka">Klocka</option>
        </select><br>
        
        <label class="label" for="amount">Mängd i lager </label>
        <input class="input" type="number" id="amount" v-model="newAccess.amount"><br>
        
        <button class="button" type="submit">Lägg till</button>
      </form>
    </div>
    
  </template>
  
  <script>
  import DataService from './DataService.vue';
  
  
  export default {
    mixins: [DataService],
    data() {
      return {
        newAccess: {
          name: '',
          description: '',
          price: 0,
          type:'',
          amount:'',
        },
      };
    },
    methods: {
      addAccess() {
        this.addDataAccess(this.newAccess)
          .then(response => {
            // Uppdatera användarlistan med den nya användaren
            this.$emit('access-added', response.data);
            // Återställ formuläret
            this.newAccess = {
                name: '',
                description: '',
                price: 0,
                type:'',
                amount:'',
            };
            // this.games.push(response.data);
          })
          .catch(error => {
            console.error('Fel vid lägg till accessoar:', error);
          });
      },
    },
  };
  </script>
  <style scoped>
    .input {
      margin-bottom: 20px;
      width:auto;
    }
    .button:hover {
      background-color: rgb(181, 236, 170);
    }
  </style>