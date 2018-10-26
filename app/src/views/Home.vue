<template>
<div>
  <div id="slideshow-container">

    <div class="mySlides fade">
      <div class="numbertext"></div>
      <img src="https://static1.squarespace.com/static/573a6216d210b8a74fbe7aef/5806bde7579fb31fdfe7ccb3/5806bdea29687fa3df4cfe1d/1476836845837/LBSA2-1.jpg" style="width:100%">
      <div class="text"></div>
    </div>
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div>

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
#slideshow-container {
    margin: 0px auto;
    position: relative;
    width: 1230px;
    height: 695px;
    padding: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

#slideshow-container > div {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
}

#announcements-container {
    margin: 30px auto;
    position: relative;
    width: 1230px;
    height: 350px;
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
    height: 200px;
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

* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
    display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
