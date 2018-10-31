<template>
  <div class="contact">

    <h2 class="title">Contact Us</h2>
      <div id="after_submit"></div>
      <form id="contact_form">

        <div class="row" >
          <label class="required" for="name">Name:</label><br />
          <input id="name" class="input" name="name" type="text" value="" size="30"
          v-model="Name"/><br />
          <span id="name_validation" class="error_message"></span>
        </div>

        <div class="row" >
          <label class="required" for="email">Email:</label><br />
          <input id="email" class="input" name="email" type="text" value="" size="30"
          v-model="Email"/><br />
          <span id="email_validation" class="error_message"></span>
        </div>

        <div class="row">
          <label class="required" for="phone">Phone Number:</label><br />
          <input id="phone" class="input" name="phone" type="text" value="" size="30"
          v-model="PhoneNumber"/><br />
          <span id="phone_validation" class="error_message"></span>
        </div>

        <div class="row">
          <label class="required" for="message">Message:</label><br />
          <textarea id="message" class="input" name="message" rows="7" cols="30"
          v-model="Message"></textarea><br />
          <span id="message_validation" class="error_message"></span>
        </div>

        <div class="button">
          <button type="submit" v-on:click="submitMessage()">Submit</button>
        </div>
    </form>

    <h3 class="phone">Phone: 123-123-1234</h3>

    <h4 class="hours" style="white-space: pre-wrap;"><strong>Hours</strong></h4>
      <p style="white-space: pre-wrap;">Monday to Friday 10 AM - 6 PM<br>Saturday 10 AM - 5 PM
      <br>Sunday 12 PM - 5 PM</p>
      <p style="white-space: pre-wrap;"><strong>*We will be closed on all national
      holidays</strong></p>

    <h5 style="white-space: pre-wrap;"><strong>Location</strong></h5>
    <p style="white-space: pre-wrap;">
    <a href="https://www.google.com/maps/place/Foothill+Cyclery/
    @35.293542,-120.6753547,17z/data=!3m1!4b1!4m5!3m4!1s0x80ecf051fdb9435b:
    0xb27885a863b62dae!8m2!3d35.293542!4d-120.673166"
    target="_blank"><strong>767 East Foothill Blvd Ste B<br>San Luis Obispo,
    Ca 93405</strong></a>
      <br><br>We are located in the Foothill Plaza Shopping Center right next
      door to California Fresh Market.</p>
  </div>
</template>

<script>
import ContactSubmissionService from '@/services/ContactSubmissionService';

export default {
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
      console.log(response.data);
    },
  },
};
</script>
