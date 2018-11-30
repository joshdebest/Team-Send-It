<template>
<div>
  <Navigation/>
  <div id="bikes" class="bike-container my-5">
    <div class="row mb-3">
      <div class="col-md-9">
    <h1>Bikes</h1>
      </div>
      <div class="col-md-3">
        <ShoppingCart />
      </div>
    </div>

    <div class="row">
      <Item
              v-for="item in forSale"
              :key="item.id"
              :id="item.id"
              :Name="item.Name"
              :ImageLink="item.ImageLink"
              :Price="item.Price"
              :Description="item.Description" />
    </div>

  </div>
</div>
</template>

<script>
    import Navigation from './Navigation';
    import Item from './Item.vue';
    import ShoppingCart from './ShoppingCart.vue';
    import GetBikesService from '@/services/GetBikesService';

    export default {
        name: 'bikes',
        data () {
            return {
                items: [{id: 1, Name: "bike", ImageLink: "https://media.performancebike.com/images/performance/products/product-hi/31-7055-GRY-ANGLE.jpg?resize=1500px:1500px&output-quality=100", Price: 100, Description: "hello"}],
            };
        },
        created: async function(){
            const products = await GetBikesService.GetBikes().then(response => {
                console.log(response.data);
                return response.data;
            });

            this.$store.dispatch('addToForSale', products);
        },
        computed: {
            forSale() { return this.$store.getters.forSale; },
            inCart() { return this.$store.getters.inCart; },
        },
        components: {
            Item,
            ShoppingCart,
            Navigation
        },
    }
</script>

<style lang="scss">
  .card-body{
    color: black;
  }
  .row {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
