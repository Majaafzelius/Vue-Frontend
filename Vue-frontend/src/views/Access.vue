<template>
    <h2 class="subtitle">Lager Accessoar</h2>
    <table class="table is-striped">
        <thead class="thead">
            <tr>
                <td>Namn</td>
                <td>Beskrivning</td>
                <td>Pris</td>
                <td>Typ av accessoar</td>
                <td>mängd i lager</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in accessories" :key="item.id">
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
                    {{ item.type }}
                </td>
                <td>
                    <button class="button_amount" @click="updateAccess(item.id, item, item.amount - 1)">-</button>
                    {{ item.amount }}
                    <button class="button_amount" @click="updateAccess(item.id, item, item.amount + 1)">+</button>
                </td>
                <td>
                <button class="button" @click="deleteitem(item.id)">Ta bort</button>
            </td>
            </tr>
        </tbody>
    </table>
    <AddAccess @access-added="updateAccessList"></AddAccess>
</template>


<script>
    import DataService from '../components/DataService.vue';
    import AddAccess from '../components/AddAccess.vue';

    export default {
        mixins: [DataService],
        components:{AddAccess},
        data() {
            return {
                accessories: this.data,
            };
        },
        mounted() {
            this.fetchDataAccess()
            .then(response => {
                this.accessories = response.data;
            })
            .catch(error => {
                console.error('Fel vid inhämtning', error)
            });
        },
        methods: {
            updateAccessList(NewAccess) {
                this.accessories.push(NewAccess);
            },
            updateAccess(id, data, amount) {
                let NewAccess = { 
                    "name" : data.name,
                    "description" : data.description,
                    "price" : data.price,
                    "type" : data.type,
                    "amount" : amount
                };
                this.updateDataAccess(id, NewAccess)
                .then(() => {
                    let index = this.accessories.findIndex(item => item.id ===id);
                    this.accessories[index].amount = amount;
                })
                .catch(error => {
                    console.error('Fel', error)
                });
                
            },
            deleteitem(itemId) {
                this.deleteDataAccess(itemId)
                .then(() => {
                    this.accessories = this.accessories.filter(item => item.id !== itemId); 
                })
                .catch(error => {
                    console.error('Fel vid radering av Accessoar:', error);
                });
            },
        
        }
    }
</script>


<style scoped>
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