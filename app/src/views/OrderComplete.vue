<template>
<div>
  <Navigation />
  <div class="ordercomplete-section">
    <h1>Order Successfully Placed!<br>Thanks for choosing Foxcycle!</h1>
    <button v-on:click="redirect" class="btn btn-success">Return to Home Page</button>
  </div>
</div>
</template>

<script>
import Navigation from './Navigation';

export default {
  methods: {
    redirect () {
      this.$router.push('./');
    }
  },
  components: {
    Navigation
  }
}
</script>

<style>
.ordercomplete-section {
  text-align: center;
  margin-top: 150px;
}
button {
  width: 20%;
}
</style>
