<template>
  <div id="bikes" class="container my-5">
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
              :key="item.invId"
              :invId="item.invId"
              :name="item.name"
              :image="item.image"
              :price="item.price" />
    </div>

  </div>
</template>

<script>
    import Item from './Item.vue';
    import ShoppingCart from './ShoppingCart.vue';
    export default {
        name: 'bikes',
        computed: {
            forSale() { return this.$store.getters.forSale; },
            inCart() { return this.$store.getters.inCart; },
        },
        components: {
            Item,
            ShoppingCart,
        },
    }
</script>
