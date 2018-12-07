<template>
<div>
    <Navigation />
      <div class="container hero">
      <div class="Hero-container Hero--textCenter Container ">
          <div class="Hero-copy Typography">
              <h0>Checkout</h0>
          </div>
      </div>
    </div>
    <div class = "row">
        <div class = "col-md-6">
        <br>
            <form class="form-container">
                <h2>Billing Information</h2>
                <div class="form-group">
                    <label for="InputName">Name:</label>
                    <input v-model="name" type="text" class="form-control" id="InputName" placeholder="Name" required>
                </div>
                <div class="form-group">
                    <label for="InputEmail">Email:</label>
                    <input v-model="email" type="email" class="form-control" id="InputEmail" placeholder="test@email.com" required>
                </div>
                <div class="form-group">
                    <label for="InputAddress">Address:</label>
                    <input v-model="street" type="text" class="form-control" id="InputAddress" placeholder="1234 Example Way" required>
                </div>
                <div class="form-group">
                    <label for="InputCity">City:</label>
                    <input v-model="city" type="text" class="form-control" id="InputEmail" placeholder="San Jose" required>
                </div>
                <div class="form-group">
                    <label for="InputState">State:</label>
                    <input v-model="state" type="text" class="form-control" id="InputState" placeholder="CA" required>
                </div>
                <div class="form-group">
                    <label for="InputZipcode">ZIP code:</label>
                    <input v-model="zipcode" type="text" class="form-control" id="InputZipcode" placeholder="12345" required>
                </div>
            </form>
        </div>
        <div class = "col-md-6">
        <br>
            <form class="form-container">
                <h1>Review Order</h1>
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
                <button type="submit" class="btn btn-success btn-block" v-on:click="order">Place Order</button>
            </form>
            <br>
            <form class="form-container">
                <h2>Card Information</h2>
                <div class="form-group">
                    <label for="InputCardNum">Card Number:</label>
                    <input type="text" class="form-control" id="InputCardNum" placeholder="XXXX XXXX XXXX XXXX" required>
                </div>
                <div class="form-group">
                    <label for="InputSecurity">Security Code:</label>
                    <input type="text" class="form-control" id="InputSecurity" placeholder="XXX" requied>
                </div>
                <div class="form-group">
                    <label for="InputName">Name:</label>
                    <input type="text" class="form-control" id="InputName" placeholder="Name" required>
                </div>
                <div class="form-group">
                    <label for="InputExpiration">Expiration:</label>
                    <input type="text" class="form-control" id="InputExpiration" placeholder="MM/YY" required>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Navigation from './Navigation';
import CreateOrderService from '@/services/CreateOrderService';
import GetProductService from '@/services/GetProductService';

export default {
    name: 'App',
    data() {
        return {
            name: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            cart: [],
        }
    },
    created: function() {
        const cartIds = JSON.parse(localStorage.getItem("cart"));
        this.$store.dispatch('setCart', cartIds);
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

        // get all the cart items
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

        this.cart = cart;
    },
    computed: {
        total() {
            return this.cart.reduce((acc, cur) => Math.round((acc + cur.Qty*cur.Price)*100) / 100, 0);
        }
    },
    methods: {
      async order (e) {
        e.preventDefault();
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

        // check to make sure there are items to be checked out
        if (this.cart.length === 0) {
            error = true;
            alert("Please add items to your cart before checking out.")
        }

        if (error === false) {
            const order = {
                CustomerName: this.name,
                Email: this.email,
                DateOrdered: new Date(),
                TrackingNumber: Math.random().toString(36).substring(7),
                OrderNumber: Math.random().toString(36).substring(7),
                Status: "Pending",
                Total: this.total,
                Address: { street: this.street, city: this.city, state: this.state, zipcode: this.zipcode },
                Products: this.cart
            };

            console.log(this.cart)

            const placedOrder = await CreateOrderService.CreateOrder(order).then((response) => {
                console.log(response.data);
                return response.data;
            });

            localStorage.removeItem("cart");
            this.$router.push('/ordercomplete');
        }
      },
      removeFromCart(index) {
          this.$store.dispatch('removeFromCart', index);
          const cart = this.$store.getters.inCart;
          localStorage.setItem("cart", JSON.stringify(cart));
      },
    },
    components: {
      Navigation
    }
}
</script>

<style lang="scss">
.hero{background: url('http://www.achieve3000.com/wp-content/uploads/2015/02/contact-us-hero.jpg') no-repeat;
  max-width: 100%;
  max-height: 100vh;
  background-size: 1300px 900px;
  overflow: hidden;
  padding: 70px;
  *{color: white;}
}

h0 {
  font-size: 100px;
}

.Hero-copy {
 text-align: center;
  font-family: Avenir Next;
}
  .row{
    color: black;
  }
  @media (min-width: 1200px) {
    .form-container{
        padding: 20px 60px;
        box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.50);
        text-align: left;
    }
    .form-control{
        text-align: left;
    }
}
</style>
