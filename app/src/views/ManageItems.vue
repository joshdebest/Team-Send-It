<template>
  <div>
    <EmployeeNav />
    <h2 class="title">Product Management</h2>

    <button class="add-product" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Add Product</button>

    <div id="id01" class="modal">
      <form class="modal-content" @submit="register">
        <div class="container">
          <h1>Add Product</h1>
          <p>Please fill in this form to add a new product.</p>
          <hr>
          <label for="name"><b>Name</b></label>
          <input v-model="name" type="text" placeholder="Enter Name" name="name" required>

          <label for="price"><b>Price</b></label>
          <input v-model="price" type="text" placeholder="Enter Price" name="price" required>

          <label for="qty"><b>Quantity</b></label>
          <input v-model="qty" type="text" placeholder="Enter Quantity" name="qty" required>

          <label for="imglink"><b>Image Link</b></label><br>
          <input v-model="imglink" type="text" placeholder="Enter Image Link" name="imglink" required>

          <label for="description"><b>Description</b></label><br>
          <textarea id="description" class="form-control" placeholder="Enter Descripton" name="description" rows="7" cols="30"
          v-model="description" required></textarea>

          <label for="category"><b>Categories</b></label><br>
          <div class="category-list" v-for="cat in categories">
            <input  id="checkbox" v-model="category" type="checkbox" name="admin"> {{ cat }}
          </div>

          <div class="clearfix">
            <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
            <button type="submit" class="signupbtn">Add Product</button>
          </div>
        </div>
      </form>
    </div>

    <div class='employee-table'>
      <table align="center">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Remove Product</th>
        </tr>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>${{ row.price }}</td>
          <td>{{ row.qty }}</td>
          <td><button class="remove" v-on:click="removeProduct(row.id)">Remove</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import EmployeeNav from './EmployeeNav';
import GetProductsService from '@/services/GetProductsService';
import GetProductService from '@/services/GetProductService';
import CreateProductService from '@/services/CreateProductService';
import RemoveProductService from '@/services/RemoveProductService';

export default {
  name: 'App',
  data () {
    return {
      name: "",
      price: "",
      qty: "",
      imglink: "",
      description: "",
      categories: [],
      categories: ["Bikes", "Accessories", "Clothing", "Tools"],
      rows: [{id: 1, name: "Mountain Bike", price: 1000, qty: 10},
            {id: 2, name: "Helmet", price: 30, qty: 4},
            {id: 3, name: "Tire", price: 15, qty: 1}]
    };
  },
  created: async function(){
    const products = await GetProductsService.GetProducts().then(items => {
      console.log(items.data.products);
      return items.data.products;
    }).catch(error => console.log(error));

    this.rows = new Array();

    // loop through all products and map product info to table
    for (var i = 0; i < products.length; i++) {
      const product = {
        id: products[i]['id'],
        name: products[i]['Name'],
        price: products[i]['Price'],
        qty: products[i]['Qty']
      };

      this.rows[i] = product;
    }
  },
  methods: {
    async register(e) {
      this.admin = document.getElementById('checkbox').checked

      await CreateProductService.CreateProduct({
        Name: this.name,
        Price: this.price,
        Qty: this.qty,
        Description: this.description,
        ImageLink: this.imglink
      }).then(product => {
        console.log(product)
      });

      // clear form data
      var i;
      for (i = 0; (i < document.forms.length); i++) {
        document.forms[i].reset();
      }

      // not working...
      document.getElementById("checkbox").checked = false;

      // close register modal
      var modal = document.getElementById('id01');
      modal.style.display = "none";

      this.$router.push('/manageitems');
    },
    async removeProduct(productId) {
      await RemoveProductService.RemoveProduct(productId).then(response => {
        console.log(response)
      }).catch(error => console.log(error));

      location.reload();
    },
  },
  components: {
    EmployeeNav
  },
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

.add-product {
    float: right;
    margin-right: 100px;
    margin-top: 50px;
}

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

/* Full-width input fields */
input[type=text], input[type=password], input[type=email] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

/* Full-width input fields */
#description {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
    resize: none;
}

/* Add a background color when the inputs get focus */
#description:focus {
    background-color: #ddd;
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
}

input[type=checkbox] {
  margin-bottom: 22px;
}

/* Add a background color when the inputs get focus */
input[type=text]:focus, input[type=password]:focus, input[type=email]:focus {
    background-color: #ddd;
    outline: none;
}

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

/* The Close Button (x) */
.close {
    position: absolute;
    right: 35px;
    top: 15px;
    font-size: 40px;
    font-weight: bold;
    color: #f1f1f1;
}

.close:hover,
.close:focus {
    color: #c1c1c1;
    cursor: pointer;
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

.remove {
    color: red;
    background-color: rgba(0, 0, 0, 0.0);
    padding: 0px 00px;
    margin: 0px 0;
    border: none;
    cursor: pointer;
    width: 20%;
    opacity: 0.9;
}

.remove:focus {
    outline: none;
}

.remove:hover {
    color: #990005;
}
</style>
