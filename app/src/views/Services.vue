<template>
<div>
  <Navigation />
  <div class="container hero">
  <div class="Hero-container Hero--textCenter Container ">
      <div class="Hero-copy Typography">
          <h0>Services &amp; Repairs</h0>
      </div>
  </div>
</div>
  <div class="servicesrepairs">
    <div class="services_paragraphs" >
      <div class="service_texts">
        <div align="left" class="packages">
          <h3>SERVICE PACKAGES</h3>
          <ul class="services">
            <li class="service">Minor tune-up</li>
            <li class="service">Major tune-up</li>
            <li class="service">Drivetrain overhaul</li>
            <li class="service">Brake overhaul</li>
            <li class="service">Complete bicycle overhaul</li>
            <li class="service">Complete bearing overhaul</li>
            <li class="service">Electric bike service</li>
            <li class="service">Bosch eBike drivetrain service</li>
          </ul>
        </div>
        <div align="left" class="brakes">
          <h3>BRAKES</h3>
          <ul class="services">
            <li class="service">Replace brake cable(s)</li>
            <li class="service">Replace brake shoes</li>
            <li class="service">Minor brake adjustment</li>
            <li class="service">Major brake adjustment</li>
            <li class="service">Bleed hydraulic disc brakes</li>
            <li class="service">Disc-brake rotor repair</li>
            <li class="service">Hydraulic disc brake line repair/replace</li>
            <li class="service">Install and adjust new brakes</li>
          </ul>
        </div>
        <div align="left" class="frontend">
          <h3>FRONT END</h3>
          <ul class="services">
            <li class="service">Adjust headset</li>
            <li class="service">Overhaul headset</li>
            <li class="service">Replace headset</li>
            <li class="service">Replace handlebars</li>
            <li class="service">Replace stem</li>
            <li class="service">Replace handlebar tape</li>
            <li class="service">Replace handlebar grips</li>
          </ul>
        </div>
        <div align="left" class="frame">
          <h3>FRAME &amp; FORK</h3>
          <ul class="services">
            <li class="service">Check/align dropouts</li>
            <li class="service">Replace fork</li>
            <li class="service">Suspension fork overhaul</li>
            <li class="service">Rear shock air sleeve</li>
            <li class="service">Frame preparation for assembly (thread chase &amp; face)</li>
            <li class="service">Derailleur hanger repair/replacement</li>
          </ul>
        </div>
      </div>
      <div class="img"><img src = "http://sidehustlehq.com/wp-content/uploads/2017/07/bicyclerepair.jpg"
          style = "width: 450px; height: 300px;"></div>
      <div class="img"><img src = "http://www.ridesonair.com/images/full-sized/professional-bike-workshop.jpg"
          style = "width: 450px; height: 300px;"></div>
    </div>
    <h3 class="phone">PICKUP AND DELIVERY AVAILABLE! - CALL STORE FOR DETAILS!</h3>
  </div>
</div>
</template>

<script>
import Navigation from './Navigation';

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
.hero{background: url('https://bikedoctorhhi.com/wp-content/uploads/2015/07/bike-repair-2.jpg') no-repeat;
  max-width: 100%;
  max-height: 100vh;
  background-size: 1300px 900px;
  overflow: hidden;
  padding: 70px;
  *{color: white;}
}
.Hero-copy {
 text-align: center;
 font-family: Avenir Next;
}
h0 {
  font-size: 100px;
}
  *{color: black;}
  #services_paragraphs{
    font-size: 300%;
  }
  .title {
    text-align: left;
    margin-left: 100px;
    margin-bottom: 20px;
    font-family: 'Open Sans', sans-serif;
    font-size: 48px;
  }
  .servicesrepairs {
    margin-top: 50px;
  }
  .service_texts {
    font-family: 'Open Sans', sans-serif;
    margin-left: 100px;
    float: left;
  }
  .service_texts h3{
    font-weight: bold;
    font-size: 20px;
  }
  .service {
    font-weight: lighter;
  }
  .packages {
    margin-bottom: 50px;
  }
  .brakes {
    margin-bottom: 50px;
  }
  .frontend {
    margin-bottom: 50px;
  }
  .frame {
    margin-bottom: 50px;
  }
  .phone {
    clear: both;
    text-align: center;
    margin-bottom: 20px;
  }
  .img {
    padding-top: 60px;
    margin-bottom: 140px;
  }
</style>
