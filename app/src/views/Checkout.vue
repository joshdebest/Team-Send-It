<template>
    <div class = "row">
        <div class = "col-md-6">
        <br>
            <h1>Checkout</h1>
            <form class="form-container">
                <h2>Billing Information</h2>
                <div class="form-group">
                    <label for="InputName1">Name</label>
                    <input type="email" class="form-control" id="InputName1" aria-describedby="emailHelp" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="InputEmail1">Email</label>
                    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="InputAddress1">Address</label>
                    <input type="address" class="form-control" id="InputAddress1" placeholder="Enter address">
                </div>
                <div class="form-group">
                    <label for="InputCityState">City, State</label>
                    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter City, State">
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
                    <label for="InputCardNum1">Card Number</label>
                    <input type="cardnum" class="form-control" id="InputCardNum1" aria-describedby="emailHelp" placeholder="Enter Card Number">
                </div>
                <div class="form-group">
                    <label for="InputCardNum1">Security Code</label>
                    <input type="cardnum" class="form-control" id="InputCardNum1" aria-describedby="emailHelp" placeholder="Enter Security Code">
                </div>
                <div class="form-group">
                    <label for="InputName1">Name</label>
                    <input type="email" class="form-control" id="InputName1" aria-describedby="emailHelp" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="InputExpiration1">MM/YY</label>
                    <input type="Expiration" class="form-control" id="InputExpiration1" aria-describedby="emailHelp" placeholder="Enter MM/YY">
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
        box-shadow: 0px 0px 13px 8px rgba(0,0,0,0.50);
        text-align: left;
    }
    .form-control{
        text-align: left;
    }
}
</style>
