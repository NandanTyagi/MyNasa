'use strict';
{
  // Incapsulation start

  /************* DOM Strings ***************/
  let menuBtn = document.getElementById('menu-btn');
  let slideMenu = document.getElementById('slide-menu');
  let slideMenuShade = document.getElementById('slide-menu-shade');
  let menuRovers = document.getElementById('menu-fordon');
  let menuHome = document.getElementById('menu-home');
  let menuMember = document.getElementById('menu-member');
  let menuRecommend = document.getElementById('menu-recommendation');
  let mainContainer = document.getElementById('container-main');
  let logoBtn = document.getElementById('logo');
  let nasaLogo = document.getElementById('nasa-logo');
  // App pages
  let pages = ['Home', 'Rovers', 'Recommendations', 'Members'];

  // Set current rover
  let rovers = ['Opportunity', 'Spirit', 'Curiosity'];
  // let currentRover = rovers[2];
  let chosenDate = null;
  let currentRoverObject = {};
  let currentRoverManifest = {};
  let currentPage = 'Home';

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
              <div class="grid-5-item">
                <div class="boxer">
                  <h3>Intressant fakta</h3>
                </div>
              </div>
              <div class="grid-5-item" id="rovers-btn">
                <div class="boxer clickable">
                  <h3>Forskningsfordon på Mars</h3>
                </div>
              </div>
            </div>`;
    let roversBtn = document.getElementById('rovers-btn');
    roversBtn.addEventListener('click', () => {
      console.log('click');
      pickRoverView();
    });
    colorMenuBtn('Home');

    let recommendationsBtn = document.getElementById('recommedations');
    recommendationsBtn.addEventListener('click', showRecommendedPage);
  }
  // Show first page
  logoBtn.addEventListener('click', firstPage);
  firstPage();

  // Rovers menubtn clicked
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
    let curiosityLink = document.getElementById('Curiosity');
    curiosityLink.addEventListener('click', () => {
      mainContainer.innerHTML =
        '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
      detailsView(rovers[2]);
      hideMenu();
    });
    let spiritLink = document.getElementById('Spirit');
    spiritLink.addEventListener('click', () => {
      mainContainer.innerHTML =
        '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
      detailsView(rovers[1]);
      hideMenu();
    });
    let opportunityLink = document.getElementById('Opportunity');
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
      let roverNameTitle = document.getElementById('rover-name');
      let roverStatus = document.getElementById('rover-status');
      let roverLanding = document.getElementById('landing-date');
      let roverLaunch = document.getElementById('launch-date');
      let roverImage = document.getElementById('rover-image');
      let earthDate = document.getElementById('earth-date');
      let backBtn = document.getElementById('back-btn');
      backBtn.addEventListener('click', () => {
        pickRoverView();
      });
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
            console.log('Info', el);
            printPic += `<img src="${el.img_src}" alt="" class="pic">`;
            // show.innerHTML = printPic;
          });
        });
      let submitBtn = document.getElementById('submit-btn');
      submitBtn.addEventListener('click', () => {
        console.log('clicked');
        showPhotos(earthDate.value, currentRover);
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
    let originalColor = 'rgb(229, 226, 226)';
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

  function showPhotos(chosenDate, currentRover) {
    mainContainer.innerHTML = '';
    mainContainer.innerHTML =
      '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${currentRover}/photos?earth_date=${chosenDate}&page=1&api_key=JRLFjiGREcuww7SrTcrgT07X9m9AFoxJ1s6tomgw`,
    )
      .then((res) => res.json())
      .then((roverByEarthDate) => {
        let printPic = '';
        let titleDiv = `<div class="fixed"><div class="title"><span class="back-btn clickable" id="back-btn" title="Tillbaka till datumval"><i class="fas fa-chevron-left"></i></span><h1>${currentRover}</h1><br/><h3>${chosenDate}</h3></div></div>`;

        mainContainer.innerHTML = titleDiv;

        if (roverByEarthDate.photos.length !== 0) {
          roverByEarthDate.photos.forEach((el) => {
            if (el.camera.name != 'CHEMCAM' && el.camera.name !== '') {
              console.log('Current pic', el);
              printPic += `<img src="${el.img_src}" alt="" class="pic">`;
            }
          });
        } else {
          titleDiv = `<div class="fixed"><div class="title"><span class="back-btn" id="back-btn"><i class="fas fa-chevron-left" title="Tillbaka till datumval"></i></span><h1>${currentRover}</h1><br/><h3>${chosenDate}</h3><br/><h4>No photos captured this date</h4></div></div>`;
        }
        mainContainer.innerHTML = titleDiv + printPic;
        let backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
          mainContainer.innerHTML =
            '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
          detailsView(currentRover);
        });
      });
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
  menuMember.addEventListener('click', membersPage);
  nasaLogo.classList.add('clickable');
  nasaLogo.addEventListener('click', () => {
    nasaLogo.setAttribute('target', '_blank');
    window.location.assign('http://www.nasa.gov');
  });

  function showRecommendedPage() {
    fetch('https://localhost:5001/myapi')
      .then((res) => res.json())
      .then((data) => {
        let print = '';
        data.forEach((el) => {
          print += `<div class="text-center"><h4>${el.rover}</h4><h5>${el.date}</h5><h6>${el.description}</h6></div><div > <img src="${el.url}" class="pic"/></div><br/>`;
          console.log(el);
        });
        mainContainer.innerHTML = '';
        mainContainer.innerHTML =
          '<img src="./img/spinner.gif" class="spinner-center" alt="" />';
        mainContainer.innerHTML = print;
      });
    colorMenuBtn('Recommendations');
    hideMenu();
  }
  menuRecommend.addEventListener('click', showRecommendedPage);
} // Incapsulation end
