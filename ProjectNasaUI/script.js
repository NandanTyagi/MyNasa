// //@ts-check
'use strict';
{
  // Incapsulation start

async function init() {
  /************* DOM Strings ***************/
  const menuBtn = document.getElementById('menu-btn');
  const slideMenu = document.getElementById('slide-menu');
  const slideMenuShade = document.getElementById('slide-menu-shade');
  const menuRovers = document.getElementById('menu-fordon');
  const menuHome = document.getElementById('menu-home');
  const menuMember = document.getElementById('menu-member');
  const menuRecommend = document.getElementById('menu-recommendation');
  const mainContainer = document.getElementById('container-main');
  const logoBtn = document.getElementById('logo');
  const nasaLogo = document.getElementById('nasa-logo');
  const OpportunityInfoUrl =
    'https://en.wikipedia.org/wiki/Opportunity_(rover)';
  const SpiritInfoUrl = 'https://sv.wikipedia.org/wiki/Spirit_(rymdfordon)';
  const CuriosityInfoUrl = 'https://en.wikipedia.org/wiki/Curiosity_(rover)';

  let nasaApi = {};

  /**************** Variables *****************/
  let rovers = [];
  let chosenDate = null;
  let currentRoverManifest = {};



  let myApi = {};
  async function getAllFromMyApi() {
    let res = await fetch('https://localhost:5001/myapi/v1/all');
    let data = await res.json();
    myApi.data = data;
  }
  await getAllFromMyApi();
  console.log('MyAPI', myApi);
  for (let i = 0; i < 3; i++) {
    
  }
  console.log(myApi)
  myApi.data[0].rovers.forEach(rover => {
    rovers.push(rover.name);
  })
  rovers = myApi.data[0].rovers;
  console.log(rovers);

  /*************** Page views ******************/
  // First page
  function firstPage() {
    colorMenuBtn('Home');
    mainContainer.innerHTML = '';
    mainContainer.innerHTML = ` <div class="grid-container-5">
              <div class="grid-5-item">
                <div class="boxer" id="sho">
                  <h1>
                    Naturhistoriska Intressegruppen <br />
                    i Uddebo
                  </h1>
                </div>
              </div>
              <div class="grid-5-item">
                <div class="boxer" id="flexer">
                  <h3>På den här sidan kan du:</h3>
                  <br />
                  <div class="list-items">
                    <p>Läsa artiklar om Mars</p>
                    <p>Se bilder på Mars</p>
                    <p>Läsa om forskningsfordon som finns på Mars</p>
                    <p>Bli medlem hos NIU.se</p>
                  </div>
                </div>
              </div>
              <div class="grid-5-item clickable" id="recommedations">
                <div class="boxer">
                  <h3>Rekomendationer</h3>
                </div>
              </div>
              <div class="grid-5-item" id="fact-btn">
                <div class="boxer clickable" >
                  <h3>Intressant fakta</h3>
                </div>
              </div>
              <div class="grid-5-item" id="rovers-btn">
                <div class="boxer clickable">
                  <h3>Forskningsfordon på Mars</h3>
                </div>
              </div>
            </div>`;

    // Event listeners for all the buttons on the first page excluding the hamburger-menu and footer
    let roversBtn = document.getElementById('rovers-btn');
    roversBtn.addEventListener('click', () => {
      prepareContainer();
      pickRoverView();
    });

    let recommendationsBtn = document.getElementById('recommedations');
    recommendationsBtn.addEventListener('click', showRecommendedPage);

    let factBtn = document.getElementById('fact-btn');
    factBtn.addEventListener('click', showFactPage);
  }

  // Rovers menu page
  function pickRoverView() {
    colorMenuBtn('Rovers');
    mainContainer.innerHTML = `
    <div class="grid-container-3">
              <div class="grid-item">
                <div class="rover-shade"></div>
                <div class="rover-shade-text" id="Curiosity">Curiosity</div>
                <img
                src="./img/Curiosity.jpg"
                alt=""
                class="rover-single"
                id="rover-1"
                />
              </div>
              <div class="grid-item">
                <div class="rover-shade"></div>
                <div class="rover-shade-text" id="Spirit">Spirit</div>
                <img
                src="./img/Spirit.jpg"
                alt=""
                class="rover-single"
                id="rover-2"
                />
              </div>
              <div class="grid-item">
                <div class="rover-shade"> </div>
                <div class="rover-shade-text" id="Opportunity">Opportunity</div>
                <img
                  src="./img/Opportunity.jpg"
                  alt=""
                  class="rover-single"
                  id="rover-3"
                />
              </div>
            </div>
            `;

    // Eventlisteners for each rover

    let curiosityLink = document.getElementById('Curiosity');
    curiosityLink.addEventListener('click', () => {
      prepareContainer();
      detailsView(rovers[2].name);
      hideMenu();
    });

    let spiritLink = document.getElementById('Spirit');
    spiritLink.addEventListener('click', () => {
      prepareContainer();
      detailsView(rovers[1].name);
      hideMenu();
    });

    let opportunityLink = document.getElementById('Opportunity');
    opportunityLink.addEventListener('click', () => {
      prepareContainer();
      detailsView(rovers[0].name);
      hideMenu();
    });
  }

  // When a rover is clicked
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
                let SpiritMaxDate = manifestSpirit.photo_manifest.max_date;
                let OpportunityMaxDate =
                  manifestOpportunity.photo_manifest.max_date;
                let CuriosityMaxDate =
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

                // Pass in all API manifestdata to data-modelfunction and call it
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

    // Create the rover-detais view with mainfest info
    function showDetailsView(currentRoverManifest) {
      let currRov = currentRoverManifest.photo_manifest.name;
      let currentUrl = '';
      if (currRov == rovers[0].name) currentUrl = OpportunityInfoUrl;
      if (currRov == rovers[1].name) currentUrl = SpiritInfoUrl;
      if (currRov == rovers[2].name) currentUrl = CuriosityInfoUrl;
      prepareContainer();
      mainContainer.innerHTML = `            <div class="grid-container-3">
              <div class="grid-item">
                <div class="box" id="sho">
                <div class="back-btn clickable" id="back-btn"><i class="fas fa-chevron-left" title="Tillbaka till forskningsfordon"></i></div>
                <h2 id="rover-name"></h2>
                <h3 id="landing-date">
                  <img src="./img/spinner.gif" class="spinner" alt="" />
                </h3>
                <h3 id="launch-date"></h3>
                <h4 id="rover-status"></h4>
                <h5><a href="${currentUrl}" target="_blank" style="color:red;" class="clickable">Mer info </a>
              </div>
              </div>
              <div class="grid-item">
                 <div class="box" id="rover-image">
                <img
                  src="./img/spinner.gif"
                  class="rover-img"
                  
                />
              </div>
              </div>
              <div class="grid-item">
                <div class="box">
                <h3>Se mars foton från ${currentRover}</h3>
                <br />
                <div class="flex-row">
                  <input type="date" name="earth-date" id="earth-date" />
                </div>
                <br />
               <!-- <div class="flex-row">
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
                <br /> -->
                <div class="flex-row">
                  <button id="submit-btn" class="submit-btn">Visa foton </button>
                </div>
              </div>
              </div>
              
            </div>`;

      // Dynamically inject API Manifest info

      let roverNameTitle = document.getElementById('rover-name');
      let roverStatus = document.getElementById('rover-status');
      let roverLanding = document.getElementById('landing-date');
      let roverLaunch = document.getElementById('launch-date');
      let roverImage = document.getElementById('rover-image');
      let earthDate = document.getElementById('earth-date');
      let backBtn = document.getElementById('back-btn');

      console.log('Current Rover Manifest', currentRoverManifest);

      // Set available dates to rover max date
      earthDate.setAttribute(
        'max',
        currentRoverManifest.photo_manifest.max_date,
      );
      console.log('Chosen date: ', chosenDate);

      // Set default date value to the most recent available date
      earthDate.setAttribute(
        'value',
        currentRoverManifest.photo_manifest.max_date,
      );

      // Set rover name
      roverNameTitle.innerText = currentRover;

      // Set rover status
      roverStatus.innerHTML =
        'Status: ' + currentRoverManifest.photo_manifest.status;

      // Set launch date
      roverLaunch.innerHTML =
        'Uppskjutningsdatum: ' +
        currentRoverManifest.photo_manifest.launch_date;

      // Set landing date
      roverLanding.innerHTML =
        'Landningsdatum: ' + currentRoverManifest.photo_manifest.landing_date;

      // Set rover image
      roverImage.innerHTML = `<img
                src="./img/${currentRover}.jpg"
                class="rover-img"
              />`;

      backBtn.addEventListener('click', () => {
        prepareContainer();
        pickRoverView();
      });

      let submitBtn = document.getElementById('submit-btn');
      submitBtn.addEventListener('click', () => {
        showPhotos(earthDate.value, currentRover);
      });
    }
  }

  // When "Intresting fact" button is clicked my own API is called
  async function showFactPage() {
    prepareContainer();
    let MyFact = await fetch('https://localhost:5001/myapi/v1/fact'); // First call to MyAPI
    let fact = await MyFact.json();
    let factNr = 0; // In case multiple facts are added in the future
    let interestingFact = {
      Date: fact[factNr].date,
      Rover: fact[factNr].rover,
      Description: fact[factNr].description,
    };
    // Logging my own API data object
    console.log('Intresting fact', interestingFact);

    // Use info from my own API to call NASAs API
    let interestingPicsObj = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${interestingFact.Rover.name}/photos?earth_date=${interestingFact.Date}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
    );
    let pics = await interestingPicsObj.json();

    // Logging my chosen NASA API data
    console.log('Chosen pics', pics);

    let print = `<div class=text-center><div><h4>${interestingFact.Rover.name} Aktuellt</h4></div><div><h5>${interestingFact.Date}</h5></div><div><h6>${interestingFact.Description}</h4></div></div>`;
    pics.photos.forEach((pic) => {
      print += `<div><img src="${pic.img_src}"class="pic" loading="lazy" /></div>`;
    });
    mainContainer.innerHTML = print;
  }

  function membersPage() {
    colorMenuBtn('Members');
    hideMenu();
    mainContainer.innerHTML = '';
    mainContainer.innerHTML = `<div class="grid-container-3">
              <div class="grid-item">
                <div class=" flexer text-center">Vill du ha mer info om Mars?</div>
                
              </div>
              <div class="grid-item">
                <div class="flexer text-center">Bli medlem hos NIU!
                  
                </div>
                
              </div>
              <div class="grid-item">
                <div class="flexer text-center">Maila oss din intresseanmälan:&nbsp <a href="mailto:info@niu.se">info@niu.se</a></div>
              </div>
            </div>`;
  }

  // Show recommended page
  function showRecommendedPage() {
    prepareContainer();
    let print = '';
    let counter = 0;
    rovers.forEach((rover) => {
      fetch(`https://localhost:5001/myapi/v1/photos/${rover.name}`) // Second call to MyAPI with parameter
        .then((res) => res.json())
        .then((data) => {
          data.forEach((el) => {
            console.log(el);
            print += `<div class="text-center"><h4>${el.rover}</h4><h5>${el.date}</h5><h6>${el.description}</h6></div><div class="center"> <img src="${el.url}" class="pic" loading="lazy"/></div><br/>`;
          });
          counter++;
          if (counter == rovers.length)
            print += `<div class="container-footer-clearfix">Hello</div>`;

          mainContainer.innerHTML = print;
        });
    });
    colorMenuBtn('Recommendations');
    hideMenu();
  }

  // Show photos from chosen date and rover
  function showPhotos(chosenDate, currentRover) {
    prepareContainer();
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${currentRover}/photos?earth_date=${chosenDate}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
    )
      .then((res) => res.json())
      .then((roverByEarthDate) => {
        console.log('Rover by earth date', roverByEarthDate);
        let printPic = '';
        let titleDiv = `<div class="fixed"><div class="title"><span class="back-btn clickable" id="back-btn" title="Tillbaka till datumval"><i class="fas fa-chevron-left"></i></span><h1>${currentRover}</h1><br/><h3>${chosenDate}</h3></div></div>`;

        // Display title (Rover name and date)
        mainContainer.innerHTML = titleDiv;

        if (roverByEarthDate.photos.length !== 0) {
          roverByEarthDate.photos.forEach((el) => {
            if (el.camera.name != 'CHEMCAM' && el.camera.name !== '') {
              console.log('Current pic', el);
              printPic += `<img src="${el.img_src}" alt="" class="pic" loading="lazy">`;
            }
          });
        } else {
          // If no photos captured that day
          titleDiv = `<div class="fixed"><div class="title"><span class="back-btn" id="back-btn"><i class="fas fa-chevron-left" title="Tillbaka till datumval"></i></span><h1>${currentRover}</h1><br/><h3>${chosenDate}</h3><br/><h4>No photos captured this date</h4></div></div>`;
        }
        // Display photos
        mainContainer.innerHTML = titleDiv + printPic;

        let backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
          prepareContainer();
          detailsView(currentRover);
        });
      });
  }

  /******************* Helper functions*********************/
  // Hides the menu and changes the cross to hamburger
  function hideMenu() {
    menuBtn.classList.remove('open');
    slideMenu.style.visibility = 'hidden';
    slideMenuShade.style.visibility = 'hidden';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }

  // Colors the active nav menu button in the appropriate color
  function colorMenuBtn(currentPage) {
    let originalColor = 'rgb(229, 226, 226)';
    let activeColor = 'red';
    let pages = ['Home', 'Rovers', 'Recommendations', 'Members']; // App pages

    if (currentPage == pages[0]) {
      menuHome.style.color = activeColor;
      menuRovers.style.color = originalColor;
      menuRecommend.style.color = originalColor;
      menuMember.style.color = originalColor;
    }
    if (currentPage == pages[1]) {
      menuHome.style.color = originalColor;
      menuRovers.style.color = activeColor;
      menuRecommend.style.color = originalColor;
      menuMember.style.color = originalColor;
    }
    if (currentPage == pages[2]) {
      menuHome.style.color = originalColor;
      menuRovers.style.color = originalColor;
      menuRecommend.style.color = activeColor;
      menuMember.style.color = originalColor;
    }

    if (currentPage == pages[3]) {
      menuHome.style.color = originalColor;
      menuRovers.style.color = originalColor;
      menuRecommend.style.color = originalColor;
      menuMember.style.color = activeColor;
    }
  }

  // Empties main container an adds a spinner in the background
  function prepareContainer() {
    mainContainer.innerHTML = '';
    mainContainer.innerHTML =
      '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
  }

  /********************* Event listeners ***********************/

  // When the NIU.se logo is clicked
  logoBtn.addEventListener('click', firstPage);

  // Logo click
  logoBtn.addEventListener('click', () => {
    prepareContainer();
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

  // Home btnclick
  menuHome.addEventListener('click', () => {
    prepareContainer();
    firstPage();
    hideMenu();
  });

  // When rovers menu button is clicked
  menuRovers.addEventListener('click', () => {
    prepareContainer();
    pickRoverView();
    hideMenu();
  });

  // When recommended page menu button is clicked
  menuRecommend.addEventListener('click', showRecommendedPage);

  // When members menu page button is clicked
  menuMember.addEventListener('click', membersPage);

  // When NASA logo in footer is clicked
  nasaLogo.addEventListener('click', () => {
    window.location.assign('http://www.nasa.gov');
  });
  nasaLogo.classList.add('clickable');

  // Show first page on start
  firstPage();

}
init();
  /************ NASA Mars Rover APIEndpoints ****************/

  // Get Rover Manifest
  /*---`https://api.nasa.gov/mars-photos/api/v1/manifests/rover_name/?&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`*/

  // Get by SOL
  /*---`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${solNr}&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`*/

  // Get by earth date
  // `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${today}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`

  /***************************************************************/
} // Incapsulation end
