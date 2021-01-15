'use strict';
/************* DOM Strings ***************/
var menuBtn = document.getElementById('menu-btn');
var slideMenu = document.getElementById('slide-menu');
var slideMenuShade = document.getElementById('slide-menu-shade');
var menuFordon = document.getElementById('menu-fordon');
var menuDetaljer = document.getElementById('menu-detaljer');
var menuMember = document.getElementById('menu-member');
var menuRecommend = document.getElementById('menu-recommendation');
var show = document.getElementById('show');
var roverNameTitle = document.getElementById('rover-name');
var roverStatus = document.getElementById('rover-status');
var roverLanding = document.getElementById('landing-date');
var roverLaunch = document.getElementById('launch-date');
var roverImage = document.getElementById('rover-image');
var earthDate = document.getElementById('earth-date');
var submitBtn = document.getElementById('submit-btn');

// Set current rover
var rovers = ['Opportunity', 'Spirit', 'Curiosity'];
var currentRover = rovers[1];
var currentRoverObject = {};
var currentRoverManifest = {};

// Capitalize rover name
var currentRoverFirstLetter = currentRover.slice(0, 1);
var currentRoverNameCapitalized =
  currentRoverFirstLetter.toUpperCase() +
  currentRover.substring(1, currentRover.length);

/************ NASA Mars Rover APIEndpoints ****************/

// Get Rover Manifest
/*---`https://api.nasa.gov/mars-photos/api/v1/manifests/rover_name/?&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`*/

// Get by SOL
/*---`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${solNr}&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`*/

// Get by earth date
// `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${today}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`

/***************************************************************/
// Get Spirit Manifest
fetch(
  `https://api.nasa.gov/mars-photos/api/v1/manifests/Spirit/?&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
)
  .then((res) => res.json())
  .then((manifestSpirit) => {
    // Get Opportunity Manifest
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity/?&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
    )
      .then((res) => res.json())
      .then((manifestOpportunity) => {
        // Get Curiosity Manifest
        fetch(
          `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
        )
          .then((res) => res.json())
          .then((manifestCuriosity) => {
            // Set max date and default value of date input
            var SpiritMaxDate = manifestSpirit.photo_manifest.max_date;
            var OpportunityMaxDate =
              manifestOpportunity.photo_manifest.max_date;
            var CuriosityMaxDate = manifestCuriosity.photo_manifest.max_date;

            if (
              // Opportunity set max date and default value of date input
              currentRover ==
              manifestOpportunity.photo_manifest.name
            ) {
              var chosenDate = OpportunityMaxDate;
              earthDate.setAttribute('value', OpportunityMaxDate);
            } else if (
              // Spirit set max date and default value of date input
              currentRover ==
              manifestSpirit.photo_manifest.name
            ) {
              var chosenDate = SpiritMaxDate;
            } else if (
              // Curiosity set max date and default value of date input
              currentRover ==
              manifestCuriosity.photo_manifest.name
            ) {
              var chosenDate = CuriosityMaxDate;
            }
            // Get photos by "rover name" och "earth date"
            fetch(
              `https://api.nasa.gov/mars-photos/api/v1/rovers/${currentRover}/photos?earth_date=${chosenDate}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
            )
              .then((res) => res.json())
              .then((roverByEarthDate) => {
                // Pass in all API data to model function
                dataModel(
                  manifestOpportunity,
                  manifestSpirit,
                  manifestCuriosity,
                  roverByEarthDate,
                );
              });
          });
      });
  });

// Creation function
function dataModel(
  opportunityManifest,
  spiritManifest,
  curiosityManifest,
  roverByEarthDate,
) {
  console.log('API Manifest Object Opportunity ', opportunityManifest);
  console.log('API Manifest Object Spirit', spiritManifest);
  console.log('API Manifest Object Curiosity', curiosityManifest);
  console.log('API Manifest Object Rover by earthdate', roverByEarthDate);
  console.log('Current Rover:', currentRover);
  if (currentRover == opportunityManifest.photo_manifest.name) {
    earthDate.setAttribute('max', opportunityManifest.photo_manifest.max_date);
    currentRoverManifest = opportunityManifest;
  } else if (currentRover == spiritManifest.photo_manifest.name) {
    earthDate.setAttribute('max', spiritManifest.photo_manifest.max_date);
    currentRoverManifest = spiritManifest;
  } else if (currentRover == curiosityManifest.photo_manifest.name) {
    earthDate.setAttribute('max', curiosityManifest.photo_manifest.max_date);
    currentRoverManifest = curiosityManifest;
  }
    check(currentRoverManifest, roverByEarthDate);
}

function check(currentRoverManifest, roverByEarthDate) {
  roverNameTitle.innerText = currentRover;
  roverStatus.innerHTML = 'Status: ' + currentRoverManifest.photo_manifest.status;
  roverLaunch.innerHTML =
    'Uppskjutningsdatum: ' + currentRoverManifest.photo_manifest.launch_date;
  roverLanding.innerHTML =
    'Landningsdatum: ' + currentRoverManifest.photo_manifest.landing_date;
  roverImage.innerHTML = `<img
                src="./img/${currentRover}.jpg"
                class="rover-img"
                alt=""
                srcset=""
              />`;
  let printPic = '';
  roverByEarthDate.photos.forEach((el) => {
    console.log(el.rover);
    printPic += `<img src="${el.img_src}" alt="" class="pic">`;
    // show.innerHTML = printPic;
  });
}

// Hamburger menu
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  if (menuBtn.classList.contains('open')) {
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    slideMenu.style.visibility = 'hidden';
    slideMenuShade.style.visibility = 'hidden';
  } else {
    menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    slideMenu.style.visibility = 'visible';
    slideMenuShade.style.visibility = 'visible';
  }
});
