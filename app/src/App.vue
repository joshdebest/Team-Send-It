<template>
  <div id="app">
    <Slides></Slides>
    <div id="nav">
      <router-link to="/">HOME</router-link>
      <router-link to="/bikes">BIKES</router-link>
      <router-link to="/accessories">ACCESSORIES</router-link>
      <router-link to="/service and repairs">SERVICE AND REPAIRS</router-link>
      <router-link to="/contact">CONTACT</router-link>
      <router-link to="/login">LOGIN</router-link>
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
  color: #2c3e50;
}
#nav {

  font-size:140%;
  padding: 50px;
  text-align: right;
  a {
    padding: 10px;
    text-decoration: none;
    font-weight: normal;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
