<template>
    <div>
      <h2 class="subtitle">Lägg till klädesplagg</h2>
      <form class="form" @submit.prevent="addClothing">
        <label class="label" for="name">Namn: </label>
        <input class="input" type="text" id="name" v-model="newClothing.name" required><br>

        <label class="label" for="description">Beskrivning: </label>
        <input class="input" type="text" id="description" v-model="newClothing.description" required><br>

        <label class="label" for="price">Pris: </label>
        <input class="input" type="number" id="price" step="0.01" min="0" v-model="newClothing.price" required><br>

        <label class="label" for="colour">Färg: </label>
        <input class="input" type="text" id="colour" v-model="newClothing.colour">
        
        <label class="label" for="amount">Mängd i lager </label>
        <input class="input" type="number" id="amount" v-model="newClothing.amount"><br>
        
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
        newClothing: {
          name: '',
          description: '',
          price: 0,
          colour:'',
          amount:'',
        },
      };
    },
    methods: {
      addClothing() {
        this.addDataClothes(this.newClothing)
          .then(response => {
            // Uppdatera användarlistan med den nya användaren
            this.$emit('clothes-added', response.data);
            // Återställ formuläret
            this.newClothing = {
                name: '',
                description: '',
                price: 0,
                colur:'',
                amount:'',
            };
            // this.games.push(response.data);
          })
          .catch(error => {
            console.error('Fel vid lägg till Klädesplagg:', error);
          });
      },
    },
  };
  </script>
  <style scoped>
    .input {
      margin-bottom: 20px;
      width: auto;
    }
    .button:hover {
      background-color: rgb(181, 236, 170);
    }
  </style>