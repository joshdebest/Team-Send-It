import Item from './Item.vue';
<template>
  <div id="app" class="container my-5">
    <h1>Accesories</h1>

    <div class="row">
      <div class="col-md-3" v-for="item in forSale">
        <div class="card">
          <img :src="item.image" :alt="item.name" class="card-img-top">
          <div class="card-body">
            <h4 class="card-title">{{ item.name }}</h4>
            <div class="card-text">${{ item.price / 100 }}</div>
            <div class="row justify-content-end">
              <button class="btn btn-primary">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                forSale: [
                    {invId: 1, name: 'Bike Lights', image: 'https://www.bogproducts.com/sports/wp-content/uploads/2016/03/mini-usb-lights.png', price: 1999},
                    {invId: 2, name: 'Basket', image: '//placehold.it/200', price: 1499},
                    {invId: 3, name: 'Helmet', image: '//placehold.it/200', price: 499},
                    {invId: 4, name: 'Bike Tire', image: '//placehold.it/200', price: 1499},
										{invId: 5, name: 'Tire Tube', image: '//placehold.it/200', price: 999},
										{invId: 6, name: 'Other thing', image: '//placehold.it/200', price: 299},
                ],
            };
        },
        // components: {
        //     Item,
        // },
    }
</script>
