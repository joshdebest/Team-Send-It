<template>
  <div>
    <Navigation />
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
        <h1>Start Biking Now!</h1>
      </b-carousel-slide>
    </b-carousel>

    <div class="section">
      <div class="container">
        <h2>Announcements</h2>
        <b-list-group>
          <b-list-group-item v-for="announcement in announcements" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ announcement.title }}</h5>
            </div>
            <small>{{ announcement.message }}</small>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <h2>About Us</h2>
        <p class="about-text">We Are Foxycle and we are the premier seller of bikes, components, and services.
          We carry mid-ranged priced bikes and no branded merchandise. Our website offers
           all the support that you need. But if you are still unsure with your decision
          come on in and we will be happy to help. Our in-store services range from
          installations to full bike service. We hope you enjoy our company because
          we will definitely enjoy yours!</p>
          <img width=35% src="https://www.spinlister.com/blog/wp-content/uploads/2017/01/best-bike-shop-5.jpg">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.section {
  padding: 40px;
}
.container {
  border: 1px solid #b5b5b5;
  padding: 10px;
  padding-left: 20px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
}

.about-text {
    float: left;
    margin-left: 10px;
    margin-top: 30px;
    width: 50%;
}
.container img {
    margin-left: 100px;
    padding: 20px;
}
</style>

<script>
import Navigation from './Navigation'
import GetAnnouncementsService from '@/services/GetAnnouncementsService'

export default {
  name: 'App',
  data() {
    return {
      slide: 0,
      sliding: null,
      announcements: [{title: "Bike Giveaway", message: "Come to the Foxycle bike shop to enter to win a bike."},
                      {title: "Stomp on the Step Twin, a folding bike for riders who don’t like pedaling circles",
                       message: "Put this StepTwin bike under the category of wacky bicycle inventions that are oddly entertaining to watch, maybe even something you'd actually want to try - if only to see what it feels like to ride."}]
    };
  },
  created: async function() {
    const annmnts = await GetAnnouncementsService.GetAnnouncements().then(annmnts => {
      console.log(annmnts.data.announcements);
      return annmnts.data.announcements;
    }).catch(error => console.log(error));

    this.announcements = new Array();

    // loop through all users and map user info to table
    for (var i = 0; i < annmnts.length; i++) {
      const announcement = {
        title: annmnts[i]['Title'],
        message: annmnts[i]['Message'],
      };

      this.announcements[i] = announcement;
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
  components: {
    Navigation
  }
};
</script>
