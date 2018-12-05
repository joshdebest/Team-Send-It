<template>
    <div id="app">
      <div id="nav">
        <b-navbar toggleable="md" type="dark" variant="dark">

          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-navbar-brand>
            <img src="https://d3ciwvs59ifrt8.cloudfront.net/104351d8-d394-4a78-8966-d02d8dcb8a94/ae6d7eda-04b2-4c74-851a-e7a3ac7798bf_m.png" class="d-inline-block align-top" style="width:55px;height:55px;">
          </b-navbar-brand>
            Foxycle
          <b-collapse is-nav id="nav_collapse">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-navbar-nav>
                <b-nav-item-dropdown class="dropdown" text="Menu" variant="link" right>
                    <img src="https://img.icons8.com/material/50/000000/person-male.png" style= "width:30px; height:30px">
                    <h2 v-model="user">{{ user }}</h2>
                    <b-dropdown-item href="/orders">View Orders</b-dropdown-item>
                    <b-dropdown-item href="/manageitems">Manage Items</b-dropdown-item>
                    <b-dropdown-item href="/pageinfo">Page Info</b-dropdown-item>
                    <b-dropdown-item href="/accounts">View Employees</b-dropdown-item>
                    <b-dropdown-item href="/accountinfo">Account Info</b-dropdown-item>
                    <b-dropdown-item v-on:click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
  </div>
</template>


<script>
import GetUserService from '@/services/GetUserService';
import LogoutService from '@/services/LogoutService';

export default {
    data () {
      return {
        user: "test"
      }
    },
    created: function(){
      this.fetchUser()
    },
    methods: {
      async logout () {
        const adminUserId = localStorage.getItem("token");

        await LogoutService.Logout(adminUserId).then(response => {
            console.log(response)
        });

        this.$store.commit('logout');
        localStorage.removeItem("token");
        this.$router.push('/');
      },
      async fetchUser () {
        const adminUserId = localStorage.getItem("token");

        if (!adminUserId) {
            alert("You are not authorized to enter this part of the site.")
            this.$router.push('/');
        }

        await GetUserService.GetUser(adminUserId).then(response => {
          this.user = response.data.Username
        }).catch(error => console.log(error));
      },
    }
}
</script>


<style lang="scss">
    #app {
      font-weight: bold;
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #ffffff;
    }
    #nav {
      font-size:130%;
      text-align: right;
      a {
        padding: 10px;
        text-decoration: none;
        font-weight: normal;
      }
    }
    .dropdown img {
        float: left;
    }
    .dropdown h2 {
      float: left;
      font-family: 'Open Sans', sans-serif;
      font-size: 10px;
      margin-left: 5px;
      margin-top: 10px;
    }
</style>
