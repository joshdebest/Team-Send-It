<template>
  <div>
    <EmployeeNav />
    <h2 class="title">Admin/Employee Management</h2>

    <button class="create-account" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Create Account</button>

    <div id="id01" class="modal">
      <form class="modal-content" @submit="register">
        <div class="container">
          <h1>Create Account</h1>
          <p>Please fill in this form to create an account.</p>
          <hr>
          <label for="name"><b>Name</b></label>
          <input v-model="name" type="text" placeholder="Enter Name" name="name" required>

          <label for="email"><b>Email</b></label>
          <input v-model="email" type="email" placeholder="Enter Email" name="email" required>

          <label for="psw"><b>Password</b></label>
          <input v-model="password" type="password" placeholder="Enter Password" name="psw" required>

          <label for="admin"><b>Admin</b></label><br>
          <input id="checkbox" v-model="admin" type="checkbox" name="admin"> Grant them admin access

          <div class="clearfix">
            <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
            <button type="submit" class="signupbtn">Create Account</button>
          </div>
        </div>
      </form>
    </div>

    <div class='employee-table'>
      <table align="center">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Admin</th>
          <th>Remove Account</th>
        </tr>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.username }}</td>
          <td>{{ row.admin }}</td>
          <td><button class="remove" v-on:click="removeAccount(row.id)">Remove</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import EmployeeNav from './EmployeeNav';
import GetUserService from '@/services/GetUserService';
import GetUsersService from '@/services/GetUsersService';
import CreateUserService from '@/services/CreateUserService';
import RemoveUserService from '@/services/RemoveUserService';

export default {
  name: 'App',
  data () {
    return {
      name: "",
      email: "",
      password: "",
      admin: false,
      rows: [{id: 1, name: "Wesley Khademi", username: "wkhademi", admin: true},
            {id: 2, name: "Kris Fox", username: "kfox", admin: true},
            {id: 3, name: "Test User", username: "test", admin: false}]
    };
  },
  created: async function(){
    const adminUserId = localStorage.getItem("token");
    const user = await GetUserService.GetUser(adminUserId).then(response => {
        console.log(response.data);
        return response.data;
    });

    if (user.Admin === false) {
        alert("Please sign into an admin account to have access to this page.");
        this.$router.push('/employee');
    }

    const adminusers = await GetUsersService.GetUsers().then(users => {
      console.log(users.data.adminusers);
      return users.data.adminusers;
    }).catch(error => console.log(error));

    this.rows = new Array();

    // loop through all users and map user info to table
    for (var i = 0; i < adminusers.length; i++) {
      const user = {
        id: adminusers[i]['id'],
        name: adminusers[i]['Name'],
        username: adminusers[i]['Username'],
        admin: adminusers[i]['Admin']
      };

      this.rows[i] = user;
    }
  },
  methods: {
    async register(e) {
      this.admin = document.getElementById('checkbox').checked

      await CreateUserService.CreateUser({
        Name: this.name,
        Username: this.email,
        Password: this.password,
        Admin: this.admin
      }).then(adminuser => {
        console.log(adminuser)
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

      this.$router.push('/accounts');
    },
    async removeAccount(adminUserId) {
      await RemoveUserService.RemoveUser(adminUserId).then(response => {
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

.create-account {
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
