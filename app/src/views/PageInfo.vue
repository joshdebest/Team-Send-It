<template>
<div>
  <EmployeeNav />
  <h2 class="title">Announcements Management</h2>

  <button class="create-announcement" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Create Announcement</button>

  <div id="id01" class="modal">
    <form class="modal-content" @submit="create">
      <div class="container">
        <h1>Create Announcement</h1>
        <p>Please fill in this form to create an announcement.</p>
        <hr>
        <label for="title"><b>Title</b></label>
        <input v-model="title" type="text" placeholder="Enter Title" name="title" required>

        <label for="message"><b>Message</b></label><br>
        <textarea id="message" class="form-control" placeholder="Enter Message" name="message" rows="7" cols="30"
        v-model="message" required></textarea>

        <div class="clearfix">
          <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Create Announcement</button>
        </div>
      </div>
    </form>
  </div>

  <div class='announcement-table'>
    <table align="center">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Announcement</th>
        <th>Remove Announcement</th>
      </tr>
      <tr v-for="row in rows" :key="row.id" v-on:click="getAnnouncement(row.id)">
        <td>{{ row.id }}</td>
        <td>{{ row.title }}</td>
        <td>{{ row.message }}</td>
        <td><button class="remove" v-on:click="removeAnnouncement(row.id)">Remove</button></td>
      </tr>
    </table>
  </div>

  <div id="id02" class="modal">
    <form class="modal-content" @submit="updateAnnouncement">
      <div class="container">
        <h1>Update Announcement</h1>
        <p>Please fill in this form to update an announcement.</p>
        <hr>
        <label for="title"><b>Title</b></label>
        <input type="text" placeholder="Enter Title" name="title" v-model="updateTitle" required>

        <label for="message"><b>Message</b></label><br>
        <textarea id="message" class="form-control" placeholder="Enter Message" name="message" rows="7" cols="30" v-model="updateMessage" required></textarea>

        <div class="clearfix">
          <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Update Announcement</button>
        </div>
      </div>
    </form>
  </div>

  <h2 class="title">Categories Management</h2>

  <button class="create-announcement" onclick="document.getElementById('id03').style.display='block'" style="width:auto;">Create Category</button>

  <div id="id03" class="modal">
    <form class="modal-content" @submit="createCategory">
      <div class="container">
        <h1>Create Category</h1>
        <p>Please fill in this form to create a category.</p>
        <hr>
        <label for="title"><b>Category</b></label>
        <input v-model="category" type="text" placeholder="Enter Category" name="category" required>

        <div class="clearfix">
          <button type="button" onclick="document.getElementById('id03').style.display='none'" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Create Category</button>
        </div>
      </div>
    </form>
  </div>

  <div class='announcement-table'>
    <table align="center">
      <tr>
        <th>Id</th>
        <th>Category</th>
        <th>Remove Category</th>
      </tr>
      <tr v-for="catrow in catrows" :key="catrow.id">
        <td>{{ catrow.id }}</td>
        <td>{{ catrow.category }}</td>
        <td><button class="remove" v-on:click="removeCategory(catrow.id)">Remove</button></td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import EmployeeNav from './EmployeeNav';
import GetAnnouncementsService from '@/services/GetAnnouncementsService';
import GetAnnouncementService from '@/services/GetAnnouncementService';
import CreateAnnouncementService from '@/services/CreateAnnouncementService';
import RemoveAnnouncementService from '@/services/RemoveAnnouncementService';
import UpdateAnnouncementService from '@/services/UpdateAnnouncementService';
import GetCategoriesService from '@/services/GetCategoriesService';
import CreateCategoryService from '@/services/CreateCategoryService';
import RemoveCategoryService from '@/services/RemoveCategoryService';

export default {
  data () {
    return {
      title: "",
      message: "",
      updateId: "",
      updateTitle: "",
      updateMessage: "",
      category: "",
      rows: [{id: 1, title: "This is a test", message: "This is a test"},
             {id: 2, title: "This should work", message: "Hello this should work"}],
      catrows: [{id: 1, category: "Bikes"},
                {id: 2, category: "Accessories"}]
    }
  },
  created: async function() {
      const annmnts = await GetAnnouncementsService.GetAnnouncements().then(annmnts => {
        console.log(annmnts.data.announcements);
        return annmnts.data.announcements;
      }).catch(error => console.log(error));

      this.rows = new Array();

      // loop through all announcements and map announcement info to table
      for (var i = 0; i < annmnts.length; i++) {
        const announcement = {
          id: annmnts[i]['id'],
          title: annmnts[i]['Title'],
          message: annmnts[i]['Message'],
        };

        this.rows[i] = announcement;
      }

      const cats = await GetCategoriesService.GetCategories().then(cats => {
        console.log(cats.data.categories);
        return cats.data.categories
      }).catch(error => console.log(error));

      this.catrows = new Array();

      // loop through all announcements and map announcement info to table
      for (var i = 0; i < cats.length; i++) {
        const category = {
          id: cats[i]['id'],
          category: cats[i]['Name'],
        };

        this.catrows[i] = category;
      }
  },
  methods: {
    async create() {
      await CreateAnnouncementService.CreateAnnouncement({
          Title: this.title,
          Message: this.message,
        }).then(announcement => {
          console.log(announcement)
        });

        // clear form data
        var i;
        for (i = 0; (i < document.forms.length); i++) {
          document.forms[i].reset();
        }
        // close register modal
        var modal = document.getElementById('id01');
        modal.style.display = "none";

        this.$router.push('/pageinfo');
    },
    async removeAnnouncement(announcementId) {
      await RemoveAnnouncementService.RemoveAnnouncement(announcementId).then(response => {
        console.log(response)
      }).catch(error => console.log(error));

      location.reload();
    },
    async getAnnouncement(announcementId) {
      document.getElementById('id02').style.display='block';

      // get the announcement that was clicked on in table
      const currentAnnouncement = await GetAnnouncementService.GetAnnouncement(announcementId).then(announcement => {
        console.log(announcement.id)
        this.updateId = announcement.data.id,
        this.updateTitle = announcement.data.Title;
        this.updateMessage = announcement.data.Message;
      }).catch(error => console.log(error));
    },
    async updateAnnouncement(announcementId) {
      //update the announcement that was clicked on in table
      await UpdateAnnouncementService.UpdateAnnouncement(this.updateId, {
        Title: this.updateTitle,
        Message: this.updateMessage
      }).then(updatedAnnouncement => {
        console.log(updatedAnnouncement)
      }).catch(error => console.log(error));
    },
    async removeCategory(categoryId) {
      await RemoveCategoryService.RemoveCategory(categoryId).then(response => {
        console.log(response)
      }).catch(error => console.log(error));

      location.reload();
    },
    async createCategory() {
      await CreateCategoryService.CreateCategory({
        Name: this.category,
      }).then(category => {
        console.log(category)
      });

      // clear form data
      var i;
      for (i = 0; (i < document.forms.length); i++) {
        document.forms[i].reset();
      }

      // close register modal
      var modal = document.getElementById('id03');
      modal.style.display = "none";

      this.$router.push('/pageinfo');
    },
  },
  components: {
    EmployeeNav
  },
}

// Get the modal
var modal1 = document.getElementById('id01');
var modal2 = document.getElementById('id03');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
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

.create-announcement {
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

/* Full-width input fields */
#message {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
    resize: none;
}

/* Add a background color when the inputs get focus */
#message:focus {
    background-color: #ddd;
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
}
</style>
