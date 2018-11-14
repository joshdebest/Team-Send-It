
<template>
  <div id="app">
    <Slides></Slides>
    <div id="nav">
      <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="/">
          <img src="https://d3ciwvs59ifrt8.cloudfront.net/104351d8-d394-4a78-8966-d02d8dcb8a94/ae6d7eda-04b2-4c74-851a-e7a3ac7798bf_m.png" class="d-inline-block align-top" style="width:55px;height:55px;">
        </b-navbar-brand>
           Foxycle
        <b-collapse is-nav id="nav_collapse">


          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-navbar-nav>
              <b-nav-item href="/bikes">BIKES</b-nav-item>
              <b-nav-item href="/accessories">ACCESSORIES</b-nav-item>
              <b-nav-item href="/services">SERVICE AND REPAIRS</b-nav-item>
              <b-nav-item href="/contact">CONTACT</b-nav-item>
              <b-nav-item href="/login">LOGIN</b-nav-item>
              <b-nav-item href="/checkout"><img src="https://www.drones4.life/wp-content/uploads/2016/12/shopping-cart-logo-icon-70706.png" style= "width:30px; height:30px"></b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

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
</style>
