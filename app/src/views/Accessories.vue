<template>
<div>
  <Navigation/>
  <div id="bikes" class="bike-container my-5">
    <div class="row mb-3">
      <div class="col-md-9">
    <h1>Accessories</h1>
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
    import GetAccessoriesService from '@/services/GetAccessoriesService';

    export default {
        name: 'bikes',
        created: async function(){
            const products = await GetAccessoriesService.GetAccessories().then(response => {
                console.log(response.data);
                return response.data;
            });

            this.$store.dispatch('addToForSale', products);
            localStorage.setItem('accessories', JSON.stringify(products));
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            this.$store.dispatch('setCart', cart);
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
