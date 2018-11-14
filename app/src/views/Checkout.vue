<template>
    <div class = "row">
        <div class = "col-md-6">
        <br>
            <h1>Checkout</h1><br>
            <form class="form-container">
                <h2>Billing Information</h2>
                <div class="form-group">
                    <label for="InputName">Name</label>
                    <input type="email" class="form-control" id="InputName">
                </div>
                <div class="form-group">
                    <label for="InputEmail">Email</label>
                    <input type="email" class="form-control" id="InputEmail">
                </div>
                <div class="form-group">
                    <label for="InputAddress">Address</label>
                    <input type="address" class="form-control" id="InputAddress">
                </div>
                <div class="form-group">
                    <label for="InputCity">City</label>
                    <input type="email" class="form-control" id="InputEmail">
                </div>
                <div class="form-group">
                    <label for="InputState">State</label>
                    <input type="state" class="form-control" id="InputState">
                </div>
                <div class="form-group">
                    <label for="InputZipcode">ZIP code</label>
                    <input type="zipcode" class="form-control" id="InputZipcode">
                </div>
            </form>  
        </div>
        <div class = "col-md-6">
        <br>
            <form class="form-container">
                <h1>Review Order</h1> 
                <button type="submit" class="btn btn-success btn-block">Place Order</button>
            </form>
            <br>  
            <form class="form-container">
                <h2>Card Information</h2>
                <div class="form-group">
                    <label for="InputCardNum">Card Number</label>
                    <input type="cardnum" class="form-control" id="InputCardNum">
                </div>
                <div class="form-group">
                    <label for="InputSecurity">Security Code</label>
                    <input type="securitycode" class="form-control" id="InputSecurity">
                </div>
                <div class="form-group">
                    <label for="InputName">Name</label>
                    <input type="name" class="form-control" id="InputName">
                </div>
                <div class="form-group">
                    <label for="InputExpiration">Expiration</label>
                    <input type="Expiration" class="form-control" id="InputExpiration" placeholder="Enter MM/YY">
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
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
