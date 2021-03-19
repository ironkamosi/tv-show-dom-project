// level 500
function getAllTvShowsApi() {
  const rootDiv = document.getElementById("root");
  const mainContainer = document.createElement("div");
  mainContainer.setAttribute("id", "mainContainer");
  rootDiv.appendChild(mainContainer);
  const allTvShowData = getAllShows().sort(compare);
  tvShowHeaderFooter();
  allTvShowData.forEach((tvShow) => {
    mainContainer.appendChild(allTvShowsListings(tvShow));
  });
}

function homeReturnBtn() {
  //button which returns user home
  let btn = document.createElement("button");
  btn.style.display = "none";
  let navBarContainer = document.getElementById("navBarContainer");

  btn.setAttribute("id", "returnBtn");
  btn.innerText = "Home";
  navBarContainer.appendChild(btn);

  btn.addEventListener("click", () => {
    btn.style.display = "none"; // hides button when click
    let episodeSelector = document.querySelector("#select"); // hide the tv episodes when the button is pressed
    episodeSelector.style.display = "none";

    let tvShowSelector = document.querySelector("#select-tv"); // hide the tv episodes when the button is pressed
    tvShowSelector.style.display = "";

    let episodeContainers = document.getElementsByClassName(
      "episode-container-class-name"
    ); // An array of episode container
    if (episodeContainers) {
      Array.from(episodeContainers).forEach((episodeContainer) => {
        episodeContainer.style.display = "none";
      });
    }

    let tvShowsInfoContainers = document.getElementsByClassName(
      "infoContainer"
    );
    if (tvShowsInfoContainers) {
      Array.from(tvShowsInfoContainers).forEach((tvShowsInfoContainer) => {
        tvShowsInfoContainer.style.display = "";
      });
    }
    updateCounter(getAllShows().length, getAllShows().length); // this updates the counter when the return button is fired
  });
}

function tvShowHeaderFooter() {
  // renders the header and footer when a transition from the main page happens
  const tvShowData = getAllShows();
  addHeader(tvShowData);
  homeReturnBtn();
  addFooter();
}

// create button on page load button and then reveal on episode load
function allTvShowsListings(tvShow) {
  let tvShowsInfoContainer = document.createElement("div");
  tvShowsInfoContainer.className = "infoContainer";

  const mainTvInfo = document.createElement("div");
  mainTvInfo.setAttribute("id", "mainTvInfo");

  let tvShowsTitle = document.createElement("h2");
  tvShowsTitle.setAttribute("showId", tvShow.id);
  tvShowsTitle.className = "tvShowTitleClass-hoover";

  tvShowsTitle.addEventListener("click", (event) => {
    let tvSelector = document.querySelector("#select-tv"); // hide the tv episodes when the button is pressed
    tvSelector.style.display = "none";

    // removes unwanted episodes when user inputs key term into the search box
    let styleContainer = document.getElementById("styleContainer");
    if (styleContainer !== null) {
      styleContainer.innerHTML = ""; // its removing all the episode containers
    }

    // when show title is clicked we load the episodes fpr selected show
    let btn = document.getElementById("returnBtn");
    btn.style.display = "";
    let select = document.getElementById("select");
    if (select) {
      select.style.display = "";
    }

    // this hides the tv show when the tv show is selected the episodes appear
    let showId = event.target.getAttribute("showId");
    let arrayOfTvContainers = document.querySelectorAll(".infoContainer");
    Array.from(arrayOfTvContainers).forEach((element) => {
      // converts dom element into an array in order to use the for each
      element.style.display = "none";
    });
    getAllEpisodesApi(showId); // this will display episodes for this show id
  });

  const summaryImageDiv = document.createElement("div");
  summaryImageDiv.setAttribute("class", "summaryImageDiv");
  let tvShowsImage = document.createElement("img");
  let summaryDiv = document.createElement("div");
  let tvShowsSummary = document.createElement("p");
  let tvShowsInfo = document.createElement("ul");
  tvShowsInfo.setAttribute("class", "tvShowsInfo");
  let tvShowsRating = document.createElement("li");
  let tvShowsGenre = document.createElement("li");
  let tvShowsStatus = document.createElement("li");
  let tvShowsRunTime = document.createElement("li");

  tvShowsTitle.innerHTML = tvShow.name;

  if (tvShow.image === null || tvShow.image === "") {
    tvShowsImage.setAttribute("class", "img-error");
    tvShowsImage.src = "img/no_image.jpg";
  } else {
    tvShowsImage.src = tvShow.image.medium;
  }

  tvShowsSummary.innerHTML = tvShow.summary;
  tvShowsRating.innerHTML = `Rating:${tvShow.rating.average}`;
  tvShowsGenre.innerHTML = tvShow.genres;
  tvShowsStatus.innerHTML = `Status:${tvShow.status}`;
  tvShowsRunTime.innerHTML = `Runtime:${tvShow.runtime} minutes`;

  mainTvInfo.appendChild(tvShowsTitle);
  mainTvInfo.appendChild(summaryImageDiv);
  summaryImageDiv.appendChild(tvShowsImage);
  summaryDiv.appendChild(tvShowsSummary);
  summaryImageDiv.appendChild(summaryDiv);
  tvShowsInfoContainer.appendChild(mainTvInfo);
  tvShowsInfoContainer.appendChild(tvShowsInfo);
  tvShowsInfo.appendChild(tvShowsRating);
  tvShowsInfo.appendChild(tvShowsGenre);
  tvShowsInfo.appendChild(tvShowsStatus);
  tvShowsInfo.appendChild(tvShowsRunTime);
  return tvShowsInfoContainer;
}
//-------------------------------------------------------------------------------------------------------

function compare(showOne, showTwo) {
  // its comparing the content of the elements, it tries to understand the position of the string elements
  if (showOne.name.toLowerCase() < showTwo.name.toLowerCase()) {
    return -1;
  }
  if (showOne.name.toLowerCase() < showTwo.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

// when logic is done call in the eventListener
// tv input selector
function addShowSelector(showData) {
  const rootElem = document.getElementById("root");
  // this only works if the element does not exist
  select = document.createElement("select");
  select.setAttribute("id", "select-tv");
  rootElem.appendChild(select);

  showData.sort(compare).forEach((show) => {
    //  when the function processes the forEach the array will be sorted
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`; // loops over the tv show data
    select.appendChild(option);
  });
 
  // loose a track of the episode list because errors occur when it tries to
  //compare the two fields and the array
  // it also fails with the hide and show
  select.addEventListener("change", function (event) {
    // An array of episode container
    let optionId = event.target.options[event.target.selectedIndex].index;
    let showId = showData[optionId].id;
    // for every item duplicate we need an test to see if it exists

    let styleContainer = document.getElementById("styleContainer");
    if (styleContainer !== null) {
      styleContainer.innerHTML = ""; // its removing all the episode containers
    }
    getAllEpisodesApi(showId); // this call gets the all the episodes it gets the data and calls adds all episodes , add allEpisodes creates the containers
    //--------------------------------------------------------------
    let tvSelector = document.querySelector("#select-tv"); // hide the tv episodes when the button is pressed
    tvSelector.style.display = "none";

    // when show title is clicked we load the episodes fpr selected show
    let btn = document.getElementById("returnBtn");
    btn.style.display = "";
    let select = document.getElementById("select");
    if (select) {
      select.style.display = "";
    }

    // this hides the tv show when the tv show is selected the episodes appear
    let arrayOfTvContainers = document.querySelectorAll(".infoContainer");
    Array.from(arrayOfTvContainers).forEach((element) => {
      // converts dom element into an array in order to use the for each
      element.style.display = "none";
    });
  });

  return select;
}

function addFooter() {
  const rootElem = document.getElementById("root");
  let footer = document.getElementById("footer");
  if (footer === null) {
    footer = document.createElement("footer");
    footer.setAttribute("id", "footer");
    footer.innerHTML = "<p>https://tvmaze.com/</p>";
    rootElem.appendChild(footer);
  }
}

const hideEpisode = (episode) => {
  episode.style.display = "none";
};

const showEpisode = (episode) => {
  episode.style.display = "";
};

// formats the number for the season data
function formatSeasonNum(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

// displays a single episode
function addSingleEpisode(episode) {
  let episodeContainer = document.createElement("div");
  episodeContainer.style.display = "block"; // dis
  episodeContainer.className = "episode-container-class-name";
  episodeContainer.style.backgroundColor = "#f5f5dc";
  episodeContainer.style.padding = "1.5em";
  episodeContainer.style.width = "20rem";
  episodeContainer.style.margin = "1.5em";

  let title = document.createElement("h2");
  title.className = "title";
  title.style.textAlign = "center";
  if (episode.name == "" || episode.name == null) {
    title.innerText = "Tv show data is currently unavailable";
  } else {
    title.innerHTML = `${episode.name}: S${formatSeasonNum(
      episode.season
    )}E${formatSeasonNum(episode.number)}`;
  }

  let img = document.createElement("img");
  img.style.margin = "0 auto";
  img.style.width = "99%";

  if (episode.image == null || episode.image == "") {
    img.src = "./img/error.jpg";
  } else {
    img.src = episode.image.medium;
  }

  let summary = document.createElement("p");
  summary.style.texAlign = "center";
  summary.className = "summary";
  if (episode.summary == "" || episode.summary == null) {
    summary.innerText = "Information for this episode is currently unavailable";
  } else {
    summary.innerHTML = `${episode.summary}`;
  }

  episodeContainer.appendChild(title);
  episodeContainer.appendChild(img);
  episodeContainer.appendChild(summary);
  return episodeContainer;
}

// container for the single episodes
const addAllEpisodes = (episodeList) => {
  upDateDropDownMenu(episodeList);
  const rootElem = document.getElementById("root");
  let styleContainer = document.getElementById("styleContainer");
  let footer = document.getElementById("footer");

  if (styleContainer === null) {
    styleContainer = document.createElement("div");
    styleContainer.setAttribute("id", "styleContainer");
    styleContainer.className = "style-container";
    styleContainer.style.width = "98%";
    styleContainer.style.flexWrap = "wrap";
    styleContainer.style.margin = "0 auto";
    rootElem.insertBefore(styleContainer, footer);
  }
  episodeList.forEach((episode) => {
    styleContainer.appendChild(addSingleEpisode(episode));
  });
};

function upDateDropDownMenu(episodeList) {
  //goes through the options removes the options and recreates the options in the second loop
  let select = document.getElementById("select");
  if (select !== null) {
    for (let index = select.options.length; index > 0; index--) {
      select.remove(index);
    }

    episodeList.forEach((episode) => {
      let option = document.createElement("option");
      option.innerHTML = `${episode.name}: S${formatSeasonNum(
        episode.season
      )}E${formatSeasonNum(episode.number)}`;
      select.appendChild(option);
    });
  }
}

const addDropDownMenu = (episodeList) => {
  // select on the right  // checks if the drop down exist it creates it else it removes the options 222
  let option;

  // this condition prevents duplication
  select = document.createElement("select");
  select.style.display = "none"; // hide select episodes on the tv show listing

  select.setAttribute("id", "select");
  option = document.createElement("option");
  option.innerText = "All episodes";
  select.appendChild(option);

  select.addEventListener("change", function (event) {
    let episodeContainers = document.getElementsByClassName(
      "episode-container-class-name"
    ); // An array of episode container

    let episodeCounter = 0;
    let containers = Array.from(episodeContainers);

    if (event.target.options[event.target.selectedIndex].index === 0) {
      // refers to the all episode option
      containers.forEach((container) => {
        episodeCounter = containers.length;
        container.style.display = "";
      });
    } else {
      containers.forEach((container, episodeIndex) => {
        if (
          episodeIndex ===
          event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index
        ) {
          showEpisode(container); //.style.display = "";
        } else {
          hideEpisode(container); //.style.display = "none";
        }
        // This increments until it matches the episode index});
      });
      episodeCounter = 1; // It keeps counting until it reaches the end of the array
    }
    updateCounter(episodeCounter, containers.length);
  });
  return select;
};

// counter function display creates the dom
const addCounter = () => {
  counterDisplay = document.createElement("div");
  counterDisplay.setAttribute("id", "counterDisplayID");
  counterDisplay.style.marginTop = "0.5em"; // centre below

  return counterDisplay;
};

function updateCounter(numberOfMovies, totalMovies) {
  // counter for number of episode found in search
  let tvSelectDom = document.querySelector("#select-tv");
  let tvShowDisplay;
  if (tvSelectDom.style.display === "none") {
    tvShowDisplay = "Episodes";
  } else {
    tvShowDisplay = "TvShow";
  }

  let counterDisplay = document.querySelector("#counterDisplayID");
  counterDisplay.innerText = `Displaying ${numberOfMovies} / ${totalMovies} ${tvShowDisplay}`; // update of the counter
}

let tvShowData = getAllShows().sort(compare);

function searchTvShowData(searchString) {
  // searches for data specifically for the tv show episodes
  let episodeCount = 0; // this is the number of episodes that match the key word search string

  let tvShowsInfoContainers = document.getElementsByClassName("infoContainer");

  tvShowData.forEach((data, index) => {
    let genres = data.genres.toString(); // extracted data from the array of genres
    if (
      data.name.toLowerCase().includes(searchString) ||
      data.summary.toLowerCase().includes(searchString) ||
      genres.toLowerCase().includes(searchString)
    ) {
      showEpisode(tvShowsInfoContainers[index]);
      episodeCount++;
    } else if (
      data.name == null ||
      data.name == "" ||
      data.summary == null ||
      data.summary == "" ||
      data.genres == null ||
      data.genres == ""
    ) {
      hideEpisode(tvShowsInfoContainers[index]);
    } else {
      hideEpisode(tvShowsInfoContainers[index]);
    }
  });
  updateCounter(episodeCount, tvShowData.length);
}

function searchEpisodeData(searchString) {
  let episodeContainers = document.getElementsByClassName(
    "episode-container-class-name"
  ); // An array of episode container

  // searches for data specifically for the tv show listings
  let episodeIndex = 0;
  let episodeCount = 0; // this is the number of episodes that match the key word search string

  // access the data through the array
  episodes.forEach((data) => {
    if (
      data.name.toLowerCase().includes(searchString) ||
      data.summary.toLowerCase().includes(searchString)
    ) {
      episodeCount++;
      showEpisode(episodeContainers[episodeIndex]);
    } else if (
      data.name == null ||
      data.name == "" ||
      data.summary == null ||
      data.summary == ""
    ) {
      hideEpisode(episodeContainers[episodeIndex]);
    } else {
      hideEpisode(episodeContainers[episodeIndex]);
    }
    episodeIndex++;
  });
  updateCounter(episodeCount, episodes.length);
}

const addSearchBox = (episodeList) => {
  let inputBox = document.getElementById("inputBoxId");
  if (inputBox === null) {
    // this only works if the ""inputBox does not exist
    inputBox = document.createElement("input");
    inputBox.setAttribute("id", "inputBoxId");
    inputBox.setAttribute("placeHolder", "type and search");
    inputBox.style.width = "25em";
    inputBox.style.backgroundColor = "#f5f5f5";
    inputBox.style.margin = "0.8em"; // spacing to the left of episode list
  }

  inputBox.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    let tvSelectDom = document.querySelector("#select-tv");

    if (tvSelectDom.style.display === "none") {
      // this checks whether the tv show or the episodes state exist, if so we call the data function
      searchEpisodeData(searchString); // every time you type data the inbox addEventListener is called
    } else {
      searchTvShowData(searchString);
    }
  });

  return inputBox;
};

const addHeader = (showData) => {
  // changed the order of arguments // removed episodeList to ensure general purpose use
  const rootElem = document.getElementById("root");
  let body = document.querySelector("body");

  let navBarContainer = document.getElementById("navBarContainer");

  if (navBarContainer === null) {
    //
    navBarContainer = document.createElement("div");
    navBarContainer.style.display = "flex";
    navBarContainer.setAttribute("id", "navBarContainer");

    body.insertBefore(navBarContainer, rootElem);

    const showSelector = addShowSelector(showData);
    navBarContainer.appendChild(showSelector);

    const inputBox = addSearchBox(showData); // changed it from episodeList
    navBarContainer.appendChild(inputBox);
    const counter = addCounter();

    navBarContainer.appendChild(counter);
    updateCounter(showData.length, showData.length); // how many are we showing/ how many are there in total
  }

  const dropDown = addDropDownMenu();
  navBarContainer.appendChild(dropDown);
};

function makePageForEpisodes(episodeList) {
  episodes = episodeList;
  const tvShowData = getAllShows();
  addAllEpisodes(episodeList);
  addHeader(episodeList, tvShowData);
  addFooter();
}

// function setup() {
//   // fetches the data from the tv show website
//   const shows = getAllShows().sort(compare);
//   const showId = shows[0].id;
//   fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
//     .then((response) => response.json().then((data) => data)) // remove the end of the json once bug is fixed with the header// return response.json this gathers the data
//     .then((allEpisodes) => makePageForEpisodes(allEpisodes)) // this does nt get called until we get the data
//     .catch((error) => console.log(error));
// }

let episodes; // global variable that contains the episodes/ data from the api

function getAllEpisodesApi(id) {
  // function to get the apis
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json().then((data) => data)) // return response.json this gathers the data
    .then((allEpisodes) => {
      episodes = allEpisodes;
      addAllEpisodes(allEpisodes);
      updateCounter(allEpisodes.length, allEpisodes.length); // This updates the counter to enable
    }) // this does not get called until we get the data
    .catch((error) => console.log(error));
}

window.onload = getAllTvShowsApi;
