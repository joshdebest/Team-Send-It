<template>
  <div class="container-fluid bg">
    <div class="row">
      <div class="col-med-4 col-sm-4 col-xs-12"></div>
      <div class="col-med-4 col-sm-4 col-xs-12">
        <form class="form-container">
          <h1>LOGIN</h1>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Remember Me</label>
          </div>
          <button type="submit" class="btn btn-success btn-block">Submit</button>
        </form>
      </div>
      <div class="col-med-4 col-sm-4 col-xs-12"></div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                data: {
                    body: {
                        username: null,
                        password: null
                    },
                    rememberMe: false
                },
                error: null
            }
        },
        mounted () {
            if (this.$auth.redirect()) {
                console.log('Redirect from: ' + this.$auth.redirect().from.name)
            }
            // Can set query parameter here for auth redirect or just do it silently in login redirect.
        },
        methods: {
            login () {
                var redirect = this.$auth.redirect()
                this.$auth.login({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.data.body,
                    rememberMe: this.data.rememberMe,
                    redirect: {name: redirect ? redirect.from.name : 'Home'},
                    success (res) {
                        console.log('Auth Success')
                        // console.log('Token: ' + this.$auth.token())
                        // console.log(res)
                    },
                    error (err) {
                        if (err.response) {
                            // The request was made, but the server responded with a status code
                            // that falls out of the range of 2xx
                            // console.log(err.response.status)
                            // console.log(err.response.data)
                            // console.log(err.response.headers)
                            this.error = err.response.data
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', err.message)
                        }
                        console.log(err.config)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
*{color: #ffff;}
.bg{background: url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Amazing-Bicycle-Background.jpg') no-repeat; width: 100%; height: 100vh; background-size: 1300px 900px;}
@media (min-width: 1200px) {
    .form-container{
        padding: 50px 60px; margin-top: 20vh;
        -webkit-box-shadow: 0px 0px 26px 11px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 26px 11px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 26px 11px rgba(0,0,0,0.75);
    }
}
</style>
