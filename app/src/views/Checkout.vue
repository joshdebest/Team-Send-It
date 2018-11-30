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
                    <input type="email" class="form-control" id="InputName" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="InputEmail">Email:</label>
                    <input type="email" class="form-control" id="InputEmail" placeholder="test@email.com">
                </div>
                <div class="form-group">
                    <label for="InputAddress">Address:</label>
                    <input type="address" class="form-control" id="InputAddress" placeholder="1234 Example Way">
                </div>
                <div class="form-group">
                    <label for="InputCity">City:</label>
                    <input type="email" class="form-control" id="InputEmail" placeholder="San Jose">
                </div>
                <div class="form-group">
                    <label for="InputState">State:</label>
                    <input type="state" class="form-control" id="InputState" placeholder="CA">
                </div>
                <div class="form-group">
                    <label for="InputZipcode">ZIP code:</label>
                    <input type="zipcode" class="form-control" id="InputZipcode" placeholder="12345">
                </div>
            </form>
        </div>
        <div class = "col-md-6">
        <br>
            <form class="form-container">
                <h1>Review Order</h1>
                <button type="submit" class="btn btn-success btn-block" v-on:click="order">Place Order</button>
            </form>
            <br>
            <form class="form-container">
                <h2>Card Information</h2>
                <div class="form-group">
                    <label for="InputCardNum">Card Number:</label>
                    <input type="cardnum" class="form-control" id="InputCardNum" placeholder="XXXX XXXX XXXX XXXX">
                </div>
                <div class="form-group">
                    <label for="InputSecurity">Security Code:</label>
                    <input type="securitycode" class="form-control" id="InputSecurity" placeholder="XXX">
                </div>
                <div class="form-group">
                    <label for="InputName">Name:</label>
                    <input type="name" class="form-control" id="InputName" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="InputExpiration">Expiration:</label>
                    <input type="Expiration" class="form-control" id="InputExpiration" placeholder="MM/YY">
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Navigation from './Navigation';
import CreateOrderService from '@/services/CreateOrderService';

export default {
    name: 'App',
    methods: {
      order (e) {
        e.preventDefault();
        this.$router.push('/ordercomplete')
      }
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
