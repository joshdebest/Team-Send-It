<template>
<div>
  <Navigation />
  <div class="contact">
    <div class="container hero">
    <div class="Hero-container Hero--textCenter Container ">
        <div class="Hero-copy Typography">
            <h0>Contact Us</h0>
        </div>
    </div>
  </div>

<section style="padding: 1.3125rem 0!important;">
      <div id="after_submit">
      <div class="container-fluid">
        <div class="row">
        <div class="col">
      <form id="contact_form" class="form-horizontal" @submit="onSubmit">
        <div class="form-group">
          <label class="control-label col-sm-2 required" for="name">Name:</label>
          <div class="col-sm-10">
            <input id="name" class="form-control" name="name" placeholder="Name" type="text" value="" size="30"
            v-model="Name" required/>
          </div>
          <span id="name_validation" class="error_message"></span>
        </div>

        <div class="form-group" >
          <label class="control-label col-sm-2 required" for="email">Email:</label>
          <div class="col-sm-10">
            <input id="email" class="form-control" name="email" placeholder="test@email.com" type="email" value="" size="30"
            v-model="Email" required/>
          </div>
          <span id="email_validation" class="error_message"></span>
        </div>

        <div class="form-group">
          <label class="control-label col-sm-4 required" for="phone">Phone Number:</label>
          <div class="col-sm-10">
            <input id="phone" class="form-control" name="phone" placeholder="123-456-7890" type="tel"
            value="" size="30" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="PhoneNumber" required/>
          </div>
          <span id="phone_validation" class="error_message"></span>
        </div>

        <div class="form-group">
          <label class="control-label col-sm-2 required" for="message">Message:</label>
          <div class="col-sm-10">
            <textarea id="message" class="form-control" placeholder="Message" name="message" rows="7" cols="30"
            v-model="Message" required></textarea>
          </div>
          <span id="message_validation" class="error_message"></span>
        </div>

        <div class="button">
          <button type="submit" class="btn btn-success col-sm-10">Submit</button>
        </div>
    </form>
  </div>

<div class="col info">

    <h4 class="phone">Phone</h4>
      <p style="white-space: pre-wrap;">123-123-1234<br><br></p>
    <h4 class="hours" style="white-space: pre-wrap;">Hours</h4>
      <p style="white-space: pre-wrap;">Monday to Friday 10 AM - 6 PM<br>Saturday 10 AM - 5 PM<br>Sunday 12 PM - 5 PM</p>
      <p style="white-space: pre-wrap;"><strong>*We will be closed on all national holidays</strong><br><br></p>

    <h4 style="white-space: pre-wrap;">Location</h4>
    <p style="white-space: pre-wrap;">
    <a href="https://www.google.com/maps/place/Foothill+Cyclery/
    @35.293542,-120.6753547,17z/data=!3m1!4b1!4m5!3m4!1s0x80ecf051fdb9435b:
    0xb27885a863b62dae!8m2!3d35.293542!4d-120.673166"
    target="_blank">767 East Foothill Blvd Ste B<br>San Luis Obispo, CA 93405</a>
      <br><br>
We are located in the Foothill Plaza Shopping Center
right next door to California Fresh Market.</p>
  </div>
</div>
</div>
</div>
</section>
</div>
</div>
</template>

<style lang="scss">
*{color: black;}
.info{
  font-family: Avenir Next;
}
.hero{
  background: url('http://www.achieve3000.com/wp-content/uploads/2015/02/contact-us-hero.jpg') no-repeat;
  max-width: 100%;
  max-height: 100vh;
  background-size: 1300px 900px;
  overflow: hidden;
  padding: 70px;
  *{color: white;}
}
h0 {
  font-size: 100px;
}
.Hero-copy {
 text-align: center;
  font-family: Avenir Next;
}


#after_submit {
  text-align: left;
}

</style>

<script>
import Navigation from './Navigation';
import ContactSubmissionService from '@/services/ContactSubmissionService';
export default {
  name: 'App',
  data() {
    return {
      Name: '',
      Email: '',
      PhoneNumber: '',
      Message: '',
    };
  },
  methods: {
    async submitMessage() {
      const response = await ContactSubmissionService.submitMessage({
        Name: this.Name,
        Email: this.Email,
        PhoneNumber: this.PhoneNumber,
        Message: this.Message,
      });
    },
    onSubmit(e) {
      e.preventDefault();

      var form = document.getElementById('contact_form');
      if (form.checkValidity()) {
        this.submitMessage();

        this.Name = ''
        this.Email = ''
        this.PhoneNumber = ''
        this.Message = ''
      }
    },
  },
  components: {
    Navigation
  }
};
</script>
