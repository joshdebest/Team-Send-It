<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://bikesportbicycles.com/wp-content/uploads/2018/02/bikesport_giant-bicycle_remodel-1024x480.jpg">
        <h1>Welcome To Foxycle</h1>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://farm6.staticflickr.com/5327/10081872975_1afbcdffdb_b.jpg">
        <h1>Enjoy The Outdoors</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="http://i950.photobucket.com/albums/ad345/kdionb/colnagofreccia.jpg">
        <h1>The Best Form Of Transportation</h1>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="http://mtb-addict.com/wp-content/uploads/2018/01/Fantic-XF1-1-1024x480.jpg" alt="image slot">
          <h1>All Terrains</h1>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide img-src="https://k4kis3b14e9g4w8e-zippykid.netdna-ssl.com/wp-content/uploads/2017/12/buying-used-head-1024x480.jpg">
        <h1>Start Biking Now</h1>
      </b-carousel-slide>
    </b-carousel>


    <div id="announcements-container">
        <div id="announcements">
          Announcements
        </div>
        <div id="announcements_body">
          Most of us remember learning to ride a bike when we were kids,
          falling and scraping our knees, trying over and over again to get the
          balance right. But what we remember most of all is that glorious feeling
          when our parents let go and we just kept going! Never falling, and
          feeling like we could ride off on a cloud of success into the sunset.
          <br>
          <br>
          Then however, we got older and we forgot about the triumphant and
          peaceful feelings bike riding could bring us. We got busy and may
          never even have bothered to get an adult bike after we outgrew our childhood one.
          <br>
          <br>
          Or, maybe you never forgot this feeling, maybe you’ve been riding your
          bike every day for years, enjoying that feeling of freedom, and now your
          beloved bike is worn out and you are in desperate need of a new one.
          <br>
          <br>
          You’re going to come to Foxycle! Why? We are offering an amazing
          sales on bikes that will get you out there experiencing
          life to the fullest in no time!
        </div>
      </div>
      <div id="about-us-container">
        <div id="about-us">
          About Us
        </div>
        <div id="about-us_body">
          We Are Foxylce and we are the premier seller of bikes, components, and services.
          We carry mid-ranged priced bikes and no branded merchandise. Our website offers
           all the support that you need. But if you are still unsure with your decision
          come on in and we will be happy to help. Our in-store services range from
          installations to full bike service. We hope you enjoy our company because
          we will definitely enjoy yours!
        </div>
      </div>
    </div>
</template>

<style lang="scss">

#announcements-container {
    margin: 30px auto;
    position: relative;
    width: 1230px;
    height: 420px;
    padding: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

#announcements-container > div {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
}
#announcements {
  font-size:300%;
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 60px;
  font-weight: bold;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}


#announcements_body {
  margin: 30px auto;
  position: absolute;
  top: 10px;
  width: 1050px;
  height: 25px;
  padding: 60px;
  font-size:100%;
  font-weight: bold;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#announcements_body > div {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
}

#about-us-container {
    margin: 30px auto;
    position: relative;
    width: 1230px;
    height: 220px;
    padding: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

#about-us-container > div {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
}
#about-us {
  font-size:300%;
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 60px;
  font-weight: bold;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}


#about-us_body {
  margin: 30px auto;
  position: absolute;
  top: 10px;
  width: 1050px;
  height: 25px;
  padding: 60px;
  font-size:100%;
  font-weight: bold;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>
