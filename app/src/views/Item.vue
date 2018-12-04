<template>
  <div class="col-md-4">
    <div class="card">
      <img :src="ImageLink" :alt="Name" class="card-img-top">
      <div class="card-body">
        <h4 class="card-title">{{ Name }}</h4>
        <div class="card-text">${{ Price | dollars }}</div>
        <div class="card-text descript-text"><b>Description:</b><br>{{ Description }}</div>
        <div class="row justify-content-end">
          <button class="btn btn-primary add-cart" @click="addToCart(id)">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'item',
        props: ['id', 'Name', 'ImageLink', 'Price', 'Description'],
        methods: {
            addToCart(id) {
                this.$store.dispatch('addToCart', id);
                const cart = this.$store.getters.inCart;
                localStorage.setItem("cart", JSON.stringify(cart));
            },
        },
        filters: {
            dollars: num => `${num}`,
        },
    }
</script>

<style>
.descript-text {
    padding-top: 5px;
    padding-bottom: 10px;
}
.card {
    height: 750px;
    margin-bottom: 30px;
}
.add-cart {
    position: absolute;
    bottom: 20px;
}
</style>
