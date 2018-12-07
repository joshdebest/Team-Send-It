<template>
  <div>
    <button class="btn btn-primary" data-toggle="modal" data-target="#shoppingCart">Cart ({{ numInCart }})</button>

    <div id="shoppingCart" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Shopping cart</h5>
            <button class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in cart">
                <td>{{ item.Name }}</td>
                <td>x{{ item.Qty }}</td>
                <td>${{ item.Price }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
                </td>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>${{ total }}</th>
                <th></th>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
            <button class="btn btn-primary" data-dismiss="modal" v-on:click="goToCheckout">Check out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import GetProductService from '@/services/GetProductService';

    export default {
        name: 'shoppingCart',
        computed: {
            inCart() { return this.$store.getters.inCart; },
            numInCart() { return this.inCart.length; },
            cart() {
                const bikes = JSON.parse(localStorage.getItem('bikes'));
                const accessories = JSON.parse(localStorage.getItem('accessories'));

                var products = [];
                for (var i = 0; i < bikes.length; i++) {
                    products.push(bikes[i]);
                }

                for(var j = 0; j < accessories.length; j++) {
                    products.push(accessories[j]);
                }

                this.$store.dispatch('createProducts', products);

                // get all the items in cart
                const items = this.$store.getters.inCart.map((cartItem) => {
                    return this.$store.getters.allProducts.find((forSaleItem) => {
                        return cartItem === forSaleItem.id;
                    });
                });

                // get quantity for selected item
                const cart = Array();
                for (var i = 0; i < items.length; i++) {
                    const exists = false;
                    for (var j = 0; j < cart.length; j++) {
                        if (items[i].id === cart[j].id) {
                            cart[j].Qty = cart[j].Qty + 1;
                            exists = true;
                            break;
                        }
                    }

                    if (exists === false) {
                        const product = {
                            id: items[i].id,
                            Name: items[i].Name,
                            Price: items[i].Price,
                            Qty: 1
                        }
                        cart.push(product);
                    }
                }

                return cart;
            },
            total() {
                return this.cart.reduce((acc, cur) => Math.round((acc + cur.Qty*cur.Price)*100) / 100, 0);
            },
        },
        filters: {
            dollars: num => `${num}`,
        },
        methods: {
            async goToCheckout() {
                var error = false;

                // check to make sure quantities don't exceed stock
                for (var i = 0; i < this.cart.length; i++) {
                    const product = await GetProductService.GetProduct(this.cart[i].id).then((response) => {
                        return response.data.product;
                    });

                    if (this.cart[i].Qty > product.Qty) {
                        error = true;
                        const difference = this.cart[i].Qty - product.Qty;
                        alert("Out of Stock! Reduce " + this.cart[i].Name + " by " + difference + " before moving to checkout.");
                    }
                }

                if (error === false) {
                    this.$router.push('/checkout');
                }
            },
            removeFromCart(index) {
                this.$store.dispatch('removeFromCart', index);
                const cart = this.$store.getters.inCart;
                localStorage.setItem("cart", JSON.stringify(cart));
            },
        },
    };
</script>
