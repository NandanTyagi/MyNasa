'use strict';
var menuBtn = document.getElementById('menu-btn');
var slideMenu = document.getElementById('slide-menu');
var menuFordon = document.getElementById('menu-fordon');
var menuDetaljer = document.getElementById('menu-detaljer');
var menuMember = document.getElementById('menu-member');
var menuRecommend = document.getElementById('menu-recommendation');
var show = document.getElementById('show');
var roverInfo = document.getElementById('rover-info');
var roverStatus = document.getElementById('rover-status');
var roverLanding = document.getElementById('landing-date');
var roverLaunch = document.getElementById('launch-date');
var roverName = 'Opportunity';
var solNr = 278;

fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${solNr}&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`)
  .then((res) => res.json())
  .then((data) => createPages(data));

function createPages(api) {
  check(api);

  console.log("here",api.photos[1].img_src);
  // api.photos.forEach(photo => {
  //   console.log(photo.img_src);
  // });
  // console.log(api);

  menuFordon.addEventListener('click', () => {
    
  });

  function showRovers() {}
}

function check(api) {
  
  roverInfo.innerText = roverName;
  roverStatus.innerHTML = "Status: " + api.photos[0].rover.status;
  roverLaunch.innerHTML = "Uppskjutningsdatum: " + api.photos[0].rover.launch_date;
  roverLanding.innerHTML = "Landningsdatum: " + api.photos[0].rover.landing_date;
  let printPic = '';
  api.photos.forEach((el) => {
    console.log(el.rover);
    printPic += `<img src="${el.img_src}" alt="" class="pic">`;
    show.innerHTML = printPic;
    

  });
}

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  if (menuBtn.classList.contains('open')) {
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>'
    slideMenu.style.visibility = 'hidden';
  } else {
    menuBtn.innerHTML = '<i class="fas fa-times"></i>'
    slideMenu.style.visibility = 'visible';
  }
});

