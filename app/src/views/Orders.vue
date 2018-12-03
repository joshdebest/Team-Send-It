<template>
<div>
  <EmployeeNav />
  <h2 class="title">Order Management</h2>

  <div id="id01" class="modal">
    <form class="modal-content" @submit.prevent="updateOrder">
      <div class="container">
        <h1>Order #{{ order.id }}</h1>
        <hr>
        <label for="name"><b>Name</b></label>
        <p>{{ order.name }}</p>
        <label for="email"><b>Email</b></label>
        <p>{{ order.email }}</p>
        <label for="billingaddress"><b>Billing Address</b></label>
        <p>{{ order.billingaddress.Street }},<br>{{ order.billingaddress.City }}, {{ order.billingaddress.State }}<br>{{ order.billingaddress.Zipcode }}</p>
        <label for="date"><b>Date Ordered</b></label>
        <p>{{ order.date }}</p>
        <label for="date"><b>Tracking Number</b></label>
        <p>{{ order.trackingNumber }}</p>
        <label for="status"><b>Status</b></label><br>
        <select class="status-option" v-model="order.status">
            <option disabled value="">Please select one</option>
            <option>Pending</option>
            <option>Processed</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Canceled</option>
        </select><br>
        <label for="products"><b>Products Ordered</b></label>
        <table class="table">
          <thead>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
          </thead>
          <tbody>
          <tr class="products-table" v-for="item in order.products">
            <td>{{ item.name }}</td>
            <td>x{{ item.qty }}</td>
            <td>${{ item.price }}</td>
          </tr>
          <tr class="products-table">
            <th></th>
            <th></th>
            <th>${{ order.total }}</th>
          </tr>
          </tbody>
        </table>
        <div class="clearfix">
          <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Close</button>
          <button type="submit" class="signupbtn">Update Status</button>
        </div>
      </div>
    </form>
  </div>

  <div class='employee-table'>
    <table align="center">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Bill To</th>
        <th>Total</th>
        <th>Date Purchased</th>
        <th>Status</th>
      </tr>
      <tr v-for="row in rows" :key="row.id" v-on:click="getOrder(row.id)">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.billTo.street }},<br>{{ row.billTo.city }}, {{ row.billTo.state }}<br>{{ row.billTo.zipcode }}</td>
        <td>${{ row.total }}</td>
        <td>{{ row.date }}</td>
        <td>{{ row.status }}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import EmployeeNav from './EmployeeNav';
import GetOrderService from '@/services/GetOrderService';
import GetOrdersService from '@/services/GetOrdersService';
import UpdateOrderService from '@/services/UpdateOrderService';
import GetBillingAddressService from '@/services/GetBillingAddressService';
import GetProductService from '@/services/GetProductService';
import UpdateProductService from '@/services/UpdateProductService';

export default {
  name: 'App',
  data () {
    return {
      order: {id: 1, name: "John", email: "john@gmail.com", date: "11/28/18", status: "delivered", total: 299.99,
            products: [{name: "wheel", qty: 3, price: 10.99}, {name: "bike", qty: 1, price: 179.99}, {name: "helmet", qty: 5, price: 30.99}],
            billingaddress: {Street: "123 test ave", City: "san luis obispo", State: "ca", Zipcode: "93401"}, trackingNumber: 'a3dfec'},
      rows: [{id: 1, name: "John", billTo: {street: "123 test ave", city: "san luis obispo", state: "ca", zipcode: "93401"}, total: 299.99, date: "yesterday", status: "delivered"}],
      currentStatus: "",
    };
  },
  created: async function() {
      // get orders to be displayed in table
      const orders = await GetOrdersService.GetOrders().then((response) => {
        console.log(response.data.orders);
        return response.data.orders;
      });

      this.rows = [];
      // get each orders associated billing address
      for (var i = 0; i < orders.length; i++) {
        const billingaddress = await GetBillingAddressService.GetBillingAddress(orders[i].id).then((response) => {
          return response.data;
        })

        const order = {
          id: orders[i].id,
          name: orders[i].CustomerName,
          billTo: {
            street: billingaddress.Street,
            city: billingaddress.City,
            state: billingaddress.State,
            zipcode: billingaddress.Zipcode
          },
          total: orders[i].Total,
          date: orders[i].DateOrdered.substring(0, 10),
          status: orders[i].Status
        }

        this.rows.push(order);
      }
  },
  methods: {
    async getOrder(orderId) {
      document.getElementById('id01').style.display='block';

      const ord = await GetOrderService.GetOrder(orderId).then((response) => {
        console.log(response.data);
        return response.data;
      });

      const products = [];
      for (var i = 0; i < ord.productorders.length; i++) {
        const prod = await GetProductService.GetProduct(ord.productorders[i].ProductId).then((response) => {
            return response.data.product;
        })

        const product = {
            id: prod.id,
            name: prod.Name,
            qty: ord.productorders[i].Qty,
            price: prod.Price
        }
        products.push(product);
      }

      this.order.id = ord.order.id;
      this.order.name = ord.order.CustomerName;
      this.order.email = ord.order.Email;
      this.order.date = ord.order.DateOrdered.substring(0,10);
      this.order.trackingNumber = ord.order.TrackingNumber;
      this.order.status = ord.order.Status;
      this.order.total = ord.order.Total;
      this.order.products = products;
      this.order.billingaddress = ord.billingaddress;
      this.currentStatus = ord.order.Status;
    },
    async updateOrder() {
        const id = this.order.id;
        const status = this.order.status;

        if (this.currentStatus === "Canceled") {
            alert("Can't update order status since it has been canceled.");
        }
        else {
            await UpdateOrderService.UpdateOrderStatus(id, { Status: status }).then((response) => {
                console.log(response.data);

                // if order is canceled add products back to stock
                if (response.data.Status === "Canceled") {
                    for (var i = 0; i < this.order.products.length; i++) {
                        const prodId = this.order.products[i].id;
                        const Quantity = {
                            Quantity: this.order.products[i].qty
                        }

                        UpdateProductService.UpdateProductQty(prodId, Quantity).then((response) => {
                            console.log(response.data);
                        });
                    }
                }
            });

            document.getElementById('id01').style.display='none';
            location.reload();
        }
    },
  },
  components: {
    EmployeeNav
  }
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<style>
.title {
    margin-left: 50px;
    margin-top: 60px;
    float: left;
    color: black;
    font-family: 'Opens Sans', sans-serif;
    padding-bottom: 20px;
}

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

/* Set a style for all buttons */
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
}

button:hover {
    opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
    padding: 16px;
    color: #5b5b5b;
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(255, 255, 255, 0.0);
    padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 40%; /* Could be more or less, depending on screen size */
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

/* Style the horizontal ruler */
hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}

/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
    .cancelbtn, .signupbtn {
       width: 100%;
    }
}

table {
    clear: both;
    font-family: 'Open Sans', sans-serif;
    color: black;
    border-collapse: collapse;
    border-spacing: 0;
    width: 95%;
    border: 1px solid #ddd;
    margin-bottom: 50px;
}

th, td {
    text-align: left;
    padding: 16px;
}

td {
    font-weight: lighter;
}

tr:nth-child(even) {
    background-color: #f2f2f2
}
.products-table > * {
    background-color: white
}
.status-option {
    margin-bottom: 15px;
}
</style>
