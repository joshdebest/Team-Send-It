<template>
<div>
  <EmployeeNav />
  <div class="updateForm">
    <form class="modal-content">
      <div class="container">
        <h1>Update Account</h1>
        <hr>
        <label for="name"><b>Name</b></label>
        <input v-model="name" type="text" placeholder="Enter Name" required>

        <label for="email"><b>Email</b></label>
        <input v-model="email" type="email" placeholder="Enter Email" required>

        <label for="psw"><b>Password</b></label>
        <input v-model="password" type="password" placeholder="Enter Password" required>

        <div class="clearfix">
          <button type="submit" class="signupbtn" v-on:click="updateUserInfo">Update Account</button>
        </div>
      </div>
    </form>
  </div>
  <div class="account">
    <h2 class="title">Account Info</h2>
    <hr class="break">
    <label class="info"><b>Name: </b>{{ currentName }}</label><br>
    <label class="info"><b>Email: </b>{{ currentEmail }}</label><br>
    <label class="info"><b>Password: </b>{{ currentPassword }}</label>
  </div>
</div>
</template>

<script>
import EmployeeNav from './EmployeeNav';
import GetUserService from '@/services/GetUserService';
import UpdateUserService from '@/services/UpdateUserService';

export default {
  name: 'App',
  data () {
    return {
      name: "Test User",
      email: "testuser@gmail.com",
      password: "test",
      admin: false
    }
  },
  created: function() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const adminuserId = localStorage.getItem("token");

      const adminuser = await GetUserService.GetUser(adminuserId).then(user => {
        this.currentName = user.data.Name;
        this.currentEmail = user.data.Username;
        this.currentPassword = user.data.Password;
        this.name = user.data.Name;
        this.email = user.data.Username;
        this.password = user.data.Password;
        this.admin = user.data.Admin;
      }).catch(error => console.log(error));
    },
    updateUserInfo () {
      const adminuserId = localStorage.getItem("token");

      const adminuser = {
        Name: this.name,
        Username: this.email,
        Password: this.password,
        Admin: this.admin
      }
      console.log("hello")
      UpdateUserService.UpdateUser(adminuserId, adminuser).then(updatedUser => {
        console.log(updatedUser);
      });
    }
  },
  components: {
    EmployeeNav
  }
}
</script>

<style>
.account {
    width: 600px;
    float: right;
    margin-top: 75px;
}
.title {
    width: 100%;
    margin-right: 550px;
    font-size: 32px;
}
.updateForm {
    margin-top: 60px;
    float: left;
    width: 550px;
}
.updateForm h1 {
    font-size: 32px;
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
    width: 40%;
    opacity: 0.9;
}

button:hover {
    opacity:1;
}

/* Add padding to container elements */
.container {
    padding: 16px;
    color: #5b5b5b;
}

/* The Modal (background) */
.updateForm {
    left: 0;
    top: 0;
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(255, 255, 255, 0.0);
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin-bottom: 5%;
    margin-left: 50px;
    border: 1px solid #888;
    width: 90%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}

.break {
    width: 50%;
    margin-right: 400px;
}
.info {

}
</style>
