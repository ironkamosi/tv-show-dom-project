//You can edit ALL of the code here

// removes data from the dom
function removeEpisodes(episodeList) {
  let episodeContainers = document.getElementsByClassName("episode-container-class-name");
  episodeContainers.innerHTML = "";
  episodeList.forEach((element) => {
    // loops over the array and removes each episode from the dom when the eventListener is activated
    episodeContainers.parentNode.removeChild(element);
  });
}

function compare(showOne ,showTwo) { // its comparing the content of the elements, it tries to understand the position of the string elements
  console.log(showOne);

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

  let select = document.getElementById("select-tv"); // this only adds the show select if it is not present in the DOM
  //console.log("test", select);

  if (select === null) {
    // this only works if the element does not exist
    select = document.createElement("select");
    select.setAttribute("id", "select-tv");
    rootElem.appendChild(select);

    showData.sort(compare).forEach((show) => { //  when the function processes the forEach the array will be sorted 
      let option = document.createElement("option");
      option.innerHTML = `${show.name}`; // loops over the tv show data
      select.appendChild(option);
    });
  }

  /* 
   showData.map(show => show.name).sort().forEach((showName) => {
      let option = document.createElement("option");
      option.innerHTML = `${showName}`; // loops over the tv show data
      select.appendChild(option);
      console.log(showName)
    });
   
   */
  select.addEventListener("change", function (event) {
    let episodeContainers = document.getElementsByClassName(
      "episode-container-class-name"
    ); // An array of episode container
    let episodeIndex = 0;
    let episodeCounter = 0;
    let optionId = event.target.options[event.target.selectedIndex].index;
    let showId = showData[optionId].id;
    // for every item duplicate we need an test to see if it exists

    getAllEpisodesApi(showId); // this call gets the all the episodes

    // console.log("test", showData[optionId]);
    let styleContainer = document.getElementById("styleContainer");
    styleContainer.innerHTML = "";

    // fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    //   .then((response) => response.json().then((data) => data))
    //   .then((allEpisodes) => (arrayOfEpisodes = allEpisodes)) // gets the episode data and sets it to an array of episodes
    //   .catch((error) => console.log(error));

    // if (event.target.options[event.target.selectedIndex].index === 0) {
    //   // refers to the all episode option
    //   episodeList.forEach(() => {
    //     episodeCounter = episodeList.length;
    //     episodeContainers[episodeIndex].style.display = "";
    //     episodeIndex++; // This increments});
    //   });
    // } else {
    //   episodeList.forEach(() => {
    //     if (
    //       episodeIndex ===
    //       event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index
    //     ) {
    //       showEpisode(episodeContainers[episodeIndex]); //.style.display = "";
    //     } else {
    //       hideEpisode(episodeContainers[episodeIndex]); //.style.display = "none";
    //     }
    //     episodeIndex++; // This increments});
    //   });
    //   episodeCounter = 1;
    // }
    // updateCounter(episodeCounter, episodeList.length);
  });

  return select;
}

function addFooter() {
  const rootElem = document.getElementById("root");
  let footer = document.createElement("footer");
  footer.innerHTML = "<p>https://tvmaze.com/</p>";
  rootElem.appendChild(footer); 
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
  title.style.textAlign = "center";
  title.innerHTML = `${episode.name}: S${formatSeasonNum(
    episode.season
  )}E${formatSeasonNum(episode.number)}`;
  title.className = "title";

  let img = document.createElement("img");
  img.style.margin = "0 auto";
  img.style.width = "99%";
  // img.style.paddingLeft = "2em";
  // img.style.paddingRight = "2em";
  img.src = episode.image.medium;

  let summary = document.createElement("p");
  summary.style.texAlign = "center";
  summary.innerHTML = `${episode.summary}`;
  summary.className = "summary";
  episodeContainer.appendChild(title);
  episodeContainer.appendChild(img);
  episodeContainer.appendChild(summary);
  //rootElem.appendChild(episodeContainer);
  return episodeContainer;
}

// container for the single episodes
const addAllEpisodes = (episodeList) => {
  const rootElem = document.getElementById("root");
  let styleContainer = document.createElement("div");
  styleContainer.setAttribute("id", "styleContainer");
  styleContainer.className = "style-container";
  styleContainer.style.width = "98%";
  styleContainer.style.flexWrap = "wrap";
  styleContainer.style.margin = "0 auto";

  episodeList.forEach((episode) => {
    styleContainer.appendChild(addSingleEpisode(episode));
  });
  rootElem.prepend(styleContainer); // prepend puts the child at the beginning instead of the end
};

const addDropDownMenu = (episodeList) => {
  let option;
  let select = document.getElementById("select");

  if (select === null) {
    select = document.createElement("select");
    select.setAttribute("id", "select");
    option = document.createElement("option");
    option.innerText = "All episodes";
    select.appendChild(option);
  } else {
    // let options = select.getElementsByTagName("option");
    // console.log("test", options);
    // select.innerHTML = "";
    for (let index = select.options.length; index > 0; index--) {
      // this will go through the loop starting at the end and for each element it will remove all the options before it rebuilds it
      select.remove(index);
    }
  }

  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `${episode.name}: S${formatSeasonNum(
      episode.season
    )}E${formatSeasonNum(episode.number)}`;
    select.appendChild(option);
  });

  select.addEventListener("change", function (event) {
    let episodeContainers = document.getElementsByClassName(
      "episode-container-class-name"
    ); // An array of episode container
    //let navBarContainer = document.getElementById("navBarContainer");
    let episodeIndex = 0;
    let episodeCounter = 0;
    if (event.target.options[event.target.selectedIndex].index === 0) {
      // refers to the all episode option
      episodeList.forEach(() => {
        episodeCounter = episodeList.length;
        episodeContainers[episodeIndex].style.display = "";
        episodeIndex++; // This increments});
      });
    } else {
      episodeList.forEach(() => {
        if (
          episodeIndex ===
          event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index
        ) {
          showEpisode(episodeContainers[episodeIndex]); //.style.display = "";
        } else {
          hideEpisode(episodeContainers[episodeIndex]); //.style.display = "none";
        }
        episodeIndex++; // This increments});
      });
      episodeCounter = 1;
    }
    updateCounter(episodeCounter, episodeList.length);
  });
  return select;
};

// counter function display
const addCounter = (_) => {
  counterDisplay = document.createElement("div");
  counterDisplay.setAttribute("id", "counterDisplayID");
  //counterDisplay.style.backgroundColor = "blue";
  counterDisplay.style.marginTop = "0.5em"; // centre below

  return counterDisplay;
};

function updateCounter(numberOfEpisodes, totalEpisodes) {
  // counter for number of episode found in search
  let counterDisplay = document.querySelector("#counterDisplayID");

  counterDisplay.innerText = `Displaying ${numberOfEpisodes} / ${totalEpisodes} episodes`; // update of the counter
}

const addSearchBox = (episodeList) => {
  let episodeContainers = document.getElementsByClassName(
    "episode-container-class-name"
  ); // An array of episode container

  let inputBox = document.getElementById("inputBoxId");
  if (inputBox === null) {
    // this only works if the ""inputBox does not exist
    inputBox = document.createElement("input");
    inputBox.setAttribute("id", "inputBoxId");
    inputBox.setAttribute("placeHolder", "type and search for episode");
    inputBox.style.width = "25em";
    inputBox.style.backgroundColor = "#f5f5f5";
    inputBox.style.margin = "0.8em"; // spacing to the left of episode list
  }

  inputBox.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase(); // gets search string from input
    let episodeIndex = 0;
    let episodeCount = 0; // this is the number of episodes that match the key word search string

    episodeList.forEach((episode) => {
      if (
        episode.name.toLowerCase().includes(searchString) ||
        episode.summary.toLowerCase().includes(searchString)
      ) {
        episodeCount++;
        showEpisode(episodeContainers[episodeIndex]);
      } else {
        hideEpisode(episodeContainers[episodeIndex]);
      }
      episodeIndex++;
    });
    updateCounter(episodeCount, episodeList.length);
  });

  return inputBox;
};

const appendInitialHeader = () => { 
const rootElem = document.getElementById("root");
  let navBarContainer = document.createElement("div");
  let body = document.querySelector("body");
  navBarContainer.style.display = "flex";
  navBarContainer.setAttribute("id", "navBarContainer");
  body.insertBefore(navBarContainer, rootElem);  
}

const addHeader = (episodeList, showData) => {
   let navBarContainer = document.createElement("div");
   let body = document.querySelector("body");
   navBarContainer.style.display = "flex";
   navBarContainer.setAttribute("id", "navBarContainer");
  let oldNavBar = document.getElementById("navBarContainer");
  oldNavBar.replaceWith(navBarContainer)

  const showSelector = addShowSelector(showData);
  navBarContainer.appendChild(showSelector);

  const inputBox = addSearchBox(episodeList);
  navBarContainer.appendChild(inputBox);
  const counter = addCounter();
  navBarContainer.appendChild(counter);
  updateCounter(episodeList.length, episodeList.length);
  const dropDown = addDropDownMenu(episodeList);
  navBarContainer.appendChild(dropDown);
};

function makePageForEpisodes(episodeList) { // add elements to the dom
  const tvShowData = getAllShows();
  addAllEpisodes(episodeList);
  addHeader(episodeList, tvShowData);
}

function setup() {
  // fetches the data from the tv show website
  appendInitialHeader() // header with nav elements
  getAllEpisodesApi(82);
  addFooter();

}

function getAllEpisodesApi(id) {
  // function to get the apis
  let arrayOfEpisodes;
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json().then((data) => data)) // return response.json
    .then((allEpisodes) => makePageForEpisodes(allEpisodes))
    .catch((error) => console.log(error));
}
window.onload = setup; // when the browser is load call set up
