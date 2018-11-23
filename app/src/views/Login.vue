<template>
  <div class="container-fluid bg">
    <div class="row">
      <div class="col-med-4 col-sm-4 col-xs-12"></div>
      <div class="col-med-4 col-sm-4 col-xs-12">
        <form class="form-container" @submit="login">
          <h1>LOGIN</h1>
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-success btn-block">Login</button>
        </form>
      </div>
      <div class="col-med-4 col-sm-4 col-xs-12"></div>
    </div>
  </div>
</template>

<script>
import LoginService from '@/services/LoginService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: false,
    };
  },
  methods: {
    async login (e) {
      e.preventDefault()
      this.error = ''

      if (this.email === '' && this.password === '') {
        this.error = 'Please enter your email and password'
        return
      }

      if (this.email === '') {
        this.error = 'Please enter your email'
        return
      }

      if (this.password === '') {
        this.error = 'Please enter your password'
        return
      }

      // query AdminUsers table by username and password
      await LoginService.Login({
          Username: this.email,
          Password: this.password
      }).then((res) => {
        console.log(res)
        if (res.data.AdminUserId) {  // user logged in
          this.$store.commit('login', res.data.AdminUserId)
          this.$router.push('/')  // redirect to admin/employee page
        }
        else {  // incorrect username or password
          this.error = res.data.error
        }
      },
      (error) => {
        console.log(error)
      });

      this.email = ''
      this.password = ''
    },
  },
};
</script>

<style lang="scss">

.bg{background: url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Amazing-Bicycle-Background.jpg') no-repeat; width: 100%; height: 100vh; background-size: 1300px 900px;}
@media (min-width: 1200px) {
    .form-container{
       *{color: #ffff;}
        padding: 50px 60px; margin-top: 20vh;
        -webkit-box-shadow: 0px 0px 26px 11px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 26px 11px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 26px 11px rgba(0,0,0,0.75);
    }
}
</style>
