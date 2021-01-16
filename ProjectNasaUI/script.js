'use strict';
{
  // Incapsulation start

  /************* DOM Strings ***************/
  var menuBtn = document.getElementById('menu-btn');
  var slideMenu = document.getElementById('slide-menu');
  var slideMenuShade = document.getElementById('slide-menu-shade');
  var menuRovers = document.getElementById('menu-fordon');
  var menuHome = document.getElementById('menu-home');
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
  var mainContainer = document.getElementById('container-main');
  var logoBtn = document.getElementById('logo');

  // App pages
  var pages = ['Home', 'Rovers', 'Details', 'Recommendations', 'Members'];

  // Set current rover
  var rovers = ['Opportunity', 'Spirit', 'Curiosity'];
  // var currentRover = rovers[2];
  var chosenDate = null;
  var currentRoverObject = {};
  var currentRoverManifest = {};
  var currentPage = 'Home';

  /************ NASA Mars Rover APIEndpoints ****************/

  // Get Rover Manifest
  /*---`https://api.nasa.gov/mars-photos/api/v1/manifests/rover_name/?&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`*/

  // Get by SOL
  /*---`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${solNr}&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`*/

  // Get by earth date
  // `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${today}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`

  /***************************************************************/
  // First page
  function firstPage() {
    mainContainer.innerHTML = '';
    mainContainer.innerHTML = `<div class="box" id="sho">
              <h1>
                Naturhistoriska Intressegruppen <br />
                i Uddebo
              </h1>
            </div>
            <div class="box">
              <h3>På den här sidan kan du:</h3>
              <br />
              <ul class="list-items">
                <li>Läsa artiklar om Mars</li>
                <li>Se bilder på Mars</li>
                <li>Läsa om forskningsfordon som finns på Mars</li>
                <li>Bli medlem hos NIU.se</li>
              </ul>
            </div>
            <div class="box">
              <h3>Rekomendationer</h3>
            </div>
            <div class="box">
              <h3>Intressant fakta</h3>
            </div>
            <div class="box clickable" id="rovers-btn">
              <h3>Forskningsfordon på Mars</h3>
             </div>`;
    var roversBtn = document.getElementById('rovers-btn');
    roversBtn.addEventListener('click', () => {
      console.log('click');
      pickRoverView();
    });
    colorMenuBtn('Home');
  }
  // Show first page
  firstPage();
  
  // Rovers menubtn clicked
  function pickRoverView() {
    colorMenuBtn('Rovers');
    mainContainer.innerHTML = `
              <div class="rover-shade1" id="Curiosity">
                <div class="rover-shade2">
                  <img
                    src="./img/Curiosity.jpg"
                    alt=""
                    class="rover-single"
                    id="rover-1"
                  />
                </div>
              </div>
              <div class="rover-shade3" id="Spirit">
                <div class="rover-shade4">
                  <img
                    src="./img/Spirit.jpg"
                    alt=""
                    class="rover-single"
                    id="rover-2"
                  />
                </div>
              </div>
              <div class="rover-shade5" id="Opportunity">
                <div class="rover-shade6">
                  <img
                    src="./img/Opportunity.jpg"
                    alt=""
                    class="rover-single"
                    id="rover-3"
                  />
                </div>
              </div>
            `;
    var curiosityLink = document.getElementById('Curiosity');
    curiosityLink.addEventListener('click', () => {
      mainContainer.innerHTML =
        '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
      detailsView(rovers[2]);
      hideMenu();
    });
    var spiritLink = document.getElementById('Spirit');
    spiritLink.addEventListener('click', () => {
      mainContainer.innerHTML =
        '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
      detailsView(rovers[1]);
      hideMenu();
    });
    var opportunityLink = document.getElementById('Opportunity');
    opportunityLink.addEventListener('click', () => {
      mainContainer.innerHTML =
        '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
      detailsView(rovers[0]);
      hideMenu();
    });
  }

  // Details menubtn clicked
  function detailsView(currentRover) {
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
                // Set max date for default API call
                var SpiritMaxDate = manifestSpirit.photo_manifest.max_date;
                var OpportunityMaxDate =
                  manifestOpportunity.photo_manifest.max_date;
                var CuriosityMaxDate =
                  manifestCuriosity.photo_manifest.max_date;

                if (
                  // Opportunity default date
                  currentRover == manifestOpportunity.photo_manifest.name &&
                  chosenDate == null
                ) {
                  chosenDate = OpportunityMaxDate;
                } else if (
                  // Spirit default date
                  currentRover == manifestSpirit.photo_manifest.name &&
                  chosenDate == null
                ) {
                  chosenDate = SpiritMaxDate;
                } else if (
                  // Curiosity default date
                  currentRover == manifestCuriosity.photo_manifest.name &&
                  chosenDate == null
                ) {
                  chosenDate = CuriosityMaxDate;
                }
                // Get photos by "rover name" och "earth date"

                // Pass in all API data to model function
                dataModel(
                  manifestOpportunity,
                  manifestSpirit,
                  manifestCuriosity,
                );
              });
          });
      });

    // Data model
    function dataModel(opportunityManifest, spiritManifest, curiosityManifest) {
      // Log nessecary objects
      console.log('API Manifest Object Opportunity ', opportunityManifest);
      console.log('API Manifest Object Spirit', spiritManifest);
      console.log('API Manifest Object Curiosity', curiosityManifest);
      // console.log('API Manifest Object Rover by earthdate', roverByEarthDate);
      console.log('Current Rover:', currentRover);

      // Sync manifest to current rover
      if (currentRover == opportunityManifest.photo_manifest.name) {
        currentRoverManifest = opportunityManifest;
      } else if (currentRover == spiritManifest.photo_manifest.name) {
        currentRoverManifest = spiritManifest;
      } else if (currentRover == curiosityManifest.photo_manifest.name) {
        currentRoverManifest = curiosityManifest;
      }

      showDetailsView(currentRoverManifest);
    }

    function showDetailsView(currentRoverManifest) {
      mainContainer.innerHTML = '';
      mainContainer.innerHTML = `<div class="box" id="sho">
              <h2 id="rover-name"></h2>
              <h3 id="landing-date">
                <img src="./img/spinner.gif" class="spinner" alt="" />
              </h3>
              <h3 id="launch-date"></h3>
              <h4 id="rover-status"></h4>
            </div>
            <div class="box" id="rover-image">
              <img
                src="./img/spinner.gif"
                class="rover-img"
                alt=""
                style="width: 50%; height: 50%;"
              />
            </div>
            <div class="box">
              <h3>Sök foton:</h3>
              <br />
              <div class="flex-row">
                <input type="date" name="earth-date" id="earth-date" />
              </div>
              <br />
              <div class="flex-row">
                <label for="camera-FHAZ">FHAZ</label>
                <input
                  type="checkbox"
                  name="camera-FHAZ"
                  id="camera-FHAZ"
                  title="Front Hazard Avoidance Camera"
                />
              </div>
              <br />
              <div class="flex-row">
                <label for="camera-PANCAM">PANCAM</label>
                <input
                  type="checkbox"
                  name="camera-PANCAM"
                  id="camera-PANCAM"
                  title="Panoramic Camera"
                />
              </div>
              <br />
              <div class="flex-row">
                <button id="submit-btn" class="submit-btn">Show</button>
              </div>
            </div>`;
      var roverNameTitle = document.getElementById('rover-name');
      var roverStatus = document.getElementById('rover-status');
      var roverLanding = document.getElementById('landing-date');
      var roverLaunch = document.getElementById('launch-date');
      var roverImage = document.getElementById('rover-image');
      var earthDate = document.getElementById('earth-date');
      console.log('Current Rover Manifest', currentRoverManifest);
      earthDate.setAttribute(
        'max',
        currentRoverManifest.photo_manifest.max_date,
      );
      console.log('Chosen date: ', chosenDate);
      // if(chosenDate.value == null)
      earthDate.setAttribute(
        'value',
        currentRoverManifest.photo_manifest.max_date,
      );
      roverNameTitle.innerText = currentRover;
      roverStatus.innerHTML =
        'Status: ' + currentRoverManifest.photo_manifest.status;
      roverLaunch.innerHTML =
        'Uppskjutningsdatum: ' +
        currentRoverManifest.photo_manifest.launch_date;
      roverLanding.innerHTML =
        'Landningsdatum: ' + currentRoverManifest.photo_manifest.landing_date;
      roverImage.innerHTML = `<img
                src="./img/${currentRover}.jpg"
                class="rover-img"
                alt=""
                srcset=""
              />`;

      if (chosenDate != currentRoverManifest.photo_manifest.max_date) {
        chosenDate = earthDate.value;
      }
      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${currentRover}/photos?earth_date=${chosenDate}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
      )
        .then((res) => res.json())
        .then((roverByEarthDate) => {
          let printPic = '';
          roverByEarthDate.photos.forEach((el) => {
            console.log(el.rover);
            printPic += `<img src="${el.img_src}" alt="" class="pic">`;
            show.innerHTML = printPic;
          });
        });
    }
  }

  // Logo click
  logoBtn.addEventListener('click', () => {
    firstPage();
    hideMenu();
  });
  // Home btnclick
  menuHome.addEventListener('click', () => {
    firstPage();
    hideMenu();
  });
  // Hamburger menu
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    if (menuBtn.classList.contains('open')) {
      menuBtn.innerHTML = '<i class="fas fa-times"></i>';
      slideMenu.style.visibility = 'visible';
      slideMenuShade.style.visibility = 'visible';
    } else {
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      slideMenu.style.visibility = 'hidden';
      slideMenuShade.style.visibility = 'hidden';
    }
  });

  menuRovers.addEventListener('click', () => {
    console.log('clicked');
    mainContainer.innerHTML =
      '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
    pickRoverView();
    hideMenu();
  });

  // menuDetails.addEventListener('click', () => {
  //   mainContainer.innerHTML =
  //     '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
  //   detailsView(rovers[2]);
  //   hideMenu();
  // });

  function hideMenu() {
    menuBtn.classList.remove('open');
    slideMenu.style.visibility = 'hidden';
    slideMenuShade.style.visibility = 'hidden';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }

  function colorMenuBtn(currentPage) {
    var originalColor = 'rgb(229, 226, 226)';
    if (currentPage == pages[0]) {
      menuHome.style.color = 'red';
      menuRovers.style.color = originalColor;
      menuRecommend.style.color = originalColor;
      menuMember.style.color = originalColor;
    }
    if (currentPage == pages[1]) {
      menuHome.style.color = originalColor;
      menuRovers.style.color = 'red';
      menuRecommend.style.color = originalColor;
      menuMember.style.color = originalColor;
    }
    if (currentPage == pages[2]) {
      menuHome.style.color = originalColor;
      menuRovers.style.color = originalColor;
      menuRecommend.style.color = 'red';
      menuMember.style.color = originalColor;
    }

    if (currentPage == pages[3]) {
      menuHome.style.color = originalColor;
      menuRovers.style.color = originalColor;
      menuRecommend.style.color = originalColor;
      menuMember.style.color = 'red';
    }
  }
} // Incapsulation end
