<template>
    <h2 class="subtitle">Lager Kläder</h2>
    <table class="table is-striped">
        <thead class="thead">
            <tr>
                <td>Namn</td>
                <td>Beskrivning</td>
                <td>Pris</td>
                <td>Färg</td>
                <td>mängd i lager</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in clothing" :key="item.id">
                <td>
                    {{ item.name }}
                </td>
                <td>
                    {{ item.description }}
                </td>
                <td>
                    {{ item.price }}SEK
                </td>
                <td>
                    {{ item.colour }}
                </td>
                <td>
                    <button class="button_amount" @click="updateClothes(item.id, item, item.amount - 1)">-</button>
                    {{ item.amount }}
                    <button class="button_amount" @click="updateClothes(item.id, item, item.amount + 1)">+</button>
                </td>
                <td>
                <button class="button" @click="deleteitem(item.id)">Ta bort</button>
            </td>
            </tr>
        </tbody>
    </table>
<AddClothing @clothes-added="updateClothesList"></AddClothing>
</template>


<script>
    import DataService from '../components/DataService.vue';
    import AddClothing from '../components/AddClothing.vue';
    
    export default {
        mixins: [DataService],
        components:{AddClothing},
        data() {
            return {
                clothing: this.data,
            };
        },
        mounted() {
            this.fetchDataClothes()
            .then(response => {
                this.clothing = response.data;
            })
            .catch(error => {
                console.error('Fel vid inhämtning')
            });
        },
        methods: {
            updateClothesList(NewClothes) {
                this.clothing.push(NewClothes);
            },
            updateClothes(id, data, amount) {
                let NewClothes =  {
                    "name" : data.name,
                    "description" : data.description,
                    "price" : data.price,
                    "colour" : data.colour,
                    "amount" : amount
                }
                this.updateDataClothes(id, NewClothes)
                .then(() => {
                    let index = this.clothing.findIndex(item => item.id ===id);
                    this.clothing[index].amount = amount;
                })
                .catch(error => {
                    console.error('Fel', error)
                });
            },
            deleteitem(itemId) {
                this.deleteDataClothes(itemId)
                .then(() => {
                    this.clothing = this.clothing.filter(item => item.id !== itemId); 
                })
                .catch(error => {
                    console.error('Fel vid radering av Klädesplagg:', error);
                });
            },
        
        }
    }
</script>


<style>
    .button_amount {
        background-color: rgb(245, 250, 253);
        border: 1px solid #999999;
        border-radius: 4px;
    }
    .button_amount:hover {
        background-color: rgb(142, 189, 218);
        /* border: 1px solid #999999;
        border-radius: 4px; */
    }
    .button:hover {
        background-color: #faa9a9;
    }
</style>